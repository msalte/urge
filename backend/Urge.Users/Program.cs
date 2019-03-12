using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Urge.Common.Configuration;

namespace Urge.Users
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Required to identity EF migration on build server
            EnvUtils.IsProgramExecuted = true;

            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration(ConfigureApp)
                .UseStartup<Startup>();

        private static void ConfigureApp(WebHostBuilderContext context, IConfigurationBuilder builder)
        {
            builder.AddDevAppSettings(context.HostingEnvironment);
            builder.AddCommonMicroserviceKeyVault(context.HostingEnvironment);
        }
    }
}
