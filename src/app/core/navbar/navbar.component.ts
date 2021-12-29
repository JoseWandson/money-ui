import { Component } from '@angular/core';

import { AuthService } from 'src/app/seguranca/auth.service';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  exibindoMenu = false;

  constructor(
    public auth: AuthService,
    private errorHandler: ErrorHandlerService
  ) { }

  logout() {
    this.auth.logout()
      .then(() => this.auth.login())
      .catch(erro => this.errorHandler.handle(erro));
  }

}
