using Pet4YouAPI.DTO;
using Pet4YouAPI.Models;

namespace Pet4YouAPI.DI
{
    public interface IRatingService
    {
        public Task<decimal?> GetUserAverageRating(int userId);

        public Task<CreationResult> AddRating(Rating rating);

        public Task<ICollection<Rating>> GetLatestUserRatings(int userId);
    }
}
