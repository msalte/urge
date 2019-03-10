using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Urge.Users.Models;

namespace Urge.Users.Database
{
    public class UsersContext : DbContext
    {
        public UsersContext(DbContextOptions<UsersContext> options) : base(options)
        {
            // Pass context options to base class. (Use SQL server options)
        }

        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            User.OnModelCreating(modelBuilder);
            RefreshToken.OnModelCreating(modelBuilder);
        }
    }
}
