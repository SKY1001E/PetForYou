using Pet4YouAPI.DTO;
using Pet4YouAPI.Models;

namespace Pet4YouAPI.DI
{
    public interface IAdvertisementService
    {
        public Task<(CreationResult, int)> CreateAdvertisement(Advertisement advertisement);

        public Task<ICollection<Advertisement>> GetAdvertisements(AdvertisementFilterModel filters);

        public Task<ICollection<Advertisement>> GetAdvertisementsByUser(int userId);

        public Task<Advertisement> GetAdvertisementsById(int advId);

        public Task<DeletingResult> DeleteAdvertisement(int advertisementId);

        public Task<CreationResult> AddPicturesToAdvertisement(int advertisementId, IFormFileCollection files);

        public ICollection<string> GetAdvertisementPicturesURLs(int advertisementId);
    }
}
