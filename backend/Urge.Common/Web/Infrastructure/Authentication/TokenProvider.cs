using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System.Threading.Tasks;

namespace Urge.Common.Web
{
    public interface ITokenProvider
    {
        Task<string> GetAccessTokenForCurrentUserAsync();
    }

    public class TokenProvider : ITokenProvider
    {
        private readonly IConfigurationAccessor _configAccessor;
        private readonly ITokenCacheFactory _tokenCacheFactory;
        private readonly IUserAccessor _userAccessor;

        private readonly string _tokenAuthority;
        private readonly string _clientId;
        private readonly string _clientSecret;

        public TokenProvider(IConfigurationAccessor configAccessor, ITokenCacheFactory tokenCacheFactory, IUserAccessor userAccessor)
        {
            _configAccessor = configAccessor;
            _tokenCacheFactory = tokenCacheFactory;
            _userAccessor = userAccessor;

            _tokenAuthority = $"{_configAccessor.Get(ConfigKey.AzureAd.Instance)}/{_configAccessor.Get(ConfigKey.AzureAd.TenantId)}";
            _clientId = _configAccessor.Get(ConfigKey.AzureAd.ClientId);
            _clientSecret = _configAccessor.Get(ConfigKey.Authentication.AzureAdClientSecret);
        }

        public async Task<string> GetAccessTokenForCurrentUserAsync()
        {
            var userId = _userAccessor.ClaimsProfile.AadUniqueId.ToString();
            var userTokenCache = await _tokenCacheFactory.CreateTokenCacheForUser(userId);

            var authContext = new AuthenticationContext(_tokenAuthority, userTokenCache);
            var clientCredential = new ClientCredential(_clientId, _clientSecret);
            var result = await authContext.AcquireTokenSilentAsync(_clientId, clientCredential, new UserIdentifier(userId, UserIdentifierType.UniqueId));

            return result.AccessToken;
        }
    }
}
