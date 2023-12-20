using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Configuration;
using Pet4YouAPI.DI;
using Pet4YouAPI.DTO;
using Pet4YouAPI.Models;
using System.Collections;

namespace Pet4YouAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RatingController : Controller
    {
        private readonly IRatingService _ratingService;
        public RatingController(IRatingService ratingService)
        {
            _ratingService = ratingService;
        }

       
        [HttpPost]
        public async Task<IActionResult> AddRating([FromBody] Rating rating)
        {
            CreationResult result = await _ratingService.AddRating(rating);
            if (result == CreationResult.Success)
                return Ok();
            if (result == CreationResult.IncorrectData)
                return BadRequest("You cannot add rating to youself");
            if (result == CreationResult.IncorrectRefference)
                return BadRequest("Incorrect users id");
            return BadRequest();
        }

        [HttpGet("latest/{userId}")]
        public async Task<ActionResult<ICollection<Rating>>> GetLatestUserRatings(int userId)
        {
            ICollection<Rating> ratings = await _ratingService.GetLatestUserRatings(userId);
            return (List<Rating>)ratings;
        }

        [HttpGet("average/{userId}")]
        public async Task<ActionResult<decimal>> GetUserAverageRating(int userId)
        {
            return await _ratingService.GetUserAverageRating(userId);
        }

    }
}
