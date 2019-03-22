using Microsoft.AspNetCore.Hosting;
using Microsoft.Azure.KeyVault.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.AzureKeyVault;

namespace Urge.Common.Security
{
    public class PrefixKeyVaultSecretManager : IKeyVaultSecretManager
    {
        private readonly bool _isDevelopmentEnvironment;

        private const string AZURE_PREFIX = "Azure--";

        public PrefixKeyVaultSecretManager(IHostingEnvironment env)
        {
            _isDevelopmentEnvironment = env.IsDevelopment();
        }

        public string GetKey(SecretBundle secret)
        {
            var value = secret.SecretIdentifier.Name;

            if (value.StartsWith(AZURE_PREFIX))
            {
                value = value.Substring(AZURE_PREFIX.Length);
            }

            return value.Replace("--", ConfigurationPath.KeyDelimiter);

        }

        public bool Load(SecretItem secret)
        {
            if (_isDevelopmentEnvironment)
            {
                // In dev env, only load secrets that doesn't start with "Azure".
                return !secret.Identifier.Name.StartsWith(AZURE_PREFIX);
            }

            return true;
        }
    }
}
