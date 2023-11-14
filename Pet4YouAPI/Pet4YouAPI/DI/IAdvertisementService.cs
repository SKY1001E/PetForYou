using Pet4YouAPI.DTO;
using Pet4YouAPI.Models;

namespace Pet4YouAPI.DI
{
    public interface IAdvertisementService
    {
        public Task<CreationResult> CreateAdvertisement(Advertisement advertisement);
    }
}
