using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Pet4YouAPI.DI;
using Pet4YouAPI.DTO;
using Pet4YouAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace Pet4YouAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IHashService _hashService;

        public AuthController(IAuthService authService, IHashService hashService)
        {
            this._authService = authService;
            this._hashService = hashService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<string>> Register(AuthModel authModel)
        {

            var user = new User()
            {
                Login = authModel.Email,
                PasswordHash = _hashService.HashPassword(authModel.Password),
                RegistrationDate = DateTime.Now,
                UserInfo = new UserInfo() {
                    Email = authModel.Email
                }
            };

            var registrationResult = await _authService.Register(user);

            if (registrationResult == RegistrationResult.LoginExists)
                return BadRequest("User with this login already exists");

            if (registrationResult == RegistrationResult.EmailExists)
                return BadRequest("User with this email already exists");

            if (registrationResult == RegistrationResult.OtherError)
                return BadRequest("Error during registration");

            return Ok(true);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(AuthModel authModel)
        {
            var user = await _authService.Login(authModel);

            if (user == null || user.UserInfo == null)
            {
                return Unauthorized();
            }

            if (user.Banned)
            {
                return new ObjectResult("Access forbidden")
                {
                    StatusCode = 403
                };
            }

            var token = GenerateJwtToken(user);

  
            return Ok(new
            {
                token,
                user
            });
           
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(key);
            }
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Email, user.UserInfo.Email),
                    new Claim("userId", $"{user.Id}"),

                    // Дополнительные утверждения (claims) о пользователе
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
