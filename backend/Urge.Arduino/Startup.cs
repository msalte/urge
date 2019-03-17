using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Urge.Arduino.Repository;
using Urge.Arduino.Storage;
using Urge.Common.Configuration;

namespace Urge.Arduino
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDefaultMicroserviceServices();
            services.AddScoped<IBlobStorageClient, BlobStorageClient>();
            services.AddScoped<ISensorDataRepository, SensorDataRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(CorsPolicy.ALLOW_ALL);
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
