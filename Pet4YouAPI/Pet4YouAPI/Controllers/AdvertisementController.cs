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
            (var advertisementCreationResult, var advertisementId) = await _advertisementService.CreateAdvertisement(advertisement);
            Console.WriteLine(advertisementId);
            if (advertisementCreationResult == CreationResult.Success)
                return Ok(advertisementId);
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

        [HttpGet("user/id")]
        public async Task<ActionResult<List<Advertisement>>> GetAdvertisementByUser(int userId)
        {
            ICollection<Advertisement> result = await _advertisementService.GetAdvertisementsByUser(userId);
            return (List<Advertisement>)result;
        }

        [HttpGet("{id}")]
        public async Task<Advertisement> GetAdvertisementById(int id)
        {
            var advertisement = await _advertisementService.GetAdvertisementsById(id);

            return advertisement;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdvertisement(int id)
        {
            DeletingResult result = await _advertisementService.DeleteAdvertisement(id);
            if (result == DeletingResult.Success)
                return Ok("Advertisement deleted");
            if (result == DeletingResult.ItemNotFound)
                return NotFound("Advertisement not found");
            return BadRequest();
        }

        [HttpPost]
        [Route("add-pictures/{id}")]
        public async Task<IActionResult> AddPictures(int id)
        {
            var httpRequest = HttpContext.Request;
            if (httpRequest.Form.Files.Count == 0)
                return BadRequest("There are no pictures in requrest");
            CreationResult result = await _advertisementService.AddPicturesToAdvertisement(id, httpRequest.Form.Files);
            if (result == CreationResult.IncorrectData)
                return BadRequest("Incorrect advertisement Id");
            return Ok("Pictures added successfully");
        }

        [HttpGet]
        [Route("pictures/{advertisementId}")]
        public IActionResult GetPicturesUrls(int advertisementId)
        {
            try
            {
                ICollection<string> urls = _advertisementService.GetAdvertisementPicturesURLs(advertisementId);
                ICollection<string> result = urls.Select(url => Url.Content(url)).ToList();
                return Ok(urls);
            }
            catch
            {
                return BadRequest("Incorrect advertisement id ");
            }
        }

        [HttpPost]
        [Route("filter/title")]
        public async Task<ActionResult<ICollection<Advertisement>>> GetAdvertisementsByName([FromBody] string title)
        {
            ICollection<Advertisement> advertisements = await _advertisementService.GetAdvertisementsByName(title);
            return Ok(advertisements);
        }

        [HttpPut]
        public async Task<IActionResult> ChangeAdvertisement([FromBody] Advertisement advertisement)
        {
            ModifyResult modifyResult = await _advertisementService.ChangeAdvertisement(advertisement);
            if (modifyResult == ModifyResult.ItemNotFound)
                return NotFound();
            if (modifyResult == ModifyResult.Success)
                return Ok();
            return BadRequest();
        }

    }
}
