using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Text;

namespace Urge.Common.Web
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseCommonSwagger(this IApplicationBuilder app, string name)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", name));

            return app;
        }
    }
}
