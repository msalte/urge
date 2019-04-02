using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace Urge.Common.Web
{
    public interface IUserAccessor
    {
        UrgeClaimsProfile ClaimsProfile { get; }
        IHttpContextAccessor HttpContextAccessor { get; }
    }

    public class UserAccessor : IUserAccessor
    {
        public UserAccessor(IHttpContextAccessor httpContext)
        {
            HttpContextAccessor = httpContext;
        }
        public IHttpContextAccessor HttpContextAccessor { get; }

        public UrgeClaimsProfile ClaimsProfile => UserFromClaims(HttpContextAccessor.HttpContext.User);


        private UrgeClaimsProfile UserFromClaims(ClaimsPrincipal user)
        {
            Guid.TryParse(user.FindFirstValue(UrgeClaimTypes.ID), out Guid id);

            return new UrgeClaimsProfile
            {
                AadUniqueId = id,
                Email = user.FindFirstValue(UrgeClaimTypes.EMAIL_ADDRESS),
                Name = $"{user.FindFirstValue(UrgeClaimTypes.GIVENNAME)} {user.FindFirstValue(UrgeClaimTypes.SURNAME)}"
            };
        }
    }
}
