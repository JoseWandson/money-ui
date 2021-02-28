import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent {

  periodoInicio: Date;
  periodoFim: Date;

  gerar() {
    console.log(this.periodoInicio);
    console.log(this.periodoFim);
  }

}
