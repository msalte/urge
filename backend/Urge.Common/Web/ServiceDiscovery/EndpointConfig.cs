using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Urge.Common.Web
{
    public class EndpointConfig : Dictionary<string, string>
    {
        public EndpointConfig()
        {
            InitializeKeys();
        }

        private void InitializeKeys()
        {
            ServiceEndpoint.All.ForEach(endpoint => this[endpoint.Key] = "");
        }

        public string this[ServiceEndpoint service]
        {
            get => this[service.Key];
            set => this[service.Key] = value;
        }

        [JsonIgnore]
        public string Spa { get => this[ServiceEndpoint.Spa]; set => this[ServiceEndpoint.Spa] = value; }
        [JsonIgnore]
        public string Users { get => this[ServiceEndpoint.Users]; set => this[ServiceEndpoint.Users] = value; }
        [JsonIgnore]
        public string Blog { get => this[ServiceEndpoint.Blog]; set => this[ServiceEndpoint.Blog] = value; }
        [JsonIgnore]
        public string Arduino { get => this[ServiceEndpoint.Arduino]; set => this[ServiceEndpoint.Arduino] = value; }
    }
}
