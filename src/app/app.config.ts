import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const apiConfig = {
  baseUrl: 'http://localhost:8080',
  usersEndpoint: '/users',
  transactionsEndpoint: '/transactions',
};

export const systemConfig: {
  version: string;
  company: string;
  year: number;
  userId: string;
  isLogged?: boolean;
  loggedPages: string[];
} = {
  version: '1.0.0',
  company: 'CDJMV',
  year: new Date().getFullYear(),
  userId: 'u2',
  isLogged: false,
  loggedPages: ['/panel', '/transactions', '/cards', '/configurations'],
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
