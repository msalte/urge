using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Urge.Common.ServiceDiscovery;
using Urge.Common.User;

namespace Urge.Common.Configuration
{
    public static class ServiceCollectionExtensions
    {
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
                        .AllowAnyHeader()
                        .WithExposedHeaders("Token-Expired");
                });
            });

            return services;
        }

        private static IServiceCollection AddDefaultMicroserviceAuthentication(this IServiceCollection services)
        {
            var configuration = services.BuildServiceProvider().GetService<IConfiguration>();
            var key = Encoding.UTF8.GetBytes(configuration[ConfigKey.Authentication.JWTSymmetricKey.Path]);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
                options.Events = new JwtBearerEvents()
                {
                    OnAuthenticationFailed = context =>
                    {
                        if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                        {
                            context.Response.Headers.Add("Token-Expired", "true");
                        }

                        return Task.CompletedTask;
                    }
                };
            });

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
            }
            else
            {
                endpointConfig.Spa = "https://urge-app.azurewebsites.net";
                endpointConfig.Blog = "https://urge-s-blog.azurewebsites.net";
                endpointConfig.Users = "https://urge-s-users.azurewebsites.net";
            }

            services.AddSingleton(endpointConfig);

            return services;
        }
    }
}
