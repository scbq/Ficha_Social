import { Injectable } from '@angular/core';
//import { gradoMap } from '../../assets/icon-portal/grado-lib';

@Injectable({
  providedIn: 'root'
})
export class GradoImgService {

  devuelveRutaFotoGrado(ruta: string) {
    let rutaUpper = '';
    if (ruta) {
      rutaUpper = ruta.toUpperCase();
      rutaUpper = rutaUpper.split(" ", 2)[0];
    }
    //DESCOMENTAR CUANDO LA NATY SUBA LAS IMAGENES SVG
    /*  for (let [key, value] of gradoMap.entries()) {
       if (value.includes(rutaUpper)) {
         return key;
       }
     } */
  }
}
