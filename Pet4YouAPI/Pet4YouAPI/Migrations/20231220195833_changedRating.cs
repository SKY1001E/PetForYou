﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pet4YouAPI.Migrations
{
    /// <inheritdoc />
    public partial class changedRating : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "Ratings",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comment",
                table: "Ratings");
        }
    }
}
