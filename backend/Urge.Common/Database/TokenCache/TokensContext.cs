using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Urge.Common.Database
{
    public class TokensContext : DbContext
    {
        public TokensContext(DbContextOptions<TokensContext> options) : base(options)
        {
            // Pass context options to base class. (Use SQL server options)
        }

        public DbSet<CachedUserToken> Tokens { get; set; }
    }
}
