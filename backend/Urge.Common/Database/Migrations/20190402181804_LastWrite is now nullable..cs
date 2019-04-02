using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Urge.Common.Database.Migrations
{
    public partial class LastWriteisnownullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "LastWrite",
                table: "Tokens",
                nullable: true,
                oldClrType: typeof(DateTime));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "LastWrite",
                table: "Tokens",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);
        }
    }
}
