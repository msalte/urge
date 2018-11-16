using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
