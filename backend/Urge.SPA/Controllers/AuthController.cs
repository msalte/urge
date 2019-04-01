using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Threading.Tasks;
using Urge.Common.Web;

namespace Urge.SPA.Controllers
{
    public class AuthController : Controller
    {
        private readonly IConfigurationAccessor _configAccessor;
        private readonly IUserAccessor _userAccessor;
        private readonly EndpointConfig _endpointConfig;

        public AuthController(IConfigurationAccessor configuration, IUserAccessor userAccessor, EndpointConfig endpointConfig)
        {
            _configAccessor = configuration;
            _userAccessor = userAccessor;
            _endpointConfig = endpointConfig;
        }

        [HttpGet("/auth/login")]
        public IActionResult Login()
        {
            //var tenant = _configAccessor.Get(ConfigKey.AADB2C.Tenant);
            //var policy = _configAccessor.Get(ConfigKey.AADB2C.Policy);
            //var audience = _configAccessor.Get(ConfigKey.AADB2C.Audience); // clientId
            //var redirectUrl = $"{_endpointConfig.Spa}/signin-oidc";

            //var authorizeUrl = $"https://urgeaad.b2clogin.com/{tenant}/oauth2/v2.0/authorize?" +
            //    $"p={policy}" +
            //    $"&client_id={audience}" +
            //    $"&nonce=defaultNonce" +
            //    $"&redirect_uri={redirectUrl}" +
            //    $"&scope=openid offline_access" +
            //    $"&response_type=code+id_token" +
            //    $"&prompt=login" +
            //    $"&response_mode=fragment";

            return Redirect("/");
        }

        [HttpGet("/auth/signin-implicit")]
        [AllowAnonymous]
        public IActionResult SigninImplicit()
        {
            return View();
        }

        //[AllowAnonymous]
        //[HttpPost("/auth/signin-oidc")]
        //public async Task<IActionResult> SigninAsync([FromForm] IFormCollection form)
        //{
        //    var idToken = form["id_token"];
        //    var authCode = form["code"];

        //    if (!string.IsNullOrEmpty(idToken) && !string.IsNullOrEmpty(authCode))
        //    {
        //        var claims = await ValidateIdTokenAsync(idToken);

        //        if (claims != null && claims.AadUniqueId != null)
        //        {
        //            // id token is valid, use auth token to get access token and refresh token
        //            var tenant = _configAccessor.Get(ConfigKey.AADB2C.Tenant);
        //            var policy = _configAccessor.Get(ConfigKey.AADB2C.Policy);
        //            var audience = _configAccessor.Get(ConfigKey.AADB2C.Audience); // clientId
        //            var clientSecret = _configAccessor.Get(ConfigKey.Authentication.OAuth2ClientSecret);

        //            var tokenUrl = $"https://urgeaad.b2clogin.com/{tenant}/oauth2/v2.0/token?p={policy}";
        //            var redirectUrl = $"{_endpointConfig.Spa}/auth/signin-oidc";

        //            var http = new HttpClient();

        //            var content = new Dictionary<string, string>
        //            {
        //                { "grant_type", "authorization_code" },
        //                { "client_id", audience },
        //                { "scope", $"{audience} offline_access" },
        //                { "code", authCode },
        //                { "client_secret", clientSecret },
        //                { "redirect_uri", redirectUrl }
        //            };

        //            var response = await http.PostAsync(tokenUrl, new FormUrlEncodedContent(content));
        //            var json = await response.Content.ReadAsStringAsync();

        //            var tokens = JsonConvert.DeserializeAnonymousType(json, new
        //            {
        //                id_token = "",
        //                access_token = "",
        //                refresh_token = ""
        //            });

        //            ViewData["tokens"] = JsonConvert.SerializeObject(tokens);

        //            return View("SigninSuccess");
        //        }
        //    }

        //    return Unauthorized();
        //}

        //private async Task AcuireTokenSilentAsync(string userId)
        //{
        //    var tenantId = _configAccessor.Get(ConfigKey.AADB2C.TenantId);
        //    var policy = _configAccessor.Get(ConfigKey.AADB2C.Policy);
        //    var audience = _configAccessor.Get(ConfigKey.AADB2C.Audience); // clientId
        //    var authority = $"https://urgeaad.b2clogin.com/tfp/{tenantId}/{policy}/v2.0/";

        //    var clientSecret = _configAccessor.Get(ConfigKey.Authentication.OAuth2ClientSecret);
        //    var context = new AuthenticationContext(authority);
        //    var clientCredential = new ClientCredential(audience, clientSecret);

        //    var userIdentifier = new UserIdentifier(userId, UserIdentifierType.UniqueId);

        //    var token = await context.AcquireTokenSilentAsync(audience, clientCredential, userIdentifier);
        //}

        //private async Task<UrgeClaimsProfile> ValidateIdTokenAsync(string jwt)
        //{
        //    var tenant = _configAccessor.Get(ConfigKey.AADB2C.Tenant);
        //    var policy = _configAccessor.Get(ConfigKey.AADB2C.Policy);
        //    var audience = _configAccessor.Get(ConfigKey.AADB2C.Audience);

        //    try
        //    {
        //        // resolve signing key
        //        var metadataAddress = $"https://urgeaad.b2clogin.com/{tenant}/v2.0/.well-known/openid-configuration?p={policy}";
        //        var openIdConfigurationManager = new ConfigurationManager<OpenIdConnectConfiguration>(metadataAddress, new OpenIdConnectConfigurationRetriever());
        //        var openIdConfiguration = await openIdConfigurationManager.GetConfigurationAsync();

        //        // validate token
        //        var tokenHandler = new JwtSecurityTokenHandler();

        //        var validationParameters = new TokenValidationParameters
        //        {
        //            ValidAudiences = new[] { audience },
        //            ValidIssuers = new[] { openIdConfiguration.Issuer, $"{openIdConfiguration.Issuer}/v2.0" },
        //            IssuerSigningKeys = openIdConfiguration.SigningKeys,
        //        };

        //        var claimsPrincipal = tokenHandler.ValidateToken(jwt, validationParameters, out SecurityToken validatedToken);

        //        _userAccessor.HttpContextAccessor.HttpContext.User = claimsPrincipal;

        //        if (validatedToken.ValidTo < DateTime.UtcNow)
        //        {
        //            // Token expired, figure out how to work with refresh tokens
        //        }

        //        return _userAccessor.ClaimsProfile;
        //    }
        //    catch (Exception)
        //    {
        //        return null;
        //    }

        //}
    }
}
