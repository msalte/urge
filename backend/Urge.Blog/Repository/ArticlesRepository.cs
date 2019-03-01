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
        private readonly ICosmosDb _cosmosDb;

        public ArticlesRepository(ICosmosDb cosmosDb)
        {
            _cosmosDb = cosmosDb;
        }

        public async Task<Article> CreateArticleAsync(Article article)
        {
            return await _cosmosDb.CreateDocumentAsync(DatabaseNames.Blog.Db, DatabaseNames.Blog.Articles, article);
        }

        public async Task<IEnumerable<Article>> GetAllArticles()
        {
            return await _cosmosDb.GetAllDocuments<Article>(DatabaseNames.Blog.Db, DatabaseNames.Blog.Articles);
        }
    }
}
