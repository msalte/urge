using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System;
using System.Net;
using System.Threading.Tasks;

namespace Urge.Common.Web
{
    public static class OpenIdConnectEvents
    {
        public static Task HandleRedirectToIdentityProvider(RedirectContext context)
        {
            var redirectUrl = $"https://{context.Request.Host}/auth/signin-implicit";

            context.Properties.Items.Add(OpenIdConnectDefaults.RedirectUriForCodePropertiesKey, redirectUrl);

            var state = context.Options.StateDataFormat.Protect(context.Properties);

            var implicitUrl = $"{context.Options.Authority}/oauth2/authorize?" +
                $"&client_id={context.Options.ClientId}" +
                $"&nonce={context.ProtocolMessage.Nonce}" +
                $"&redirect_uri={WebUtility.UrlEncode(redirectUrl)}" +
                $"&scope=openid offline_access" +
                $"&response_type=code+id_token" +
                $"&prompt=login" +
                $"&state={state}" +
                $"&response_mode=fragment";

            context.Response.Redirect(implicitUrl);

            context.HandleResponse();

            return Task.CompletedTask;
        }

        public static async Task HandleAuthorizationCodeReceived(AuthorizationCodeReceivedContext context)
        {
            var tokenCacheFactory = context.HttpContext.RequestServices.GetRequiredService<ITokenCacheFactory>();
            var tokenCache = await tokenCacheFactory.CreateTokenCacheForUser(context.Principal.GetUniqueIdString());

            var authContext = new AuthenticationContext(context.Options.Authority, tokenCache);

            var redirectUri = new Uri(context.TokenEndpointRequest.RedirectUri, UriKind.RelativeOrAbsolute);
            var clientCredential = new ClientCredential(context.Options.ClientId, context.Options.ClientSecret);

            var result = await authContext.AcquireTokenByAuthorizationCodeAsync(context.TokenEndpointRequest.Code, redirectUri, clientCredential, context.Options.ClientId);

            context.HandleCodeRedemption(result.AccessToken, result.IdToken);
        }
    }
}
