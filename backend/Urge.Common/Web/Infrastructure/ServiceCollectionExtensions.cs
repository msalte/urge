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
using Urge.Common.Database;

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

            services.AddSqlTokenCache();
            services.AddDefaultMicroserviceAuthentication();
            services.AddMicroserviceDiscovery();
            services.AddDefaultCorsPolicy();

            services.AddHttpContextAccessor();
            services.AddTransient<IUserAccessor, UserAccessor>();
            services.AddSingleton<IConfigurationAccessor, AppConfigAccessor>();

            return services;
        }

        private static IServiceCollection AddSqlTokenCache(this IServiceCollection services)
        {
            var configuration = services.BuildServiceProvider().GetService<IConfiguration>();

            services.AddSqlDbContext<TokensContext>(configuration[ConfigKey.ConnectionStrings.TokensContext.Path]);
            services.AddSingleton<ITokenCacheFactory, TokenCacheFactory>();
            services.AddSingleton<ITokenProvider, TokenProvider>();

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
                options.CallbackPath = "/signin-oidc";
                options.ResponseType = OpenIdConnectResponseType.CodeIdToken;
                options.Events.OnAuthorizationCodeReceived = OpenIdConnectEvents.HandleAuthorizationCodeReceived;
                options.Events.OnRedirectToIdentityProvider = OpenIdConnectEvents.HandleRedirectToIdentityProvider;
                options.SaveTokens = true;
            }).AddCookie();

            return services;
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
