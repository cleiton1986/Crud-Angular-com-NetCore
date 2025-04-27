import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PessoasService } from '../../pessoas.service';
import { Pessoa } from '../../Pessoa';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pessoas',
  
  imports: [ReactiveFormsModule, NgIf, NgFor,CommonModule],
  standalone: true,
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.css',
  providers: [BsModalService]
})


//Modo Antigo

/*

/*  
//Modo Antigo
export class PessoasComponent implements OnInit{
    
  formulario: any;
  tituloFormulario: string;
   
  constructor(){}
  
  ngOnInit(): void {
    this.tituloFormulario = 'Nova Pessoa';

     this.formulario = new FormGroup({
      nome: new FormControl(null),
      sobrenome: new FormControl(null),
      idade: new FormControl(null),
      profissao: new FormControl(null)
  }); 

  }

}

*/





/* */

//Modo Novo Angular 14
export class PessoasComponent{

  formGroup: FormGroup;
  tituloFormulario: string = 'Nova Pessoa';
  pessoas: Pessoa[];
  nomePessoa: string;
  pessoaId: number;
  
  
  visibilidadeTabela: boolean = true;
  visibilidadeForm: boolean = false;

  modalRef: BsModalRef;
  


 //pessoas : any = {
      //nome: '',
      //sobrenome: '',
      //idade: 0,
     // profissao: ''
  //};

  private formBuilderService = inject(FormBuilder);
  
  protected formulario = this.formBuilderService.group({
 
      nome: ['', Validators.required],
      idade: [0, [Validators.required, Validators.min(18)]],
      sobreNome: ['', Validators.required],
      profissao: ['', Validators.required]
  })


  private pessoasService = inject(PessoasService);
  modalService = inject(BsModalService);
 
  
  constructor(){
   
    /** */
   
   // const pessoa: any  = this.formulario.value;
    this.pessoasService.getTodos().subscribe(resultado => {
      this.pessoas = resultado;
      
      console.log(resultado)
    })
  }
 



  


/*
  //Modo antigo
  construtor(private pessoasService: PessoasService){}

  this.pessoasService.getTodos().subscribe(resultado => {
    
  })

*/
  
  //private pessoasService = inject(PessoasService);

  onAtualizar(pessoaId:any){
  
    console.log(pessoaId)
    this.visibilidadeTabela = false;
    this.visibilidadeForm = true;

    this.pessoas = [];
    this.pessoasService.getId(pessoaId).subscribe(resultado =>{
       
      //this.pessoas[0].nome = resultado.nome;
      //this.pessoas[0].sobrenome = resultado.sobrenome;
      //this.pessoas[0].idade = resultado.idade;
      //this.pessoas[0].profissao = resultado.profissao;
      //this.pessoas[0].pessoaId = resultado.pessoaId;
     
      this.tituloFormulario =`Atualizar ${resultado.nome} ${resultado.sobrenome}`; 
      
      //const pessoas = new Pessoa();
      //this.pessoas.map(function(p) {
        //return p = resultado;
      //});
      this.formulario = this.formBuilderService.group({
 
        nome: [resultado.nome],
        idade: [resultado.idade],
        sobreNome: [resultado.sobrenome],
        profissao: [resultado.profissao]
    })
  

        
        
   }) 

  }


  onExbirFormCadastro(){
    this.visibilidadeTabela = false;
    this.visibilidadeForm = true;
    //console.log(this.Pessoa);
     //const formPessoa = this.formulario.value;
     const pessoa: any  = this.formulario.value;
     this.pessoasService.getTodos().subscribe(resultado => {
      this.pessoas = resultado;
     })
  }

  onSubmit(){
    const pessoa: any  = this.formulario.value;
    if(pessoa.pessoaId > 0){
      this.pessoasService.Atualizar(pessoa).subscribe(resultado =>{

        this.onExbirFormCadastro();
        this.visibilidadeForm = false;
        this.visibilidadeTabela = true;
        alert('Pessoa Atualizada com sucesso!');
      });
    }
    else
    {
       
      this.pessoasService.Salvar(pessoa).subscribe(resultado =>{

        this.onExbirFormCadastro();
        this.visibilidadeForm = false;
        this.visibilidadeTabela = true;
        alert('Pessoa Inserida com sucesso!');
      });
    }

   }
   
   
  voltar(){
     this.visibilidadeTabela = true;
     this.visibilidadeForm = false;
  }


  
  ExibirConfirmacaoExclusao(pessoaId: any, nomePessoa: any, conteudoModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(conteudoModal);
    this.pessoaId = pessoaId;
    this.nomePessoa = nomePessoa;
  }

  ExcluirPessoa(pessoaId: any){
    this.pessoasService.Excluir(pessoaId).subscribe(resp => {
      this.modalRef.hide();
      alert('Pessoa excluída com sucesso');
      this.pessoasService.getTodos().subscribe(resgistro => {
         this.pessoas = resgistro;
      });
    })
  }

}
 