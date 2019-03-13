using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Urge.Common.Security;
using Urge.Common.User;
using Urge.Users.Database;
using Urge.Users.Models;
using Urge.Users.ViewModels;

namespace Urge.Users.Controllers
{
    public class UsersController : Controller
    {
        private readonly UsersContext usersContext;
        private readonly IUserAccessor userAccessor;

        public UsersController(UsersContext usersContext, IUserAccessor userAccessor)
        {
            this.usersContext = usersContext;
            this.userAccessor = userAccessor;
        }

        [AllowAnonymous]
        [HttpPost("users")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Could not create user. Input model state was invalid.");
            }

            var requestEmail = request.Email.Trim().ToLower();

            if (usersContext.Users.Any(u => u.Email == requestEmail))
            {
                return Conflict("User with given email already exists.");
            }

            var hashedPassword = Passwords.HashPassword(request.Password);

            var user = new User
            {
                Name = request.Name,
                Email = requestEmail,
                PasswordHash = hashedPassword.Hash,
                PasswordSalt = hashedPassword.Salt
            };

            await usersContext.Users.AddAsync(user);
            await usersContext.SaveChangesAsync();

            return Created("users", new ApiUser(user));
        }

        [HttpGet("users/me")]
        public async Task<IActionResult> MyProfile()
        {
            var email = userAccessor.ClaimsProfile.Email;

            var user = await usersContext.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());

            return Ok(new ApiUser(user));
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await usersContext.Users.Select(u => new ApiUser(u)).ToListAsync();

            return Ok(users);
        }
    }
}
