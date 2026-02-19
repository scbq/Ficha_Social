import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiResumenFuncService } from '../../services/shared/api-resumen-func.service';
import { environment } from '../../../environments/environment';
import { DevuelveResumenFuncionario } from '../../services/models/devuelveResumenFuncionario.model';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  proyectName: string = environment.nameProyect;
  token: string = '';
  rut: string = ''
  constructor(public _router: Router, public _apiResumenFunc: ApiResumenFuncService) {
    console.log('RUTA', this._router.url);

    if (this._router.url !== '/login') {
      /*   this.token = sessionStorage.getItem('token') ?? '';
        this.rut = this.obtieneusuario(this.token)
        this.devuelveResumenFuncionario(Number(this.rut)); */

    }
  }

  cerrarSession() {
    this._router.navigate(["/login"])
  }

  obtieneusuario(token: string) {
    //trata de token con liberia decode
    let decoded: any = jwtDecode(token);
    console.log(decoded);
    return decoded.userId;
  }

  devuelveResumenFuncionario(rut: number) {
    this._apiResumenFunc.devuelveResumenFuncionario(rut).subscribe({
      next: (resumenFuncionario: DevuelveResumenFuncionario[]) => {
        this._apiResumenFunc.setDevuelveResumenFuncionario(resumenFuncionario[0]);
      },
      complete: () => { }
    })
  }
  shouldShowNavbar(): boolean {
    return this._router.url !== '/login';
  }
}
