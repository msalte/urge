using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Urge.Users.ViewModels
{
    public class LogoutRequest
    {
        [Required]
        public string RefreshToken { get; set; }
    }
}
