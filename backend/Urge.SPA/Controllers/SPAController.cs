using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Urge.SPA.Controllers
{
    //[Authorize]
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
