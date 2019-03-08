using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace Urge.Common.User
{
    public interface IUserAccessor
    {
        UrgeClaimsProfile ClaimsProfile { get; }
    }

    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContext;

        public UserAccessor(IHttpContextAccessor httpContext)
        {
            _httpContext = httpContext;
        }

        public UrgeClaimsProfile ClaimsProfile => UserFromClaims(_httpContext.HttpContext.User);

        private UrgeClaimsProfile UserFromClaims(ClaimsPrincipal user)
        {
            return new UrgeClaimsProfile
            {
                Name = user.FindFirstValue(ClaimTypes.Name),
                Email = user.FindFirstValue(ClaimTypes.Email)
            };
        }
    }
}
