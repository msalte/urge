using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Urge.Blog.Models;
using Urge.Blog.Services;

namespace Urge.Blog.Controllers
{
    public partial class ArticlesController : Controller
    {
        private readonly IArticlesService _articlesService;

        public ArticlesController(IArticlesService articlesService)
        {
            _articlesService = articlesService;
        }

        [Authorize]
        [HttpPost("articles")]
        public async Task<IActionResult> CreateDocument([FromBody] Article article)
        {
            var created = await _articlesService.CreateArticleAsync(article);

            return Created("articles", created);
        }

        [HttpGet("articles")]
        public async Task<IEnumerable<Article>> GetArticles()
        {
            return await _articlesService.GetAllArticles();
        }
    }
}
