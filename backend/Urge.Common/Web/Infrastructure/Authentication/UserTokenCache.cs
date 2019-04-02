using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System;
using System.Collections.Generic;
using System.Text;
using Urge.Common.Database;

namespace Urge.Common.Web
{
    public class UserTokenCache : TokenCache
    {
        public string UserId { get; set; }
        public CachedUserToken CachedUserToken { get; set; }

        public UserTokenCache() : base()
        {
        }

        public UserTokenCache(byte[] state) : base(state)
        {

        }
    }
}
