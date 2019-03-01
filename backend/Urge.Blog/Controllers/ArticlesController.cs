using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Urge.Blog.Models;
using Urge.Blog.Services;

namespace Urge.Blog.Controllers
{
    [Authorize]
    public partial class ArticlesController : Controller
    {
        private readonly IArticlesService _articlesService;

        public ArticlesController(IArticlesService articlesService)
        {
            _articlesService = articlesService;
        }

        [HttpPost("articles")]
        public async Task<IActionResult> CreateDocument([FromBody] Article article)
        {
            if (ModelState.IsValid)
            {
                var created = await _articlesService.CreateArticleAsync(article);

                return Created("articles", created);
            }

            throw new ArgumentException("Could not create article. Input model state was invalid.");
        }

        [AllowAnonymous]
        [HttpGet("articles")]
        public async Task<IEnumerable<Article>> GetArticles()
        {
            return await _articlesService.GetAllArticles();
        }
    }
}
