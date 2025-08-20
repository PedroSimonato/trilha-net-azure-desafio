using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace trilha_net_azure_desafio.Migrations
{
    public partial class ChavePrimariaFuncionarioLog : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "FuncionarioLogs",
                columns: table => new
                {
                    LogId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FuncionarioId = table.Column<int>(type: "int", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Endereco = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Ramal = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailProfissional = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Departamento = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Salario = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DataAdmissao = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    TipoAcao = table.Column<int>(type: "int", nullable: false),
                    JSON = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DataLog = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FuncionarioLogs", x => x.LogId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FuncionarioLogs");

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
    }
}
