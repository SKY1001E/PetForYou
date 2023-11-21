using Pet4YouAPI.DTO;
using Pet4YouAPI.Models;

namespace Pet4YouAPI.DI
{
    public interface IAdvertisementService
    {
        public Task<CreationResult> CreateAdvertisement(Advertisement advertisement);

        public Task<ICollection<Advertisement>> GetAdvertisements(AdvertisementFilterModel filters);

        public Task<ICollection<Advertisement>> GetUserAdvertisement(int userId);
    }
}
