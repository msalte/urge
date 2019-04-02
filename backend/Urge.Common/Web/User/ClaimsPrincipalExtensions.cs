using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace Urge.Common.Web
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetUniqueIdString(this ClaimsPrincipal principal)
        {
            return principal.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier")?.Value;
        }
    }
}
