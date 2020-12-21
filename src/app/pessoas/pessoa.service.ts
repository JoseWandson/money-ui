import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pessoa } from './../core/model';
import { environment } from './../../environments/environment';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl: string;

  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

  async pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    const response = await this.http.get(this.pessoasUrl, { params }).toPromise();
    const pessoas = response['content'];
    const resultado = {
      pessoas,
      total: response['totalElements']
    };
    return resultado;
  }

  async listarTodas(): Promise<any> {
    const response = await this.http.get(this.pessoasUrl).toPromise();
    return response['content'];
  }

  async excluir(codigo: number): Promise<void> {
    await this.http.delete(`${this.pessoasUrl}/${codigo}`).toPromise();
    return null;
  }

  async mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    await this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers }).toPromise();
    return null;
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post<Pessoa>(this.pessoasUrl, pessoa)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
      .toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const codigo = pessoa.codigo;
    delete pessoa.codigo;

    return this.http.put<Pessoa>(`${this.pessoasUrl}/${codigo}`, pessoa)
      .toPromise();
  }
}
