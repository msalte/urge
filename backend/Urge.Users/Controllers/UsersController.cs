using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Urge.Common.Security;
using Urge.Common.Web;
using Urge.Users.Database;
using Urge.Users.Models;
using Urge.Users.ViewModels;

namespace Urge.Users.Controllers
{
    public class UsersController : Controller
    {
        private readonly UsersContext _usersContext;
        private readonly IUserAccessor _userAccessor;

        public UsersController(UsersContext usersContext, IUserAccessor userAccessor)
        {
            _usersContext = usersContext;
            _userAccessor = userAccessor;
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

            if (_usersContext.Users.Any(u => u.Email == requestEmail))
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

            await _usersContext.Users.AddAsync(user);
            await _usersContext.SaveChangesAsync();

            return Created("users", new ApiUser(user));
        }

        [HttpGet("users/me")]
        public async Task<IActionResult> MyProfile()
        {
            var email = _userAccessor.ClaimsProfile.Email;

            var user = await _usersContext.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());

            return Ok(new ApiUser(user));
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _usersContext.Users.Select(u => new ApiUser(u)).ToListAsync();

            return Ok(users);
        }
    }
}
