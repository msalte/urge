using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Urge.Blog.ViewModels
{
    public class CreateArticleRequest
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
    }
}
