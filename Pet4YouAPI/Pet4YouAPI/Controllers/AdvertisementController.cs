using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Pet4YouAPI.DI;
using Pet4YouAPI.Models;

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

        [HttpPost]
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
    }
}
