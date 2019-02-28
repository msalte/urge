﻿using Microsoft.AspNetCore.Mvc;
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
using Urge.Common.Security;
using Urge.Users.Database;
using Urge.Users.ViewModels;

namespace Urge.Users.Controllers
{
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
        public async Task<IActionResult> AuthenticateUser([FromBody] CreateTokenRequest request)
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

            var key = Encoding.UTF8.GetBytes(_configuration["jwt-symmetric-private-key"]);

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Name, user.Name)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);

            return Ok(new ApiAccessToken
            {
                Token = jwt,
                ExpiresUtc = tokenDescriptor.Expires
            });
        }
    }
}