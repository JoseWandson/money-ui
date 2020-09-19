import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Constants } from './../../shared/Constants';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from './../../core/model';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  pt: any;

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.pt = Constants.pt;
    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: NgForm) {
    console.log(this.lancamento);
  }

  private carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo })))
      .catch(erro => this.errorHandler.handle(erro));
  }

  private carregarPessoas() {
    return this.pessoaService.listarTodas()
      .then(pessoas => this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.codigo })))
      .catch(erro => this.errorHandler.handle(erro));
  }

}
