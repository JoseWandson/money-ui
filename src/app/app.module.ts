import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { LancamentosModule } from './lancamentos/lancamentos.module';
import { LancamentoService } from './lancamentos/lancamento.service';
import { PessoasModule } from './pessoas/pessoas.module';
import { PessoaService } from './pessoas/pessoa.service';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    ConfirmDialogModule,

    LancamentosModule,
    PessoasModule,
    CoreModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
