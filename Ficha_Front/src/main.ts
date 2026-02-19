
import {
  importProvidersFrom,
  provideZoneChangeDetection
} from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, RouterModule, UrlHandlingStrategy, withHashLocation } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { routes } from './app/app.routes';
import { AuthInterceptor } from './app/auth/auth-interceptor';

import { AppComponent } from './app/app.component';
import { IndexComponent } from './app/core/index.component';
import { IndexMiFachComponent } from './app/core/mi-fach/components/index-mi-fach/index-mi-fach.component';
import { IndexMiOficinaComponent } from './app/core/mi-oficina/components/index-mi-oficina/index-mi-oficina.component';
import { SharedModule } from './app/shared/shared.module';
import 'zone.js'; // ✅ Esto lo registra globalmente NO borrar, porque o sino no funciona componente hijo
import { environment } from './environments/environment';
import { APP_BASE_HREF } from '@angular/common';
if (!environment.webComponent) {

  bootstrapApplication(AppComponent, {
    providers: [provideRouter(routes), provideHttpClient(withInterceptors([AuthInterceptor]))]
  });
} else {

  try {
    bootstrapApplication(AppComponent, {
      providers: [
        { provide: APP_BASE_HREF, useValue: '/cw-template' },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        provideRouter(routes, withHashLocation()),
        importProvidersFrom(
          BrowserModule,
          CommonModule,
          FormsModule,
          ReactiveFormsModule,
          SharedModule,
          RouterModule
        ),
        provideZoneChangeDetection(),
        provideHttpClient(withInterceptors([AuthInterceptor])),
        DatePipe
      ]
    }).then((appRef) => {
      const injector = appRef.injector;
      function register(name: string, component: any) {
        if (!customElements.get(name)) {
          const el = createCustomElement(component, { injector });
          customElements.define(name, el);
        }
      }

      register('app-index-proyect', AppComponent);
      register('app-index-componet', IndexComponent);
      register('app-index-mi-fach', IndexMiFachComponent);
      register('app-index-mi-oficina', IndexMiOficinaComponent);
    });
    console.log('✅ Microfrontend iniciado correctamente');
  } catch (e) {
    console.error('❌ Error global al inicializar microfrontend:', e);
  }
}

