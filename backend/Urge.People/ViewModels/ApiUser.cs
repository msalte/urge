using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Urge.Users.Models;

namespace Urge.Users.ViewModels
{
    public class ApiUser
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public ApiUser(User user)
        {
            Id = user.Id;
            Name = user.Name;
            Email = user.Email;
        }
    }
}
