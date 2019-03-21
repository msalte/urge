using System;
using System.Collections.Generic;
using System.Text;

namespace Urge.Common.Configuration
{
    public class ConfigKey
    {
        public string Path { get; set; }

        public ConfigKey(string path)
        {
            Path = path;
        }

        public static class ConnectionStrings
        {
            public static ConfigKey UsersContext = new ConfigKey("ConnectionStrings:UsersContext");
            public static ConfigKey StorageAccount = new ConfigKey("ConnectionStrings:StorageAccount");
        }

        public static class CosmosDB
        {
            public static ConfigKey Endpoint = new ConfigKey("CosmosDB:Endpoint");
            public static ConfigKey PrimaryKey = new ConfigKey("CosmosDB:PrimaryKey");
        }

        public static class Authentication
        {
            public static ConfigKey JWTSymmetricKey = new ConfigKey("Authentication:JWTSymmetricKey");
        }

        public static class AADB2C
        {
            public static ConfigKey Tenant = new ConfigKey("AADB2C:Tenant");
            public static ConfigKey ClientId = new ConfigKey("AADB2C:ClientId");
            public static ConfigKey Policy = new ConfigKey("AADB2C:Policy");
        }
    }
}
