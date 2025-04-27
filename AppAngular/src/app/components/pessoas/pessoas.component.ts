import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PessoasService } from '../../pessoas.service';
import { Pessoa } from '../../Pessoa';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { Console } from 'console';

@Component({
  selector: 'app-pessoas',
  
  imports: [ReactiveFormsModule, NgIf, NgFor,CommonModule],
  standalone: true,
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.css',
  providers: [BsModalService]
})

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
   
    this.pessoasService.getTodos().subscribe(resultado => {
      this.pessoas = resultado;
      
    })
  }

  onAtualizar(pessoaId:any){
    this.visibilidadeTabela = false;
    this.visibilidadeForm = true;
    this.tituloFormulario = '';

    this.pessoasService.getId(pessoaId).subscribe(resultado =>{
       //console.log(resultado)

    this.tituloFormulario =`Atualizar ${resultado.nome} ${resultado.sobreNome}`; 
    this.formulario = this.formBuilderService.group({
        nome: [resultado.nome],
        idade: [resultado.idade],
        sobreNome: [resultado.sobreNome],
        profissao: [resultado.profissao]
    })
   }) 

  }

  onExbirFormCadastro(){
    this.visibilidadeTabela = false;
    this.visibilidadeForm = true;
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
     this.pessoasService.getTodos().subscribe(resultado => {
        this.pessoas = resultado;
    })
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
 