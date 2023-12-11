using Pet4YouAPI.Models;
using Pet4YouAPI.DBContext;
using Pet4YouAPI.DI;
using Microsoft.AspNetCore.Mvc;
using Pet4YouAPI.DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.WebUtilities;

namespace Pet4YouAPI.Services
{
    public class AdvertisementService : IAdvertisementService
    {

        private const string advertisementMediaPath = "\\media\\ad\\pictures";
        private Pet4YouContext _context;

        public AdvertisementService(Pet4YouContext context)
        {
            _context = context;
        }

        public async Task<CreationResult> CreateAdvertisement(Advertisement advertisement)
        {
            if (advertisement.AdvertisementInfo == null || advertisement.AdvertisementLocation == null)
                return CreationResult.IncorrectData;
            var user = await _context.Users.FindAsync(advertisement.UserId);
            if (user == null)
                return CreationResult.IncorrectRefference;
            _context.Add(advertisement);
            await _context.SaveChangesAsync();
            return CreationResult.Success;
        }

        public async Task<ICollection<Advertisement>> GetAdvertisements(AdvertisementFilterModel filters)
        {
            string sqlStatement = "SELECT Advertisements.* FROM Advertisements " +
                "LEFT OUTER JOIN AdvertisementInfos ON Advertisements.Id = AdvertisementInfos.Id " +
                "LEFT OUTER JOIN AdvertisementLocations ON Advertisements.Id = AdvertisementLocations.Id " +
                "WHERE Advertisements.Type = {0}";

            List<object> paramsList = new List<object>();
            paramsList.Add(filters.AdvertisementType);
            int parametersCount = 1;

            // Location
            if(filters.Location?.Country != null && filters.Location.Country != "")
            {
                sqlStatement += " AND AdvertisementLocations.Country = {" + parametersCount + "}";
                paramsList.Add(filters.Location.Country);
                parametersCount++;
            }

            if (filters.Location?.Region != null && filters.Location.Region != "")
            {
                sqlStatement += " AND AdvertisementLocations.Region = {" + parametersCount + "}";
                paramsList.Add(filters.Location.Region);
                parametersCount++;
            }

            if (filters.Location?.City != null && filters.Location.City != "")
            {
                sqlStatement += " AND AdvertisementLocations.City = {" + parametersCount + "}";
                paramsList.Add(filters.Location.City);
                parametersCount++;
            }

            // Gender
            if (filters.Gender != null && filters.Gender != "")
            {
                sqlStatement += " AND AdvertisementInfos.Gender = {" + parametersCount + "}";
                paramsList.Add(filters.Gender);
                parametersCount++;
            }

            // Price

            if (filters.MinPrice != null)
            {
                sqlStatement += " AND AdvertisementInfos.Price >= {" + parametersCount + "}";
                paramsList.Add(filters.MinPrice);
                parametersCount++;
            }

            if (filters.MaxPrice != null && filters.MaxPrice != 0)
            {
                sqlStatement += " AND AdvertisementInfos.Price <= {" + parametersCount + "}";
                paramsList.Add(filters.MaxPrice);
                parametersCount++;
            }

            // Age
            if (filters.MinAge != null)
            {
                sqlStatement += " AND AdvertisementInfos.Age >= {" + parametersCount + "}";
                paramsList.Add(filters.MinAge);
                parametersCount++;
            }

            if (filters.MaxAge != null && filters.MaxAge != 0)
            {
                sqlStatement += " AND AdvertisementInfos.Age <= {" + parametersCount + "}";
                paramsList.Add(filters.MaxAge);
                parametersCount++;
            }

            List<Advertisement> result = await _context.Advertisements
                .FromSqlRaw(sqlStatement, paramsList.ToArray())
                .Include(a => a.AdvertisementInfo)
                .Include(a => a.AdvertisementLocation)
                .Include(a => a.AdvertisementDeletings)
                .Where(a => a.AdvertisementDeletings.Count == 0 && a.Completed == false)
                .ToListAsync();


            // Pet Types and Breeds
            if (filters.PetTypes != null && filters.PetTypes.Count > 0)
            {
                result = result.Where(a => filters.PetTypes.Contains(a.PetType!)).ToList();
            }

            if(filters.PetBreeds != null && filters.PetBreeds.Count > 0)
            {
                result = result.Where(a => filters.PetBreeds.Contains(a.AdvertisementInfo!.Breed!)).ToList();
            }

            return result;
        }

        public async Task<ICollection<Advertisement>> GetAdvertisementsByUser(int userId)
        {
            List<Advertisement> result = await _context.Advertisements
                .Include(a => a.AdvertisementInfo)
                .Include(a => a.AdvertisementLocation)
                .Include(a => a.AdvertisementDeletings)
                .Where(a => a.UserId == userId && a.AdvertisementDeletings.Count == 0)
                .ToListAsync();
            return result;
        }

        public async Task<Advertisement> GetAdvertisementsById(int advId)
        {
            var result = await _context.Advertisements
                .Include(a => a.AdvertisementInfo)
                .Include(a => a.AdvertisementLocation)
                .Include(a => a.AdvertisementDeletings)
                .FirstOrDefaultAsync(a => a.Id == advId && a.AdvertisementDeletings.Count == 0);

            return result;
        }

        public async Task<DeletingResult> DeleteAdvertisement(int advertisementId)
        {
            var advertisement = await _context.Advertisements.FindAsync(advertisementId);
            if (advertisement == null)
                return DeletingResult.ItemNotFound;

            var deletedBefore = await _context.AdvertisementDeletings.Where(a => a.AdvertisementId == advertisementId).ToListAsync();
            if (deletedBefore.Count != 0)
                return DeletingResult.ItemNotFound;

            AdvertisementDeleting deleting = new AdvertisementDeleting();
            deleting.DeleteDate = DateTime.Now;
            deleting.AdvertisementId = advertisementId;
            deleting.Reason = "self";
            _context.AdvertisementDeletings.Add(deleting);
            await _context.SaveChangesAsync();

            return DeletingResult.Success;
        }

        public async Task<CreationResult> AddPicturesToAdvertisement(int advertisementId, IFormFileCollection files)
        {
            if (_context.Advertisements.Find(advertisementId) == null)
                return CreationResult.IncorrectData;

            var uploadPath = Directory.GetCurrentDirectory() + advertisementMediaPath + "\\" + advertisementId;
            Directory.CreateDirectory(uploadPath);


            int i = 0;
            foreach (var file in files)
            {
                string fileExtension = Path.GetExtension(file.FileName);
                string fullPath = $"{uploadPath}\\{i}{fileExtension}";
                Console.WriteLine(fullPath);
                using (var fileStream = new FileStream(fullPath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
                i++;
            }

            return CreationResult.Success;
        }
    }
}
