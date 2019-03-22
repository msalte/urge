using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Urge.Common.Configuration
{
    public class CommonWebHostBuilder
    {
        public static IWebHostBuilder BuildWebHost<TStartup>(string[] args) where TStartup : class
        {
            return WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration(ConfigureApp)
                .UseStartup<TStartup>()
                .UseApplicationInsights();
        }

        private static void ConfigureApp(WebHostBuilderContext context, IConfigurationBuilder builder)
        {
            builder.AddAppSecrets(context.HostingEnvironment);
        }
    }
}
