import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Constants } from 'src/app/shared/Constants';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela', { static: true }) grid: Table;
  pt: any;

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.pt = Constants.pt;
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    if (pagina === 0) {
      this.grid.first = 0;
    }

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        this.grid.reset();

        this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso!' });
      });
  }

}
