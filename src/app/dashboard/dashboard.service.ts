import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  lancamentoUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentoUrl = `${environment.apiUrl}/lancamentos`;
  }

  lancamentosPorCategoria(): Promise<Array<any>> {
    return firstValueFrom(this.http.get<Array<any>>(`${this.lancamentoUrl}/estatisticas/por-categoria`));
  }

  async lancamentosPorDia(): Promise<Array<any>> {
    const response = await firstValueFrom(this.http.get<Array<any>>(`${this.lancamentoUrl}/estatisticas/por-dia`));
    this.converterStringParaDatas(response);
    return response;
  }

  private converterStringParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }

}
