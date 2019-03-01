using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Urge.Common.Configuration;
using Urge.Common.Security;
using Urge.Users.Database;
using Urge.Users.Models;
using Urge.Users.ViewModels;

namespace Urge.Users.Controllers
{
    [AllowAnonymous]
    public class AuthenticationController : Controller
    {
        private readonly UsersContext _usersContext;
        private readonly IConfiguration _configuration;

        public AuthenticationController(UsersContext usersContext, IConfiguration configuration)
        {
            _usersContext = usersContext;
            _configuration = configuration;
        }

        [HttpPost("/auth/token")]
        public async Task<IActionResult> CreateTokenForUser([FromBody] CreateTokenRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest("You must supply both an email and a password");
            }

            var user = await _usersContext.Users.SingleOrDefaultAsync(u => u.Email.ToLower() == request.Email.ToLower());

            if (user == null)
            {
                return NotFound($"No user found with email {request.Email}");
            }

            var hashedPassword = Passwords.HashPassword(request.Password, user.PasswordSalt);

            if (hashedPassword.Hash != user.PasswordHash)
            {
                return StatusCode(403, "Incorrect user email or password.");
            }

            var token = GenerateAccessTokenForUser(user);

            return Ok(token);
        }

        private ApiAccessToken GenerateAccessTokenForUser(User user)
        {
            var key = Encoding.UTF8.GetBytes(_configuration[ConfigKey.Authentication.JWTSymmetricKey.Path]);

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Name, user.Name)
                }),
                Expires = DateTime.UtcNow.AddHours(24),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);

            return new ApiAccessToken
            {
                Token = jwt,
                ExpiresUtc = tokenDescriptor.Expires
            };
        }
    }
}
