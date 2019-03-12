using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Urge.Users.Database.Migrations
{
    public partial class AddedLastLogontimestamponuserentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LastLogonUtc",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastLogonUtc",
                table: "Users");
        }
    }
}
