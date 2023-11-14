using Pet4YouAPI.Models;
using Pet4YouAPI.DBContext;
using Pet4YouAPI.DI;
using Microsoft.AspNetCore.Mvc;

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
    }
}
