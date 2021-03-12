import { NgForm } from '@angular/forms';
import { Component, Input } from '@angular/core';

import { Contato } from 'src/app/core/model';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent {

  @Input() contatos: Array<Contato>;
  contato: Contato;
  exibindoFormularioContato = false;
  contatoIndex: number;

  prepararNovoContato() {
    this.exibindoFormularioContato = true;
    this.contato = new Contato();
    this.contatoIndex = this.contatos.length;
  }

  confirmarContato(form: NgForm) {
    this.contatos[this.contatoIndex] = this.clonarContato(this.contato);
    this.exibindoFormularioContato = false;

    form.reset();
  }

  prepararEdicaoContato(contato: Contato, index: number) {
    this.contato = this.clonarContato(contato);
    this.exibindoFormularioContato = true;
    this.contatoIndex = index;
  }

  removerContato(index: number) {
    this.contatos.splice(index, 1);
  }

  get editando() {
    return this.contato && this.contato.codigo;
  }

  private clonarContato(contato: Contato) {
    return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone);
  }

}
