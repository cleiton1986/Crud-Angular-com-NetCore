using CRUDAPI.Models;
using CRUDAPI.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CRUDAPI.Repository
{
    public class PessoaRepository : IPessoaRepository
    {
        private readonly Contexto _contexto;
        public PessoaRepository(Contexto contexto)
        {
            _contexto = contexto;
        }
        public async Task AtualizarAsync(Pessoa pessoa)
        {
            _contexto.Pessoas.Update(pessoa);
            await _contexto.SaveChangesAsync();
        }

        public async Task DeletarAsync(Pessoa pessoa)
        {
             _contexto.Remove(pessoa);
             await _contexto.SaveChangesAsync();
        }

        public async Task<bool> ValidarExistenciaPessoaAsync(int id)
        {
            return await _contexto.Pessoas.AnyAsync(p => p.PessoaId == id);
        }
        public async Task<Pessoa> ObterPorIdAsync(int id)
        {
            var pessoa = await _contexto.Pessoas.FirstOrDefaultAsync(x => x.PessoaId == id);
            return pessoa;
        }

        public async Task<List<Pessoa>> ObterTodosAsync()
        {
            return await _contexto.Pessoas.ToListAsync();
        }

        public async Task SalvarAsync(Pessoa pessoa)
        {
            await _contexto.Pessoas.AddAsync(pessoa);
            await _contexto.SaveChangesAsync();
        }

    }
}