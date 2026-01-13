import { Component } from '@angular/core';
import { PersonalLista } from './personal-lista/personal-lista';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PersonalLista],
  template: `<app-personal-lista />`,
  styleUrl: './app.css',
})
export class App {}