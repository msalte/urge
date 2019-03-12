using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Urge.Users.Database
{
    public class DesignTimeUsersContext : IDesignTimeDbContextFactory<UsersContext>
    {
        public UsersContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<UsersContext>();
            optionsBuilder.UseSqlServer("Server=idontexist;Database=neitherdoi;Trusted_Connection=True;");
            return new UsersContext(optionsBuilder.Options);

        }
    }
}
