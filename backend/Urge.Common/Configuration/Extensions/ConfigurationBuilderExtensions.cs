using Microsoft.AspNetCore.Hosting;
using Microsoft.Azure.KeyVault;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Urge.Common.Configuration
{
    public static class ConfigurationBuilderExtensions
    {
        private const string KEY_VAULT_NAME = "https://urge-kv.vault.azure.net";

        public static IConfigurationBuilder AddAppSecrets(this IConfigurationBuilder builder, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                return AddDevAppSettings(builder, env);
            }

            var serviceTokenProvider = new AzureServiceTokenProvider();
            var keyVaultClient = new KeyVaultClient(new KeyVaultClient.AuthenticationCallback(serviceTokenProvider.KeyVaultTokenCallback));

            builder.AddAzureKeyVault(KEY_VAULT_NAME, keyVaultClient, new PrefixKeyVaultSecretManager(env));

            return builder;
        }

        public static IConfigurationBuilder AddGlobalAppSettings(this IConfigurationBuilder builder, IHostingEnvironment env)
        {
            var jsonFile = Path.Combine(env.ContentRootPath, "..\\Global\\appsettings.json");

            builder.AddJsonFile(jsonFile, false);

            return builder;
        }

        private static IConfigurationBuilder AddDevAppSettings(this IConfigurationBuilder builder, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                var jsonFile = Path.Combine(env.ContentRootPath, $"..\\Development\\appsettings.{Environment.MachineName}.json");
                builder.AddJsonFile(jsonFile, true);
            }

            return builder;
        }
    }
}
