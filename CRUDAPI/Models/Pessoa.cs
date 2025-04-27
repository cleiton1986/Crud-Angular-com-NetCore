using System.ComponentModel.DataAnnotations;

namespace CRUDAPI.Models
{
    public class Pessoa
    {
        public Pessoa(Pessoa pessoa)
        {
            this.Nome = pessoa.Nome;
            this.SobreNome = pessoa.SobreNome;
            this.PessoaId = pessoa.PessoaId;
            this.Profissao = pessoa.Profissao;
        }
        public int PessoaId { get; set; }

        [Required(ErrorMessage = "O nome é obrigatório.")]
        
        [StringLength(100, MinimumLength = 3, ErrorMessage = "O nome deve ter entre 3 e 100 caracteres.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O SobreNome é obrigatório.")]
        
        [StringLength(100, MinimumLength = 3, ErrorMessage = "O SobreNome deve ter entre 3 e 100 caracteres.")]
        public string SobreNome { get; set; }
        [Range(18, 100, ErrorMessage = "A idade deve estar entre 18 e 100 anos.")]
        public int Idade { get; set; } 

        [Required(ErrorMessage = "A profissão é obrigatória.")]
        
        [StringLength(100, MinimumLength = 3, ErrorMessage = "A profissão deve ter entre 3 e 100 caracteres.")]
        public string Profissao { get; set; }

        public bool Validar(Pessoa pessoa)
        {
            if(pessoa == null) return false;
            return true;
        }
    }



}