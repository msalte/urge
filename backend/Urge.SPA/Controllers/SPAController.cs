using Microsoft.AspNetCore.Mvc;

namespace Urge.SPA.Controllers
{
    public class SPAController : Controller
    {
        [HttpGet("/")]
        [HttpGet("/{*anything}")]
        public IActionResult Index()
        {
            return View();
        }
    }
}
