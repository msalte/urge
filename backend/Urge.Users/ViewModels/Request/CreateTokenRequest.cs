using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Urge.Users.ViewModels
{
    public class CreateTokenRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
