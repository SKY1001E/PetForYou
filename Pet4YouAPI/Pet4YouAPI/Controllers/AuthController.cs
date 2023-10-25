﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Pet4YouAPI.DI;
using Pet4YouAPI.Models;
using ProjectHiveAPI.Models;
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

        public AuthController(IAuthService authService)
        {
            this._authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<string>> Register(AuthModel authModel)
        {

            var user = new User()
            {
                Login = authModel.Login,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(authModel.Password),
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

            return Ok();
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(AuthModel authModel)
        {
            var user = await _authService.Login(authModel);

            if (user == null || user.UserInfo == null)
            {
                return Unauthorized();
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
                    new Claim(ClaimTypes.NameIdentifier, $"{user.Id}"),

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
