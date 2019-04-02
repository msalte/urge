using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Urge.Common.Database;

namespace Urge.Common.Web
{
    public interface ITokenCacheFactory
    {
        Task<TokenCache> CreateTokenCacheForUser(string userId);
    }

    public class TokenCacheFactory : ITokenCacheFactory
    {
        private readonly ConcurrentDictionary<string, UserTokenCache> _cache;
        private readonly IDataProtector _dataProtector;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public TokenCacheFactory(IDataProtectionProvider protectionProvider, IHttpContextAccessor httpContextAccessor, IServiceScopeFactory serviceScopeFactory)
        {
            _cache = new ConcurrentDictionary<string, UserTokenCache>();
            _dataProtector = protectionProvider.CreateProtector(nameof(TokenCacheFactory));
            _httpContextAccessor = httpContextAccessor;
            _serviceScopeFactory = serviceScopeFactory;
        }

        public Task<TokenCache> CreateTokenCacheForUser(string userId)
        {
            var cache = CreateUserTokenCache(userId);

            return Task.FromResult<TokenCache>(cache);
        }

        private UserTokenCache CreateUserTokenCache(string userId)
        {
            if (_cache.TryGetValue(userId, out UserTokenCache existingCache))
            {
                return existingCache;
            }

            using (var scope = _serviceScopeFactory.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<TokensContext>();

                var cachedUser = db.Tokens
                    .Where(u => u.UserId == userId)
                    .AsNoTracking()
                    .FirstOrDefault();

                var newCache = cachedUser == null ? new UserTokenCache { UserId = userId } : GetCacheFromCachedUser(userId, cachedUser);

                // attach events
                newCache.BeforeAccess = BeforeAccess;
                newCache.AfterAccess = AfterAccess;

                // update cache of caches
                _cache.AddOrUpdate(userId, newCache, (i, existing) => newCache);

                return newCache;
            }
        }

        private UserTokenCache GetCacheFromCachedUser(string userId, CachedUserToken cachedUser)
        {
            try
            {
                var unprotected = _dataProtector.Unprotect(cachedUser.CacheBits);
                return new UserTokenCache(unprotected)
                {
                    UserId = userId,
                    CachedUserToken = cachedUser
                };
            }
            catch (Exception)
            {
                return new UserTokenCache
                {
                    UserId = userId
                };
            }
        }

        private void BeforeAccess(TokenCacheNotificationArgs args)
        {
            var userTokenCache = args.TokenCache as UserTokenCache;

            if (userTokenCache == null)
            {
                return;
            }

            var userId = userTokenCache.UserId;

            using (var scope = _serviceScopeFactory.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<TokensContext>();

                var cachedToken = userTokenCache.CachedUserToken;

                var lastWrite = db.Tokens
                    .Where(t => t.UserId == userId)
                    .Select(e => e.LastWrite)
                    .FirstOrDefault();

                var refreshTokenFromDb = false;

                if (cachedToken != null && lastWrite != null)
                {
                    // we found a cached token but also found a last write item from our persistant db
                    if (lastWrite > cachedToken.LastWrite)
                    {
                        // if last write time from db is newer than on our cached token, refresh token from db
                        refreshTokenFromDb = true;
                    }
                }
                else if (cachedToken == null && lastWrite != null)
                {
                    // we did not find a cached token but we found a last write time in our db
                    refreshTokenFromDb = true;
                }

                if (refreshTokenFromDb)
                {
                    var dbToken = db.Tokens
                        .Where(t => t.UserId == userId)
                        .AsNoTracking()
                        .FirstOrDefault();

                    try
                    {

                        var unprotectedCacheBits = _dataProtector.Unprotect(dbToken.CacheBits);
                        args.TokenCache.Deserialize(unprotectedCacheBits);
                    }
                    catch (Exception)
                    {
                        // TODO: log 
                    }
                }
            }
        }

        private void AfterAccess(TokenCacheNotificationArgs args)
        {
            var userTokenCache = args.TokenCache as UserTokenCache;

            if (userTokenCache == null)
            {
                return;
            }

            var userId = userTokenCache.UserId;

            if (!args.TokenCache.HasStateChanged)
            {
                return;
            }

            using (var scope = _serviceScopeFactory.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<TokensContext>();

                var dbToken = db.Tokens.FirstOrDefault(t => t.UserId == userId);

                if (dbToken == null)
                {
                    // we did not have a token for this user in our db
                    dbToken = new CachedUserToken { UserId = userId };
                    db.Tokens.Add(dbToken);
                }

                dbToken.CacheBits = _dataProtector.Protect(args.TokenCache.Serialize());
                dbToken.LastWrite = DateTime.UtcNow;

                db.SaveChanges();

                userTokenCache.CachedUserToken = dbToken;
            }

            args.TokenCache.HasStateChanged = false;
        }
    }
}
