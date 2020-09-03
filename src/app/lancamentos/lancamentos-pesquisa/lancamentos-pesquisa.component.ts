import { Component, OnInit } from '@angular/core';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Constants } from 'src/app/shared/Constants';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  filtro = new LancamentoFiltro();
  lancamentos = [];
  pt: any;

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit(): void {
    this.pesquisar();
    this.pt = Constants.pt;
  }

  pesquisar() {
    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => this.lancamentos = resultado.lancamentos);
  }

}
