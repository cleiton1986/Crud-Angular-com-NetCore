using System.ComponentModel.DataAnnotations;

namespace CRUDAPI.Models
{
    public class Pessoa
    {
        public Pessoa(){}
        public Pessoa(Pessoa pessoa)
        {
            this.Nome = pessoa.Nome;
            this.SobreNome = pessoa.SobreNome;
            this.PessoaId = pessoa.PessoaId;
            this.Profissao = pessoa.Profissao;
        }
        public int PessoaId { get; set; }
        public string Nome { get; set; }
        public string SobreNome { get; set; }
        public int Idade { get; set; } 
        public string Profissao { get; set; }
        public bool Validar(Pessoa pessoa)
        {
            if(pessoa == null) return false;
            return true;
        }
    }



}
