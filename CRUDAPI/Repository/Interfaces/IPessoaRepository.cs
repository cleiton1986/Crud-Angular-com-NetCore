using CRUDAPI.Models;

namespace CRUDAPI.Repository.Interfaces
{
    public interface IPessoaRepository
    {
        Task<List<Pessoa>> ObterTodosAsync();
        Task<Pessoa> ObterPorIdAsync(int id);
        Task SalvarAsync(Pessoa pessoa);
        Task AtualizarAsync(Pessoa pessoa);
        Task DeletarAsync(Pessoa pessoa);
        Task<bool> ValidarExistenciaPessoaAsync(int id);
    }
}