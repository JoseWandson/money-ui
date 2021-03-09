import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Contato, Pessoa } from './../../core/model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  exibindoFormularioContato = false;
  contato: Contato;
  contatoIndex: number;

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

  prepararNovoContato() {
    this.exibindoFormularioContato = true;
    this.contato = new Contato();
    this.contatoIndex = this.pessoa.contatos.length;
  }

  confirmarContato(form: NgForm) {
    this.pessoa.contatos[this.contatoIndex] = this.clonarContato(this.contato);
    this.exibindoFormularioContato = false;

    form.reset();
  }

  prepararEdicaoContato(contato: Contato, index: number) {
    this.contato = this.clonarContato(contato);
    this.exibindoFormularioContato = true;
    this.contatoIndex = index;
  }

  removerContato(index: number) {
    this.pessoa.contatos.splice(index, 1);
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  private carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
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

  private clonarContato(contato: Contato) {
    return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone);
  }

}
