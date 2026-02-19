import { Routes } from '@angular/router';
import { FichaFormComponent } from './components/ficha-form/ficha-form.component';
import { FichaListaComponent } from './components/ficha-lista/ficha-lista.component';

export const routes: Routes = [
  { path: 'index', component: FichaFormComponent }, // O la ruta que prefieras
  { path: 'lista', component: FichaListaComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' }, // Redirige al formulario por defecto
];