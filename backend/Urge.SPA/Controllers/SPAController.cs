using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Urge.Common.ServiceDiscovery;

namespace Urge.SPA.Controllers
{
    public class SPAController : Controller
    {
        private readonly EndpointConfig _endpointConfig;

        public SPAController(EndpointConfig endpointConfig)
        {
            _endpointConfig = endpointConfig;
        }

        [AllowAnonymous]
        [HttpGet("/")]
        [HttpGet("/{*anything}")]
        public IActionResult Index()
        {
            ViewData["config"] = JsonConvert.SerializeObject(_endpointConfig);
            return View();
        }
    }
}
