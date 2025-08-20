using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace trilha_net_azure_desafio.Migrations
{
    public partial class AddFuncionarioLogTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Funcionarios",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "JSON",
                table: "Funcionarios",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PartitionKey",
                table: "Funcionarios",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RowKey",
                table: "Funcionarios",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TipoAcao",
                table: "Funcionarios",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Funcionarios");

            migrationBuilder.DropColumn(
                name: "JSON",
                table: "Funcionarios");

            migrationBuilder.DropColumn(
                name: "PartitionKey",
                table: "Funcionarios");

            migrationBuilder.DropColumn(
                name: "RowKey",
                table: "Funcionarios");

            migrationBuilder.DropColumn(
                name: "TipoAcao",
                table: "Funcionarios");
        }
    }
}
