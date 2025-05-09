import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PessoasService } from '../../pessoas.service';
import { Pessoa } from '../../Pessoa';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pessoas',
  
  imports: [NgIf, NgFor,CommonModule, ReactiveFormsModule],
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
      profissao: ['', Validators.required],
      pessoaId: [0]
  })

  private pessoasService = inject(PessoasService);
  modalService = inject(BsModalService);
 
  constructor(){
   
    this.obterPessoa();
  }

  onAtualizar(pessoaId:any){
    this.exibirGridCadastro(false);
    this.tituloFormulario = '';

    this.pessoasService.getId(pessoaId).subscribe(resultado =>{
   
    this.tituloFormulario =`Atualizar ${resultado.nome} ${resultado.sobreNome}`; 
    this.formulario = this.formBuilderService.group({
        nome: [resultado.nome],
        idade: [resultado.idade],
        sobreNome: [resultado.sobreNome],
        profissao: [resultado.profissao],
        pessoaId: [resultado.pessoaId]
    })
   }) 

  }

    
  onNovoCadastro(){
    this.exibirGridCadastro(false);
    this.limparPessoa();
  }
  
  onExbirFormCadastro(){
     this.exibirGridCadastro(false);
     this.obterPessoa();
  }

  onSubmit(){
    const pessoa: any = this.formulario.value;
   
    if(pessoa?.pessoaId > 0){
      this.pessoasService.Atualizar(pessoa).subscribe(resultado =>{
        this.onExbirFormCadastro();
        this.exibirGridCadastro(true);
        alert('Pessoa Atualizada com sucesso!');
      });
    }
    else
    {
      this.pessoasService.Salvar(pessoa).subscribe(resultado =>{

        this.onExbirFormCadastro();
        this.exibirGridCadastro(false);
        alert('Pessoa Inserida com sucesso!');
      });
    }
  }
   
  voltar(){
     this.exibirGridCadastro(true);
     this.obterPessoa();
  }

  exibirConfirmacaoExclusao(pessoaId: any, nomePessoa: any, conteudoModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(conteudoModal);
    this.pessoaId = pessoaId;
    this.nomePessoa = nomePessoa;
  }

  onExcluirPessoa(pessoaId: any){
    this.pessoasService.Excluir(pessoaId).subscribe(resp => {
      this.modalRef.hide();
      alert('Pessoa excluída com sucesso');
      this.obterPessoa();
    })
  }
  
  private exibirGridCadastro(valor:boolean){
    this.visibilidadeTabela = valor;
    this.visibilidadeForm = !valor;
  }

  private limparPessoa(){
    this.formulario.reset();
    //this.formulario.addAsyncValidators();
    this.tituloFormulario = ' Nova Pessoa';
    // this.formulario.setValidators([
    //    Validators.required,
    // ]);

    this.formulario = this.formBuilderService.group({
 
      nome: ['', Validators.required],
      idade: [0, [Validators.required, Validators.min(18)]],
      sobreNome: ['', Validators.required],
      profissao: ['', Validators.required],
      pessoaId: [0]
    });

  }

  private obterPessoa(){
    const pessoa: any  = this.formulario.value;
    this.pessoasService.getTodos().subscribe(resultado => {
       this.pessoas = resultado;
    })
  }
}
 