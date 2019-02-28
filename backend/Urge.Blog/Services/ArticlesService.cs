using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Urge.Blog.Models;
using Urge.Blog.Repository;

namespace Urge.Blog.Services
{
    public interface IArticlesService
    {
        Task<Article> CreateArticleAsync(Article article);
        Task<IEnumerable<Article>> GetAllArticles();
    }

    public class ArticlesService : IArticlesService
    {
        // TODO:
        // Resolve the user who is posting articles
        // Pass user id to articles repository

        private readonly IArticlesRepository _repository;

        public ArticlesService(IArticlesRepository repository)
        {
            _repository = repository;
        }

        public async Task<Article> CreateArticleAsync(Article article)
        {
            return await _repository.CreateArticleAsync(article);
        }

        public async Task<IEnumerable<Article>> GetAllArticles()
        {
            return await _repository.GetAllArticles();
        }
    }
}
