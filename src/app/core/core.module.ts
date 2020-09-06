import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,

    ToastModule
  ],
  exports: [
    NavbarComponent,

    ToastModule
  ],
  providers: [MessageService]
})
export class CoreModule { }
