using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Urge.Users.ViewModels
{
    public class ApiAccessToken
    {
        public DateTime? ExpiresUtc { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}
