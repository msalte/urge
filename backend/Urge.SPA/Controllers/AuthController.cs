using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Urge.Common.Web;

namespace Urge.SPA.Controllers
{
    [Route("auth")]
    public class AuthController : Controller
    {
        private readonly ITokenProvider _tokenProvider;

        public AuthController(ITokenProvider tokenProvider)
        {
            _tokenProvider = tokenProvider;
        }

        [HttpGet("login")]
        public IActionResult Login()
        {
            return Redirect("/");
        }

        [AllowAnonymous]
        [HttpGet("signin-implicit")]
        public IActionResult SigninImplicit()
        {
            return View();
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken()
        {
            var token = await _tokenProvider.GetAccessTokenForCurrentUserAsync();

            return Ok(token);
        }
    }
}
