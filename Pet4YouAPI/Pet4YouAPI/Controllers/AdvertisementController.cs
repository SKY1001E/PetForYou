using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Pet4YouAPI.DI;
using Pet4YouAPI.DTO;
using Pet4YouAPI.Models;
using System.Collections;

namespace Pet4YouAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdvertisementController : Controller
    {
        private readonly IAdvertisementService _advertisementService;
        public AdvertisementController (IAdvertisementService advertisementService)
        {
            _advertisementService = advertisementService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddAdvertisement([FromBody] Advertisement advertisement)
        {
            if (advertisement == null)
                return BadRequest();
            var advertisementCreationResult = await _advertisementService.CreateAdvertisement(advertisement);
            if (advertisementCreationResult == CreationResult.Success)
                return Ok();
            if (advertisementCreationResult == CreationResult.IncorrectRefference)
                return BadRequest("Incorrect refference to User");
            if (advertisementCreationResult == CreationResult.IncorrectData)
                return BadRequest("Incorrect input data");
            return BadRequest();
        }

        [HttpPost("filter")]
        public async Task<ActionResult<List<Advertisement>>> GetAdvertisements([FromBody] AdvertisementFilterModel filters)
        {
            ICollection<Advertisement> result = await _advertisementService.GetAdvertisements(filters);
            return (List<Advertisement>)result;
        }
    }
}
