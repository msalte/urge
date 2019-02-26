using Microsoft.Azure.KeyVault;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.AzureKeyVault;
using System;
using System.Collections.Generic;
using System.Text;

namespace Urge.Common.Configuration
{
    public static class ConfigurationExtensions
    {
        private const string KEY_VAULT_NAME = "https://urge-keyvault.vault.azure.net";

        public static IConfigurationBuilder AddUrgeKeyVault(this IConfigurationBuilder builder)
        {
            var serviceTokenProvider = new AzureServiceTokenProvider();
            var keyVaultClient = new KeyVaultClient(new KeyVaultClient.AuthenticationCallback(serviceTokenProvider.KeyVaultTokenCallback));

            builder.AddAzureKeyVault(KEY_VAULT_NAME, keyVaultClient, new DefaultKeyVaultSecretManager());

            return builder;
        }
    }
}
