import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorNumberService {

  constructor() { }
  getError(errorStatus: number, mensaje?: string) {
    switch (errorStatus) {
      case 400:
        Swal.close();
        Swal.fire('Ups!, ocurrió un error inesperado.', `${mensaje == '' ? 'Algo ha ido mal con la petición' : mensaje}(err: ${errorStatus ? errorStatus : 400}).`, 'error')
        break;
      case 401:
        Swal.close();
        Swal.fire(`${mensaje == '' ? 'No tienes permiso para recibir ese contenido' : mensaje}`, `${mensaje == '' ? 'No tienes permiso para recibir ese contenido' : mensaje} (err: ${errorStatus ? errorStatus : 401}).`, 'error')
        break;

      case 402:
        Swal.close();
        Swal.fire('Ups!, ocurrió un error inesperado.', `${mensaje == '' ? 'En desuso por ahora' : mensaje} (err: ${errorStatus ? errorStatus : 402}).`, 'error')
        break;

      case 403:
        Swal.close();
        Swal.fire('Ups!, ocurrió un error inesperado.', `${mensaje == '' ? 'La petición es correcta pero el servidor se niega a ofrecerte el recurso o página web' : mensaje} (err: ${errorStatus ? errorStatus : 403}).`, 'error')
        break;

      case 404:
        Swal.close();
        Swal.fire('Ups!, ocurrió un error inesperado.', `${mensaje == '' ? 'Recurso no está disponible en el servidor' : mensaje} (err: ${errorStatus ? errorStatus : 404}).`, 'error')
        break;

      case 405:
        Swal.close();
        Swal.fire('Ups!, ocurrió un error inesperado.', `${mensaje == '' ? 'No se permite el uso de ese método' : mensaje} (err: ${errorStatus ? errorStatus : 405}).`, 'error')
        break;

      case 408:
        Swal.close();
        Swal.fire('Ups!, ocurrió un error inesperado.', `${mensaje == '' ? 'El servidor ha pasado demasiado tiempo esperando una respuesta por parte del cliente' : mensaje} (err: ${errorStatus ? errorStatus : 408}).`, 'error')
        break;

      case 409:
        Swal.close();
        Swal.fire('Ups!, ocurrió un error inesperado.', `${mensaje == '' ? 'La petición no se pudo completar porque hubo un problema con ella' : mensaje} (err: ${errorStatus ? errorStatus : 409}).`, 'error')
        break;

      case 412:
        Swal.close();
        Swal.fire('Ups!, ocurrió un error inesperado.', `${mensaje ? mensaje : 'OTP no es correcta'} (err: ${errorStatus ? errorStatus : 412}).`, 'error')
        break;

      case 415:
        Swal.close();
        Swal.fire('Ups!, ocurrió un error inesperado.', `${mensaje == '' ? 'El tipo de archivo que se ha recibido es distinto al que se esperaba' : mensaje} (err: ${errorStatus ? errorStatus : 415}).`, 'error')
        break;

      default:
        Swal.close();
        Swal.fire('Ups!, ocurrió un error inesperado.', `${mensaje == '' ? 'Internal Server Error' : mensaje} (err: ${errorStatus ? errorStatus : 500}).`, 'error')
        break;
    }
  }
}
