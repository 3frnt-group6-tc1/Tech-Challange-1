import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const apiConfig = {
  baseUrl: 'http://localhost:8080',
  usersEndpoint: '/users',
  transactionsEndpoint: '/transactions',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
