using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRUDAPI.Models;

namespace CRUDAPI.AppService.Interfaces
{
    public interface IPessoaAppService
    {
        Task<List<Pessoa>> ObterTodosAsync();
        Task<Pessoa> ObterPorIdAsync(int id);
        Task<bool> SalvarAsync(Pessoa pessoa);
        Task<bool> AtualizarAsync(Pessoa pessoa);
        Task<bool> ExcluirAsync(int id);
    }
}