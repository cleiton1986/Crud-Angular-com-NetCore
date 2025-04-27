using CRUDAPI.AppService.Interfaces;
using CRUDAPI.Models;
using CRUDAPI.Repository.Interfaces;

namespace CRUDAPI.Controller.AppService
{
    public class PessoaAppService:IPessoaAppService
    {
        private readonly IPessoaRepository _pessoaRepository;
        public PessoaAppService(IPessoaRepository pessoaRepository)
        {
            _pessoaRepository = pessoaRepository;
        }

        public async Task<bool> AtualizarAsync(Pessoa pessoa)
        {
            var validacao = validarPessoa(pessoa);
            if(validacao)
              await _pessoaRepository.AtualizarAsync(pessoa);

            return validacao;
        }

        public async Task<bool> ExcluirAsync(int id)
        {
            var pessoa = await _pessoaRepository.ObterPorIdAsync(id);
            var validacao = pessoa != null;

            if(validacao)
              await _pessoaRepository.DeletarAsync(pessoa);
              
            return validacao;
        }

        public async Task<Pessoa> ObterPorIdAsync(int id)
        {
            return await _pessoaRepository.ObterPorIdAsync(id);
        }

        public async Task<List<Pessoa>> ObterTodosAsync()
        {
           return await _pessoaRepository.ObterTodosAsync();
        }

        public async Task<bool> SalvarAsync(Pessoa pessoa)
        {
            var validacao = validarPessoa(pessoa);
            if(validacao)
              await _pessoaRepository.SalvarAsync(pessoa);

            return validacao;
        }

        private bool validarPessoa(Pessoa pessoa)
        {
            var validarPessoa = new Pessoa();
            return validarPessoa.Validar(pessoa);
        }
    }
}