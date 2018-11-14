using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace urge.web.Controllers
{
    public class SpaController : Controller
    {
        [HttpGet("/")]
        [HttpGet("/{*anything}")]
        public IActionResult Index()
        {
            return View();
        }
    }
}