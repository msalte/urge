using System;
using System.Collections.Generic;
using System.Text;

namespace Urge.Common.ServiceDiscovery
{
    public class ServiceEndpoint
    {
        public string Key { get; set; }

        public ServiceEndpoint(string key)
        {
            Key = key;
        }

        public static ServiceEndpoint Users = new ServiceEndpoint("users");
        public static ServiceEndpoint Blog = new ServiceEndpoint("blog");
        public static ServiceEndpoint Spa = new ServiceEndpoint("spa");

        public static List<ServiceEndpoint> All => new List<ServiceEndpoint>() { Users, Blog, Spa };
    }
}
