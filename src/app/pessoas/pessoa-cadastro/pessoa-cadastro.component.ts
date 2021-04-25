import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Pessoa } from './../../core/model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  estados: any[];
  cidades: any[];
  estadoSelecionado: number;

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Nova pessoa');

    this.carregarEstados();

    const codigoPessoa = this.route.snapshot.params.codigo;
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  salvar() {
    if (this.editando) {
      this.atualizarPessoa();
    } else {
      this.adicionarPessoa();
    }
  }

  nova(form: NgForm) {
    form.reset();

    setTimeout(() => this.pessoa = new Pessoa(), 1);

    this.router.navigate(['/pessoas/nova']);
  }

  carregarEstados() {
    this.pessoaService.listarEstados()
      .then(lista => this.estados = lista.map(uf => ({ label: uf.nome, value: uf.codigo })))
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado)
      .then(lista => this.cidades = lista.map(c => ({ label: c.nome, value: c.codigo })))
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  private carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.estadoSelecionado = this.pessoa.endereco.cidade ? this.pessoa.endereco.cidade.estado.codigo : null;
        if (this.estadoSelecionado) {
          this.carregarCidades();
        }

        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

  private adicionarPessoa() {
    this.pessoaService.adicionar(this.pessoa)
      .then(pessoaAdicionada => {
        this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });

        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private atualizarPessoa() {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.messageService.add({ severity: 'success', detail: 'Pessoa alterada com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
