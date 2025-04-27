using CRUDAPI.AppService.Interfaces;
using CRUDAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRUDAPI.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class PessoasController : ControllerBase
    {
        private readonly IPessoaAppService _iPessoaAppService;
        public PessoasController(IPessoaAppService iPessoaAppService)
        {
            _iPessoaAppService = iPessoaAppService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> GetAsync()
        {
            return await _iPessoaAppService.ObterTodosAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Pessoa>> ObterPorIdAsync(int id)
        {
            var pessoa = await _iPessoaAppService.ObterPorIdAsync(id);

            if(pessoa == null)
               return NotFound();
            
             return pessoa;
        }

        [HttpPost]
        public async Task<ActionResult<Pessoa>> SalvarAsync(Pessoa pessoa)
        {
            var resultado = await _iPessoaAppService.SalvarAsync(pessoa);
            if(!resultado)
              return NotFound();

             return Ok(new {Sucesso = resultado, mensagem = ""});
        }
   
        [HttpPut]
        public async Task<ActionResult> AtualizarAsync(Pessoa pessoa)
        {
            var resultado = await _iPessoaAppService.AtualizarAsync(pessoa);
            if(!resultado)
              return NotFound();

            return Ok(new {Sucesso = resultado, mensagem = ""});
        }
    
        [HttpDelete("{id}")]
        public async Task<ActionResult> ExcluirAsync(int id){
            var resultado = await _iPessoaAppService.ExcluirAsync(id);
            if(!resultado)
              return NotFound();

            return Ok(new {Sucesso = resultado, mensagem = ""});
        }


    }
}