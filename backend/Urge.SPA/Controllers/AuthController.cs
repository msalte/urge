﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Urge.SPA.Controllers
{
    public class AuthController : Controller
    {
        [AllowAnonymous]
        [HttpGet("/auth/signin-implicit")]
        public IActionResult SigninImplicit()
        {
            return View();
        }

        [AllowAnonymous]
        [HttpPost("/auth/signin-oidc")]
        public IActionResult Signin([FromForm] IFormCollection form)
        {
            // validate token
            // if invalid, redirect to error page
            foreach (var element in form)
            {
                if (element.Key == "id_token")
                {
                    var token = element.Value;
                }
            }

            return RedirectToAction("Index", "SPA", null, null);
        }
    }
}