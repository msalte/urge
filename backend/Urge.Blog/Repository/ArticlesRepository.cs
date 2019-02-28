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
        private const string DATABASE_NAME = "blog";
        private const string COLLECTION_NAME = "articles";

        private readonly ICosmosDb _cosmosDb;

        public ArticlesRepository(ICosmosDb cosmosDb)
        {
            _cosmosDb = cosmosDb;
        }

        public async Task<Article> CreateArticleAsync(Article article)
        {
            return await _cosmosDb.CreateDocumentAsync(DATABASE_NAME, COLLECTION_NAME, article);
        }

        public async Task<IEnumerable<Article>> GetAllArticles()
        {
            return await _cosmosDb.GetAllDocuments<Article>(DATABASE_NAME, COLLECTION_NAME);
        }
    }
}
