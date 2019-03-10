using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Urge.Blog.Models;

namespace Urge.Blog.ViewModels
{
    public class ApiArticle
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }
        public DateTime WrittenUtc { get; set; }
        public DateTime UpdatedUtc { get; set; }

        public ApiArticle(Article article)
        {
            Id = article.Id;
            Title = article.Title;
            Content = article.Content;
            Author = article.Author;
            WrittenUtc = article.WrittenUtc;
            UpdatedUtc = article.UpdatedUtc;
        }
    }
}
