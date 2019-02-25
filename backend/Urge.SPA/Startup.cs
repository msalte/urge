using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Urge.SPA.Storage.Documents;

namespace Urge.SPA
{
    public class Startup
    {
        private readonly IHostingEnvironment _environment;

        public Startup(IHostingEnvironment environment)
        {
            _environment = environment;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(_environment.ContentRootPath)
                .AddJsonFile("azurekeyvault.json");

            var configuration = builder.Build();

            builder.AddAzureKeyVault(
                configuration["azureKeyVault:vault"],
                configuration["azureKeyVault:clientId"],
                configuration["azureKeyVault:clientSecret"]);

            configuration = builder.Build();

            services.AddMvc();
            services.AddSingleton<ICosmosDb, CosmosDb>();

            services.AddSingleton<IConfiguration>(configuration); // needed to access key vault through DI of IConfiguration
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseAuthentication();

            app.UseStaticFiles();
            app.UseMvc();
        }
    }
}
