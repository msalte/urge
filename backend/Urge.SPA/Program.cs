using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Urge.Common.Configuration;

namespace Urge.SPA
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args)
                .Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration(ConfigureApp)
                .UseStartup<Startup>();

        private static void ConfigureApp(WebHostBuilderContext context, IConfigurationBuilder builder)
        {
            builder.AddUrgeKeyVault();
        }
    }
}
