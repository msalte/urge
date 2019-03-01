using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Urge.Common.Security;
using Urge.Users.Database;
using Urge.Users.Models;
using Urge.Users.ViewModels;

namespace Urge.Users.Controllers
{
    [Authorize]
    public class UsersController : Controller
    {
        private readonly UsersContext usersContext;

        public UsersController(UsersContext usersContext)
        {
            this.usersContext = usersContext;
        }

        [AllowAnonymous]
        [HttpPost("users")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
        {
            if (ModelState.IsValid)
            {
                if (usersContext.Users.Any(u => u.Email.ToLower() == request.Email.ToLower()))
                {
                    return Conflict("User with given email already exists.");
                }

                var hashedPassword = Passwords.HashPassword(request.Password);

                var user = new User
                {
                    Name = request.Name,
                    Email = request.Email,
                    PasswordHash = hashedPassword.Hash,
                    PasswordSalt = hashedPassword.Salt
                };

                await usersContext.Users.AddAsync(user);
                await usersContext.SaveChangesAsync();

                return Created("users", new ApiUser(user));
            }

            throw new ArgumentException("Could not create user. Input model state was invalid.");
        }

        [HttpGet("users")]
        public async Task<List<ApiUser>> GetAllUsers()
        {
            return await usersContext.Users.Select(u => new ApiUser(u)).ToListAsync();
        }
    }
}
