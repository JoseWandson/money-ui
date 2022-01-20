import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';

import { Lancamento } from './../core/model';
import { environment } from './../../environments/environment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  async pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
    }
    if (filtro.dataVencimentoInicio) {
      params = params.append('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }
    if (filtro.dataVencimentoFim) {
      params = params.append('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    const response = await firstValueFrom(this.http.get<any>(`${this.lancamentosUrl}?resumo`, { params }));
    const lancamentos = response.content;
    const resultado = {
      lancamentos,
      total: response.totalElements
    };
    return resultado;
  }

  async excluir(codigo: number): Promise<void> {
    await firstValueFrom(this.http.delete(`${this.lancamentosUrl}/${codigo}`));
    return null;
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    delete lancamento.codigo;

    return firstValueFrom(this.http.post<Lancamento>(this.lancamentosUrl, lancamento));
  }

  async atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const codigo = lancamento.codigo;
    delete lancamento.codigo;

    const response = await firstValueFrom(this.http.put<Lancamento>(`${this.lancamentosUrl}/${codigo}`, lancamento));
    this.converterStringsParaDatas([response]);
    return response;
  }

  async buscarPorCodigo(codigo: number): Promise<Lancamento> {
    const response = await firstValueFrom(this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`));
    this.converterStringsParaDatas([response]);
    return response;
  }

  urlUploadAnexo(): string {
    return `${this.lancamentosUrl}/anexo`;
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }

}
