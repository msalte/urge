using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Text;

namespace Urge.Common.Database
{
    public class DesignTimeTokensContextFactory : IDesignTimeDbContextFactory<TokensContext>
    {
        public TokensContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<TokensContext>();
            optionsBuilder.UseSqlServer("Server=idontexist;Database=neitherdoi;Trusted_Connection=True;");
            return new TokensContext(optionsBuilder.Options);
        }
    }
}
