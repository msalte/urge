using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Urge.Common.Configuration
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddUrgeAuthentication(this IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    var clientId = "38a586c6-6141-46b2-be9e-75844c089c12"; // "Application ID of Azure AD app"
                    var tenantId = "c317fa72-b393-44ea-a87c-ea272e8d963d"; // Azure Tenant ID

                    options.Authority = $"https://login.microsoftonline.com/{tenantId}";
                    options.Audience = clientId;
                    options.SaveToken = true;
                });

            return services;
        }
    }
}
