using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class RemoveRequiredUserId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskItems_Users_CreatedByUserId",
                table: "TaskItems");

            migrationBuilder.DropIndex(
                name: "IX_TaskItems_CreatedByUserId",
                table: "TaskItems");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_TaskItems_CreatedByUserId",
                table: "TaskItems",
                column: "CreatedByUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskItems_Users_CreatedByUserId",
                table: "TaskItems",
                column: "CreatedByUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
