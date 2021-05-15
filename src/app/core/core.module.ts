import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Title } from '@angular/platform-browser';

import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { JwtHelperService } from '@auth0/angular-jwt';

import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { CategoriaService } from './../categorias/categoria.service';
import { DashboardService } from './../dashboard/dashboard.service';
import { RelatoriosService } from './../relatorios/relatorios.service';
import { AuthService } from './../seguranca/auth.service';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    ToastModule
  ],
  exports: [
    NavbarComponent,

    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    Title,
    { provide: LOCALE_ID, useValue: 'pt_BR' },

    MessageService,
    ConfirmationService,
    JwtHelperService,

    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    CategoriaService,
    DashboardService,
    RelatoriosService,
    AuthService
  ]
})
export class CoreModule { }
