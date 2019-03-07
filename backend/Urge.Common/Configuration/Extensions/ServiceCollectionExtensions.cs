using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Text;
using Urge.Common.ServiceDiscovery;

namespace Urge.Common.Configuration
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCommonMicroserviceConfiguration(this IServiceCollection services)
        {
            services.AddCommonMicroserviceAuthentication();
            services.AddMicroserviceDiscovery();
            services.AddCommonCorsPolicy();

            return services;
        }

        private static IServiceCollection AddCommonCorsPolicy(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(CorsPolicy.ALLOW_ALL, policy => { policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader(); });
            });

            return services;
        }

        private static IServiceCollection AddCommonMicroserviceAuthentication(this IServiceCollection services)
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
            });

            return services;
        }

        public static IServiceCollection AddCommonSwagger(this IServiceCollection services, string title)
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
                endpointConfig.Spa = "https://urge.azurewebsites.net";
                endpointConfig.Blog = "https://urge-blog.azurewebsites.net";
                endpointConfig.Users = "https://urge-users.azurewebsites.net";
            }

            services.AddSingleton(endpointConfig);

            return services;
        }
    }
}
