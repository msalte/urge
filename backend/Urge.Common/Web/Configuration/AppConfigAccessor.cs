using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Urge.Common.Web
{
    public class AppConfigAccessor : IConfigurationAccessor
    {
        private readonly IConfiguration _configuration;

        public AppConfigAccessor(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string Get(ConfigKey key)
        {
            return _configuration[key.Path];
        }
    }
}
