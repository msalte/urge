using Microsoft.AspNetCore.Hosting;
using Microsoft.Azure.KeyVault.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.AzureKeyVault;

namespace Urge.Common.Configuration
{
    public class PrefixKeyVaultSecretManager : IKeyVaultSecretManager
    {
        private readonly bool _isDevelopmentEnvironment;

        public PrefixKeyVaultSecretManager(IHostingEnvironment env)
        {
            _isDevelopmentEnvironment = env.IsDevelopment();
        }

        public string GetKey(SecretBundle secret)
        {
            return secret.SecretIdentifier.Name.Replace("--", ConfigurationPath.KeyDelimiter);

        }

        public bool Load(SecretItem secret)
        {
            if (_isDevelopmentEnvironment)
            {
                // In dev env, only load secrets that doesn't start with "Azure".
                return !secret.Identifier.Name.StartsWith("Azure");
            }

            return true;
        }
    }
}
