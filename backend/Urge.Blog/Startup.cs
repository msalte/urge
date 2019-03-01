using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Azure.Documents.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using Urge.Blog.Repository;
using Urge.Blog.Services;
using Urge.Blog.Storage;
using Urge.Common.Configuration;

namespace Urge.Blog
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.AddSingleton<ICosmosDb, CosmosDb>();
            services.AddSingleton<IArticlesRepository, ArticlesRepository>();
            services.AddSingleton<IArticlesService, ArticlesService>();

            services.AddSingleton(p =>
            {
                var client = new DocumentClient(new Uri(Configuration[ConfigKey.CosmosDB.Endpoint.Path]), Configuration[ConfigKey.CosmosDB.PrimaryKey.Path]);

                // TODO: ensure database and collection created if not existing

                // Open the connection to validate that the client initialization 
                // is successful in the Azure Cosmos DB service.
                client.OpenAsync().Wait();
                return client;
            });

            services.AddCommonMicroserviceAuthentication();
            services.AddMicroserviceDiscovery();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
