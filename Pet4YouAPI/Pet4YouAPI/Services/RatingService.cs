using Microsoft.EntityFrameworkCore;
using Pet4YouAPI.DBContext;
using Pet4YouAPI.DI;
using Pet4YouAPI.Models;
using System.Linq;

namespace Pet4YouAPI.Services
{
    public class RatingService : IRatingService
    {
        private Pet4YouContext _context;

        public RatingService(Pet4YouContext context)
        {
            _context = context;
        }

        public async Task<CreationResult> AddRating(Rating rating)
        {
            if (rating.RaterUserId == rating.RecipientUserId)
                return CreationResult.IncorrectData;

            bool isUserExists = await _context.Users.Where(e => e.Id == rating.RaterUserId && e.Deleted != true).AnyAsync();
            if (!isUserExists)
                return CreationResult.IncorrectRefference;

            bool isUserRecipientExists = await _context.Users.Where(e => e.Id == rating.RecipientUserId && e.Deleted != true).AnyAsync();
            if (!isUserRecipientExists)
                return CreationResult.IncorrectRefference;

            rating.RatingDate = DateTime.Now;
            _context.Ratings.Add(rating);
            await _context.SaveChangesAsync();
            return CreationResult.Success;
        }

        public async Task<ICollection<Rating>> GetLatestUserRatings(int userId)
        {
            return await _context.Ratings
                .Where(e => e.RecipientUserId == userId)
                .OrderByDescending(e => e.RatingDate)
                .Take(5)
                .ToListAsync();
        }

        public async Task<decimal?> GetUserAverageRating(int userId)
        {
            bool isUserExists = await _context.Users.Where(e => e.Id == userId && e.Deleted != true).AnyAsync();
            if (!isUserExists)
                return null;

            var ratings = await _context.Ratings
                .Where(e => e.RecipientUserId == userId)
                .ToListAsync();

            if (ratings.Count == 0)
                return -1;

            decimal rating = ratings
                .Select(e => Convert.ToDecimal(e.Score))
                .Average();

            return rating;
        }

    }
}
