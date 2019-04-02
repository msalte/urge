using System;
using System.Collections.Generic;
using System.Text;

namespace Urge
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
            public static ConfigKey TokensContext = new ConfigKey("ConnectionStrings:TokensContext");
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
            public static ConfigKey AzureAdClientSecret = new ConfigKey("Authentication:AzureAdClientSecret");
        }

        public static class AzureAd
        {
            public static ConfigKey Instance = new ConfigKey("AzureAd:Instance");
            public static ConfigKey Domain = new ConfigKey("AzureAd:Domain");
            public static ConfigKey TenantId = new ConfigKey("AzureAd:TenantId");
            public static ConfigKey ClientId = new ConfigKey("AzureAd:ClientId");
            public static ConfigKey CallbackPath = new ConfigKey("AzureAd:CallbackPath");
            public static ConfigKey SignedOutCallbackPath = new ConfigKey("AzureAd:SignedOutCallbackPath");
        }

        public static class ApplicationInsights
        {
            public static ConfigKey InstrumentationKey = new ConfigKey("ApplicationInsights:InstrumentationKey");
        }
    }
}

