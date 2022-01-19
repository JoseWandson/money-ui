import { Component } from '@angular/core';

import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  exibindoMenu = false;

  constructor(
    public auth: AuthService
  ) { }

  logout() {
    this.auth.logout();
  }

}
