using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;
using Urge.Common.Web.User;

namespace Urge.SPA.Controllers
{
    public class AuthController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IUserAccessor _userAccessor;

        public AuthController(IConfiguration configuration, IUserAccessor userAccessor)
        {
            _configuration = configuration;
            _userAccessor = userAccessor;
        }

        [AllowAnonymous]
        [HttpGet("/auth/signin-implicit")]
        public IActionResult SigninImplicit()
        {
            return View();
        }

        [AllowAnonymous]
        [HttpPost("/auth/signin-oidc")]
        public async Task<IActionResult> Signin([FromForm] IFormCollection form)
        {
            string jwt = "";

            foreach (var element in form)
            {
                if (element.Key == "id_token")
                {
                    jwt = element.Value;

                    break;
                }
            }

            if (!string.IsNullOrEmpty(jwt))
            {
                var claims = await ValidateToken(jwt);

                if (claims != null && claims.AadUniqueId != null)
                {
                    return Redirect("/user/loggedin");
                }
            }

            return Unauthorized();
        }

        private async Task<UrgeClaimsProfile> ValidateToken(string jwt)
        {
            var tenant = _configuration[ConfigKey.AADB2C.Tenant.Path];
            var policy = _configuration[ConfigKey.AADB2C.Policy.Path];
            var clientId = _configuration[ConfigKey.AADB2C.ClientId.Path];

            try
            {
                // resolve signing key
                var metadataAddress = $"https://urgeaad.b2clogin.com/{tenant}/v2.0/.well-known/openid-configuration?p={policy}";
                var openIdConfigurationManager = new ConfigurationManager<OpenIdConnectConfiguration>(metadataAddress, new OpenIdConnectConfigurationRetriever());
                var openIdConfiguration = await openIdConfigurationManager.GetConfigurationAsync();

                // validate token
                var tokenHandler = new JwtSecurityTokenHandler();

                var validationParameters = new TokenValidationParameters
                {
                    ValidAudiences = new[] { clientId },
                    ValidIssuers = new[] { openIdConfiguration.Issuer, $"{openIdConfiguration.Issuer}/v2.0" },
                    IssuerSigningKeys = openIdConfiguration.SigningKeys,
                    ValidateLifetime = true,
                };

                var claimsPrincipal = tokenHandler.ValidateToken(jwt, validationParameters, out SecurityToken validatedToken);

                _userAccessor.HttpContextAccessor.HttpContext.User = claimsPrincipal;

                return _userAccessor.ClaimsProfile;
            }
            catch (SecurityTokenExpiredException)
            {
                // Figure out how to work with refresh tokens
                return null;
            }
            catch (Exception)
            {
                return null;
            }

        }
    }
}
