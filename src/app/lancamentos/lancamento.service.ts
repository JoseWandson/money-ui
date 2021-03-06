import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

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
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }
    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }
    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    const response = await this.http.get(`${this.lancamentosUrl}?resumo`, { params })
      .toPromise();
    const lancamentos = response['content'];
    const resultado = {
      lancamentos,
      total: response['totalElements']
    };
    return resultado;
  }

  async excluir(codigo: number): Promise<void> {
    await this.http.delete(`${this.lancamentosUrl}/${codigo}`)
      .toPromise();
    return null;
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    delete lancamento.codigo;

    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento)
      .toPromise();
  }

  async atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const codigo = lancamento.codigo;
    delete lancamento.codigo;

    const response = await this.http.put(`${this.lancamentosUrl}/${codigo}`, lancamento)
      .toPromise();
    const lancamentoAlterado = response as Lancamento;
    this.converterStringsParaDatas([lancamentoAlterado]);
    return lancamentoAlterado;
  }

  async buscarPorCodigo(codigo: number): Promise<Lancamento> {
    const response = await this.http.get(`${this.lancamentosUrl}/${codigo}`)
      .toPromise();
    const lancamento = response as Lancamento;
    this.converterStringsParaDatas([lancamento]);
    return lancamento;
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
