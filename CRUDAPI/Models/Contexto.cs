using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CRUDAPI.Models
{
    public class Contexto: DbContext
    {
        public Contexto(DbContextOptions<Contexto> opcoes): base(opcoes)
        {

        }
        public DbSet<Pessoa> Pessoas { get; set; }

    }
}