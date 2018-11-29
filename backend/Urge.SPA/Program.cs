using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Urge.SPA
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args)
                .ConfigureAppConfiguration(ConfigureConfiguration)
                .Build()
                .Run();
        }

        private static void ConfigureConfiguration(WebHostBuilderContext context, IConfigurationBuilder builder)
        {
            builder.AddJsonFile("azurekeyvault.json");

            var configuration = builder.Build();

            builder.AddAzureKeyVault(
                configuration["azureKeyVault:vault"],
                configuration["azureKeyVault:clientId"],
                configuration["azureKeyVault:clientSecret"]);

            configuration = builder.Build();

            var facebookAppId = configuration["facebook-appid"];
            var facebookAppSecret = configuration["facebook-appsecret"];
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
