












# DIO - Trilha .NET - Nuvem com Microsoft Azure

## Desafio de projeto

Este projeto consiste em um sistema de RH para cadastro e gestão de funcionários, com registro de logs de todas as operações realizadas.

## Funcionalidades

- CRUD de funcionários (criar, consultar, editar, excluir)
- Registro de logs de todas as operações em funcionários
- Frontend simples em HTML, CSS e JavaScript para facilitar o uso e testes da API

## Como rodar o projeto
### Observação sobre permissões do banco

### Exemplo de string de conexão utilizada

No arquivo `appsettings.Development.json`, utilizei a seguinte string de conexão para o banco local:

```
"ConnectionStrings": {
  "ConexaoPadrao": "Server=(localdb)\\MSSQLLocalDB;Database=DesafioDeProjeto;User Id=root;Password=root;"
}
```

Lembre-se de ajustar o nome do banco, usuário e senha conforme sua configuração local.

Se você estiver usando SQL Server local e seu usuário não for administrador do banco, execute os comandos abaixo para garantir as permissões necessárias:

```
USE DesafioDeProjeto;
CREATE USER root FOR LOGIN root; -- troque pelo seu login real
ALTER ROLE db_owner ADD MEMBER root;
```

Esses comandos garantem que o usuário tenha permissão total para criar e alterar tabelas durante as migrations e uso da aplicação.

1. **Backend (.NET API)**
   - Execute as migrations para criar o banco local:
     ```
     dotnet ef database update
     ```
   - Inicie a API:
     ```
     dotnet run
     ```
   - A API estará disponível em `http://localhost:5234` (ajuste conforme sua configuração).

2. **Frontend**
   - Abra o arquivo `frontend/index.html` em seu navegador.
   - Utilize o formulário para cadastrar, editar, buscar e excluir funcionários.
   - O frontend se comunica diretamente com a API.

## Justificativa: Por que usar banco local para logs?

No desafio original, a proposta era utilizar recursos do Microsoft Azure, como App Service para a API, SQL Database para o banco relacional e Azure Table para armazenar os logs das operações.

No entanto, optei por utilizar o banco local (SQL Server LocalDB) para armazenar tanto os dados dos funcionários quanto os logs, pois não consegui criar uma conta na Azure. Essa decisão foi tomada para garantir que o projeto pudesse ser executado, testado e avaliado sem depender de recursos externos ou de uma conta na nuvem, mantendo toda a solução funcional e acessível localmente.

Dessa forma, o sistema continua atendendo aos requisitos de CRUD e registro de logs, facilitando o desenvolvimento, testes e apresentação do projeto, mesmo sem acesso ao ambiente Azure. Caso futuramente seja possível criar a conta, a estrutura do código permite adaptar facilmente o armazenamento dos logs para a Azure Table, conforme o proposto originalmente.

## Estrutura do projeto

- `Controllers/FuncionarioController.cs`: Endpoints da API.
- `Models/Funcionario.cs` e `Models/FuncionarioLog.cs`: Modelos de dados.
- `frontend/`: Interface web para uso rápido da API.

## Exemplo de uso do frontend

1. Preencha o formulário e clique em "Adicionar" para cadastrar um funcionário.
2. Clique em "Editar" para alterar dados de um funcionário existente.
3. Clique em "Excluir" para remover um funcionário.
4. Use o campo de busca para consultar um funcionário pelo ID.

---

O restante das instruções e exemplos de endpoints segue conforme o desafio original.

## Ambiente
Este é um diagrama do ambiente que deverá ser montado no Microsoft Azure, utilizando o App Service para a API, SQL Database para o banco relacional e Azure Table para armazenar os logs.

![Diagrama da classe Funcionario](Imagens/diagrama_api.png)


## Solução
O código está pela metade, e você deverá dar continuidade obedecendo as regras descritas acima, para que no final, tenhamos um programa funcional. Procure pela palavra comentada "TODO" no código, em seguida, implemente conforme as regras acima, incluindo a sua publicação na nuvem.