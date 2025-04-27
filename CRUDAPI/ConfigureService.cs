using CRUDAPI.AppService.Interfaces;
using CRUDAPI.Controller.AppService;
using CRUDAPI.Models;
using CRUDAPI.Repository;
using CRUDAPI.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CRUDAPI
{
    public class ConfigureService
    {
        public static void AddServices(IServiceCollection services, IConfiguration configure){
           
            services.AddDbContext<Contexto>(opcoes => opcoes.UseSqlServer(configure.GetConnectionString("ConexaoBD")));
            services.AddMvcCore().AddApiExplorer();
            services.AddRazorPages();
            services.AddMvc();


            services.AddScoped<IPessoaAppService, PessoaAppService>();
            services.AddScoped<IPessoaRepository, PessoaRepository>();
        
    
        }

    } 
}