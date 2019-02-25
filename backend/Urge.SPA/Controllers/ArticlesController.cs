using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Urge.SPA.Storage.Documents;

namespace Urge.SPA.Controllers
{
    public class ArticlesController : Controller
    {
        private readonly ICosmosDb _cosmosDb;
        private const string DATABASE_NAME = "myDatabase";
        private const string COLLECTION_NAME = "myCollection";

        public ArticlesController(ICosmosDb cosmosDb)
        {
            _cosmosDb = cosmosDb;
        }

        [HttpPost("articles")]
        public async Task<IActionResult> CreateDocument([FromBody] Article article)
        {
            var id = await _cosmosDb.CreateDocumentAsync(DATABASE_NAME, COLLECTION_NAME, article);

            return Ok(id);
        }

        [HttpGet("articles")]
        public async Task<IEnumerable<Article>> GetArticles()
        {
            return await _cosmosDb.GetDocuments<Article>(DATABASE_NAME, COLLECTION_NAME);
        }

        public class Article
        {
            public string Id { get; set; }
            public string Title { get; set; }
            public string Content { get; set; }
        }
    }
}
