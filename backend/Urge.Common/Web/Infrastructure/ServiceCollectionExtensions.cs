using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using System;
using System.Net;
using System.Threading.Tasks;

namespace Urge.Common.Web
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSqlDbContext<TContext>(this IServiceCollection services, string connectionString) where TContext : DbContext
        {
            if (string.IsNullOrEmpty(connectionString) || Environment.GetEnvironmentVariable("TF_BUILD") != null)
            {
                connectionString = "Server=idontexist;Database=neitherdoi;Trusted_Connection=True;";
            }

            services.AddDbContext<TContext>(options =>
            {
                options.UseSqlServer(connectionString);
            });

            return services;
        }

        public static IServiceCollection AddDefaultMicroserviceServices(this IServiceCollection services)
        {
            // global auth policy
            services.AddMvc(options =>
            {
                var policy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();

                options.Filters.Add(new AuthorizeFilter(policy));
            });

            services.AddDefaultMicroserviceAuthentication();
            services.AddMicroserviceDiscovery();
            services.AddDefaultCorsPolicy();

            services.AddHttpContextAccessor();
            services.AddTransient<IUserAccessor, UserAccessor>();
            services.AddSingleton<IConfigurationAccessor, AppConfigAccessor>();

            return services;
        }

        private static IServiceCollection AddDefaultCorsPolicy(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(CorsPolicy.ALLOW_ALL, policy =>
                {
                    policy
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                    //.WithExposedHeaders("Token-Expired");
                });
            });

            return services;
        }

        private static IServiceCollection AddDefaultMicroserviceAuthentication(this IServiceCollection services)
        {
            var configuration = services.BuildServiceProvider().GetService<IConfiguration>();

            var authority = $"{configuration[ConfigKey.AzureAd.Instance.Path]}/{configuration[ConfigKey.AzureAd.TenantId.Path]}";

            // TODO add jwt bearer as well

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
            }).AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options =>
            {
                options.Authority = authority;
                options.ClientId = configuration[ConfigKey.AzureAd.ClientId.Path];
                options.ClientSecret = configuration[ConfigKey.Authentication.AzureAdClientSecret.Path];
                options.CallbackPath = configuration[ConfigKey.AzureAd.CallbackPath.Path];
                options.ResponseType = OpenIdConnectResponseType.CodeIdToken;
                options.Events.OnAuthorizationCodeReceived = HandleAuthorizationCodeReceived;
                options.Events.OnRedirectToIdentityProvider = HandleRedirectToIdentityProvider;
                options.SaveTokens = true;
            }).AddCookie();

            return services;
        }

        private static Task HandleRedirectToIdentityProvider(RedirectContext context)
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

        private static async Task HandleAuthorizationCodeReceived(AuthorizationCodeReceivedContext context)
        {
            var authContext = new AuthenticationContext(context.Options.Authority, false);

            var redirectUri = new Uri(context.TokenEndpointRequest.RedirectUri, UriKind.RelativeOrAbsolute);
            var clientCredential = new ClientCredential(context.Options.ClientId, context.Options.ClientSecret);

            var result = await authContext.AcquireTokenByAuthorizationCodeAsync(context.TokenEndpointRequest.Code, redirectUri, clientCredential);

            // Notify the OIDC middleware that we already took care of code redemption.
            context.HandleCodeRedemption(result.AccessToken, result.IdToken);
        }

        public static IServiceCollection AddDefaultSwagger(this IServiceCollection services, string title)
        {
            services.AddSwaggerGen(c => c.SwaggerDoc("v1", new Swashbuckle.AspNetCore.Swagger.Info
            {
                Title = title,
            }));

            return services;
        }

        public static IServiceCollection AddMicroserviceDiscovery(this IServiceCollection services)
        {
            var env = services.BuildServiceProvider().GetService<IHostingEnvironment>();

            var endpointConfig = new EndpointConfig();

            if (env.IsDevelopment())
            {
                endpointConfig.Spa = "https://localhost:44300";
                endpointConfig.Blog = "https://localhost:44322";
                endpointConfig.Users = "https://localhost:44311";
                endpointConfig.Arduino = "https://localhost:44333";
            }
            else
            {
                endpointConfig.Spa = "https://urge-app.azurewebsites.net";
                endpointConfig.Blog = "https://urge-s-blog.azurewebsites.net";
                endpointConfig.Users = "https://urge-s-users.azurewebsites.net";
                endpointConfig.Arduino = "https://urge-s-arduino.azurewebsites.net";
            }

            services.AddSingleton(endpointConfig);

            return services;
        }
    }
}
