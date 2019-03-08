using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Urge.Blog.ViewModels
{
    public class CreateArticleRequest
    {
        public string Title { get; set; }
        public string Content { get; set; }
    }
}
