import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GradoUpperCase {
  //ESTO DEBE SER UN SERVICE PARA TODOS LOS PROYECTOS
  getGradoFirUpper(gradoCorto: string, gradoLargo: string, escalafon: string) {
    //CORONEL DE AVIACIONl
    let gradoCompletoFir = [];
    gradoCompletoFir = gradoLargo.split(' ');

    let gradoFinalSol = '';
    gradoCompletoFir?.forEach((gradoArray: string) => {
      if (gradoArray != '' && !gradoArray.includes("(")) {
        let gradoConvert = gradoArray[0].toUpperCase() + gradoArray.slice(1).toLowerCase();
        if (gradoConvert == 'De' || gradoConvert == 'Del') {
          gradoConvert = gradoConvert.toLowerCase();
          gradoFinalSol = gradoFinalSol + ' ' + gradoConvert;
        } else {
          gradoFinalSol = gradoFinalSol + ' ' + gradoConvert;
        }
      }
    });
    if (gradoCorto == 'GAV' || gradoCorto == 'GDA') {
      return gradoFinalSol;
    } else {
      return `${gradoFinalSol} ${escalafon}`;
    }
  }
}
