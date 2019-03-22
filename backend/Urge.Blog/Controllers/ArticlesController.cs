using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Urge.Blog.Models;
using Urge.Blog.Services;
using Urge.Blog.ViewModels;
using Urge.Common.Web.User;

namespace Urge.Blog.Controllers
{
    public partial class ArticlesController : Controller
    {
        private readonly IArticlesService _articlesService;
        private readonly IUserAccessor _userAccessor;

        public ArticlesController(IArticlesService articlesService, IUserAccessor userAccessor)
        {
            _articlesService = articlesService;
            _userAccessor = userAccessor;
        }

        [HttpPost("articles")]
        public async Task<IActionResult> CreateArticle([FromBody] CreateArticleRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Could not create article. Input model state was invalid.");
            }

            var article = new Article
            {
                Title = request.Title,
                Content = request.Content,
                Author = _userAccessor.ClaimsProfile.Email,
            };

            var created = await _articlesService.CreateArticleAsync(article);

            return Created("articles", new ApiArticle(created));

        }

        [AllowAnonymous]
        [HttpGet("articles")]
        public async Task<IEnumerable<ApiArticle>> GetArticles()
        {
            var articles = await _articlesService.GetAllArticles();

            return articles.Select(a => new ApiArticle(a));
        }
    }
}
