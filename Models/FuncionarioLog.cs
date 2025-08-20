using System.Text.Json;
using Azure;
using Azure.Data.Tables;

namespace TrilhaNetAzureDesafio.Models
{
    public class FuncionarioLog
    {
    [System.ComponentModel.DataAnnotations.Key]
    public int LogId { get; set; } // Chave primária
        public int FuncionarioId { get; set; }
    public string Nome { get; set; }
    public string Endereco { get; set; }
    public string Ramal { get; set; }
    public string EmailProfissional { get; set; }
    public string Departamento { get; set; }
    public decimal Salario { get; set; }
    public DateTimeOffset? DataAdmissao { get; set; }
        public TipoAcao TipoAcao { get; set; }
        public string JSON { get; set; }
        public DateTime DataLog { get; set; } = DateTime.Now;

        public FuncionarioLog() { }

        public FuncionarioLog(Funcionario funcionario, TipoAcao tipoAcao)
        {
            FuncionarioId = funcionario.Id;
            Nome = funcionario.Nome;
            Endereco = funcionario.Endereco;
            Ramal = funcionario.Ramal;
            EmailProfissional = funcionario.EmailProfissional;
            Departamento = funcionario.Departamento;
            Salario = funcionario.Salario;
            DataAdmissao = funcionario.DataAdmissao;
            TipoAcao = tipoAcao;
            JSON = JsonSerializer.Serialize(funcionario);
        }
    }
}