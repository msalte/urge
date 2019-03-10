using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
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

        [HttpPost("auth/login")]
        public async Task<IActionResult> CreateTokenForUser([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("You must supply both an email and a password");
            }

            var user = await _usersContext.Users
                .Include(u => u.RefreshTokens)
                .SingleOrDefaultAsync(u => u.Email.ToLower() == request.Email.ToLower());

            if (user == null)
            {
                return NotFound($"No user found with email {request.Email}");
            }

            var hashedPassword = Passwords.HashPassword(request.Password, user.PasswordSalt);

            if (hashedPassword.Hash != user.PasswordHash)
            {
                return StatusCode(403, "Incorrect user email or password.");
            }

            var refreshToken = GenerateRefreshToken();
            var token = CreateAccessTokenForUser(user, refreshToken);

            user.RefreshTokens.Add(new RefreshToken() { Token = refreshToken, UserId = user.Id });

            await _usersContext.SaveChangesAsync();

            return Ok(token);
        }

        [HttpPost("auth/refreshToken")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("You must supply both a token and a refresh token");
            }

            var claimsPrincipal = ResolveClaimsFromExpiredToken(request.Token);

            var email = claimsPrincipal.FindFirstValue(ClaimTypes.Email);

            if (email == null)
            {
                throw new ArgumentException("Unable to resolve valid user claims from request.");
            }

            var user = await _usersContext.Users
                .Include(u => u.RefreshTokens)
                .SingleOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());

            var existingRefreshToken = user.RefreshTokens.FirstOrDefault(t => t.Token == request.RefreshToken);

            if (existingRefreshToken == null)
            {
                throw new SecurityTokenException("Invalid refresh token.");
            }

            var newRefreshToken = GenerateRefreshToken();
            var newAccessToken = CreateAccessTokenForUser(user, newRefreshToken);

            user.RefreshTokens.Remove(existingRefreshToken);
            user.RefreshTokens.Add(new RefreshToken() { UserId = user.Id, Token = newRefreshToken });

            await _usersContext.SaveChangesAsync();

            return Ok(newAccessToken);
        }

        private ClaimsPrincipal ResolveClaimsFromExpiredToken(string expiredToken)
        {
            var tokenValidationsParams = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = GetSymmetricSecurityKey(),
                ValidateLifetime = false, // don't care if token is expired.
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(expiredToken, tokenValidationsParams, out SecurityToken validatedToken);
            var jwt = (JwtSecurityToken)validatedToken;

            if (jwt == null || !jwt.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token.");

            return principal;
        }

        private ApiAccessToken CreateAccessTokenForUser(User user, string refreshToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Name, user.Name)
                }),
                Expires = DateTime.UtcNow.AddMinutes(2),
                SigningCredentials = new SigningCredentials(GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);

            return new ApiAccessToken
            {
                Token = jwt,
                ExpiresUtc = tokenDescriptor.Expires,
                RefreshToken = refreshToken
            };
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        private SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            var key = Encoding.UTF8.GetBytes(_configuration[ConfigKey.Authentication.JWTSymmetricKey.Path]);
            return new SymmetricSecurityKey(key);
        }
    }
}
