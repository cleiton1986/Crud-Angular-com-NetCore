import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from './Pessoa';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type' : 'application/json'
  })
}



@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  url = 'http://localhost:5069/api/Pessoas';

  constructor(private http: HttpClient) { }
  
   //Observable : Conjunto de dados que emite notificações para o Angular

  getTodos(): Observable<Pessoa[]>{
    return this.http.get<Pessoa[]>(this.url);
  }

  getId(pessoaId: number): Observable<Pessoa>{
    const apiUrl = `${this.url}/${pessoaId}`;
    return this.http.get<Pessoa>(apiUrl);
  }

  Salvar(pessoa: Pessoa): Observable<any>{
    return this.http.post<Pessoa>(this.url, pessoa, httpOptions);
  }

  Atualizar(pessoa: Pessoa): Observable<any>{
    return this.http.put<Pessoa>(this.url, pessoa, httpOptions);
  }

  Excluir(pessoaId: number): Observable<any>{
    const apiUrl = `${this.url}/${pessoaId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }

}

