using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pet4YouAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddIsCompletedAdvertisement : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Completed",
                table: "Advertisements",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Completed",
                table: "Advertisements");
        }
    }
}
