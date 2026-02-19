import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { environment } from '../../environments/environment';
import { HomeCardComponent } from '../shared/cards/home-card/home-card.component';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-index',
  imports: [HomeCardComponent, RouterModule, RouterLink, RouterOutlet, NgIf],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Se define aquí en lugar de ApplicationConfig
  standalone: true
})
export class IndexComponent {

  proyectName: string = environment.nameProyect;
  public token: string = ''
  public gradoCorto: string | undefined
  public nombre: string | undefined

  showNav: boolean = environment.webComponent;
  constructor(private router: Router

    /* private authService: AuthService */
  ) {
    if (environment.webComponent) {
      this.router.navigate(['/cw-mi-fach/index-mf']);
    }
  }

  ngOnInit(): void {

    let token = sessionStorage.getItem('token');
    /*    let rutStorage: string = this.authService.obtieneusuario(token);
   
       this.authService.devuelveUsuario(rutStorage).subscribe((data:any) =>{
   
         data.forEach((selec: any)=>{
            this.gradoCorto = selec.gradoCorto
            this.nombre = selec.nombre
         })
   
       })
    */

  }


}
