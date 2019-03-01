using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Urge.Blog.Storage
{
    public class DatabaseNames
    {
        public static Dictionary<string, string[]> All => new Dictionary<string, string[]>
        {
             { Blog.Db, new[] { Blog.Articles } }
        };

        public static class Blog
        {
            public static string Db => "blog";
            public static string Articles => "articles";

        }
    }
}
