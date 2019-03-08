using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Urge.Blog.Models;
using Urge.Blog.Storage;

namespace Urge.Blog.Repository
{
    public interface IArticlesRepository
    {
        Task<Article> CreateArticleAsync(Article article);
        Task<IEnumerable<Article>> GetAllArticles();
    }

    public class ArticlesRepository : IArticlesRepository
    {
        private readonly IMemoryCache _cache;
        private readonly ICosmosDb _cosmosDb;
        private const string CacheKey = "blog:articles";

        public ArticlesRepository(IMemoryCache cache, ICosmosDb cosmosDb)
        {
            _cache = cache;
            _cosmosDb = cosmosDb;
        }

        public async Task<Article> CreateArticleAsync(Article article)
        {
            _cache.Remove(CacheKey); // invalidate cache when new articles are created

            return await _cosmosDb.CreateDocumentAsync(DatabaseNames.Blog.Db, DatabaseNames.Blog.Articles, article);
        }

        public async Task<IEnumerable<Article>> GetAllArticles()
        {
            return await GetOrCreateAsync(CacheKey, () =>
            {
                return _cosmosDb.GetAllDocuments<Article>(DatabaseNames.Blog.Db, DatabaseNames.Blog.Articles);
            });
        }

        private async Task<T> GetOrCreateAsync<T>(string cacheKey, Func<Task<T>> factory)
        {
            var value = await _cache.GetOrCreateAsync(cacheKey, entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(2);

                return factory();
            });

            return value;
        }
    }
}
