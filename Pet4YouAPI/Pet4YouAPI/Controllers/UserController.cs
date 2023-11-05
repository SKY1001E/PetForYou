using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pet4YouAPI.DI;
using Pet4YouAPI.Models;
using Pet4YouAPI.DTO;

namespace Pet4YouAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _userService.DeleteUser(id);

            if (result == DeletingResult.Success)
                return Ok();
            if (result == DeletingResult.ItemNotFound)
                return NotFound();

            return NoContent();
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserModel updatedUser)
        {
            if (id != updatedUser.Id)
            {
                return BadRequest();
            }

            var result = await _userService.UpdateUserInfo(updatedUser);

            if (result)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangePassword(int userId, string oldPassword, string newPassword)
        {
            var result = await _userService.ChangePassword(userId, oldPassword, newPassword);

            if (result == ChangePasswordResult.Success)
            {
                return Ok();
            }

            if (result == ChangePasswordResult.NewPasswordEqualsOld)
            {
                return BadRequest("New password equals old password");
            }

            if (result == ChangePasswordResult.IncorrectOldPassword)
            {
                return BadRequest("Incorrect old password");
            }

            if (result == ChangePasswordResult.UserNotFound)
            {
                return BadRequest("User not found");
            }

            return NoContent();
        }

        [HttpGet("{login}")]
        public async Task<ActionResult<User>> GetUserByLogin(string login)
        {
            var user = await _userService.GetUserByLogin(login);

            if (user == null)
                return NotFound();

            return user;
        }

        [HttpGet("id/{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await _userService.GetUserById(id);

            if (user == null)
                return NotFound();

            return user;
        }
    }
}
