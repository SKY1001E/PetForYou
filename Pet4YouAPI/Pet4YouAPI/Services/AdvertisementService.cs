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


            // Pet Types and Breeds
            if (filters.PetTypes != null && filters.PetTypes.Count > 0)
            {
                sqlStatement += " AND Advertisements.PetType IN ({" + parametersCount + "})";
                paramsList.Add(filters.PetTypes.ToArray());
                parametersCount++;
            }

            if(filters.PetBreeds != null && filters.PetBreeds.Count > 0)
            {
                sqlStatement += " AND AdvertisemenInfos.Breed IN ({" + parametersCount + "})";
                paramsList.Add(filters.PetBreeds.ToArray());
                parametersCount++;
            }

            // Location
            if(filters.Locatinon?.Country != null && filters.Locatinon.Country != "")
            {
                sqlStatement += " AND AdvertisementLocations.Country = {" + parametersCount + "}";
                paramsList.Add(filters.Locatinon.Country);
                parametersCount++;
            }

            if (filters.Locatinon?.Region != null && filters.Locatinon.Region != "")
            {
                sqlStatement += " AND AdvertisementLocations.Region = {" + parametersCount + "}";
                paramsList.Add(filters.Locatinon.Region);
                parametersCount++;
            }

            if (filters.Locatinon?.City != null && filters.Locatinon.City != "")
            {
                sqlStatement += " AND AdvertisementLocations.City = {" + parametersCount + "}";
                paramsList.Add(filters.Locatinon.City);
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
                sqlStatement += " AND AdvertisementInfos.Price = {" + parametersCount + "}";
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
                .ToListAsync();

            return result;
        }

        public Task<ICollection<Advertisement>> GetUserAdvertisement(int userId)
        {
            throw new NotImplementedException();
        }
    }
}
