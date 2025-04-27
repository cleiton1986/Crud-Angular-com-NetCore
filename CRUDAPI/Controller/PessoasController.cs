using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRUDAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace CRUDAPI.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class PessoasController : ControllerBase
    {
        private readonly Contexto _contexto;

        public PessoasController(Contexto contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> GetAsync()
        {
            return await _contexto.Pessoas.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Pessoa>> ObterPorIdAsync(int id)
        {
            var pessoa = await _contexto.Pessoas.FindAsync(id);
            if(pessoa == null)
               return NotFound();
            
            return pessoa;
            
        }

        [HttpPost]
        public async Task<ActionResult<Pessoa>> SalvarAsync(Pessoa pessoa)
        {
            await _contexto.Pessoas.AddAsync(pessoa);
            await _contexto.SaveChangesAsync();
            return Ok();
        }
    //   [HttpGet("{menuId}/getAllMenusItems")]
        [HttpPut]
        public async Task<ActionResult> AtualizarAsync(Pessoa pessoa)
        {
            _contexto.Pessoas.Update(pessoa);
            await _contexto.SaveChangesAsync();
            return Ok();
        }
    
        [HttpDelete("{id}")]
        public async Task<ActionResult> ExcluirAsync(int id){
            var pessoa = await _contexto.Pessoas.FindAsync(id);
             
             if(pessoa == null)
              return NotFound();

             _contexto.Remove(pessoa);
            await _contexto.SaveChangesAsync();
            return Ok();
        }

       //[HttpGet]
        //public ActionResult<Pessoa> ObterTeste()
        //{
          //  var pessoa = "Teste de Requisição";
            
            //return Ok(pessoa);
            
        //}

    }
}