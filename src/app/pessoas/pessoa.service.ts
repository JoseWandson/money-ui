import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';

import { Cidade, Estado, Pessoa } from './../core/model';
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
  cidadesUrl: string;
  estadosUrl: string;

  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
  }

  async pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    const response = await firstValueFrom(this.http.get<any>(this.pessoasUrl, { params }));
    const pessoas = response.content;
    const resultado = {
      pessoas,
      total: response.totalElements
    };
    return resultado;
  }

  async listarTodas(): Promise<any> {
    const response = await firstValueFrom(this.http.get<any>(this.pessoasUrl));
    return response.content;
  }

  async excluir(codigo: number): Promise<void> {
    await firstValueFrom(this.http.delete(`${this.pessoasUrl}/${codigo}`));
    return null;
  }

  async mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    await firstValueFrom(this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers }));
    return null;
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return firstValueFrom(this.http.post<Pessoa>(this.pessoasUrl, pessoa));
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return firstValueFrom(this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`));
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const codigo = pessoa.codigo;
    delete pessoa.codigo;

    return firstValueFrom(this.http.put<Pessoa>(`${this.pessoasUrl}/${codigo}`, pessoa));
  }

  listarEstados(): Promise<Estado[]> {
    return firstValueFrom(this.http.get<Estado[]>(this.estadosUrl));
  }

  pesquisarCidades(estado: number): Promise<Cidade[]> {
    const params = new HttpParams()
      .append('estado', estado.toString());

    return firstValueFrom(this.http.get<Cidade[]>(this.cidadesUrl, { params }));
  }
}
