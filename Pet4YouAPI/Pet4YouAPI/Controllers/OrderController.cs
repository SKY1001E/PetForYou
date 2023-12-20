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
    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;
        public OrderController (IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderRequest orderRequest)
        {
            CreationResult result = await _orderService.AddOrderRequest(orderRequest);
            if (result == CreationResult.IncorrectRefference)
                return BadRequest("Incorrect user or advertisement id");
            if (result == CreationResult.Success)
                return Ok();
            return BadRequest();
        }

        [HttpGet("in/{userId}")]
        public async Task<ActionResult<ICollection<OrderRequest>>> GetUserInputOrders(int userId)
        {
            var userInputOrders = await _orderService.GetUserInputOrders(userId);
            return (List<OrderRequest>)userInputOrders;
        }

        [HttpGet("out/{userId}")]
        public async Task<ActionResult<ICollection<OrderRequest>>> GetUserOutputOrders(int userId)
        {
            var userOutputOrders = await _orderService.GetUserOutputOrders(userId);
            return (List<OrderRequest>)userOutputOrders;
        }

        [HttpGet("completed/{userId}")]
        public async Task<ActionResult<ICollection<OrderRequest>>> GetAllUserCompletedOrders(int userId)
        {
            var result = await _orderService.GetUserCompletedOrders(userId);
            return (List<OrderRequest>)result;
        }

        [HttpPatch]
        public async Task<IActionResult> ChangeOrderRequestStatus(OrderRequest orderRequest)
        {
            ModifyResult result = await _orderService.ChangeOrderRequestStatus(orderRequest);
            if (result == ModifyResult.ItemNotFound)
                return NotFound();
            if (result == ModifyResult.Success)
                return Ok();
            return BadRequest();
        }

    }
}
