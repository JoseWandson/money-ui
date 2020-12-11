import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PrimeNGConfig } from 'primeng/api';

import { Constants } from 'src/app/shared/Constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private config: PrimeNGConfig
  ) { }

  ngOnInit() {
    this.config.setTranslation(Constants.pt);
  }

  exibindoNavbar() {
    return this.router.url !== '/login';
  }

}
