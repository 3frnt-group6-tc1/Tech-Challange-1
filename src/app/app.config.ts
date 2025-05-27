import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // ✅ importado aqui
import { provideHttpClient } from '@angular/common/http'; // ✅ importado aqui

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
} = {
  version: '1.0.0',
  company: 'CDJMV',
  year: new Date().getFullYear(),
  userId: 'u2',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), // ✅ adicionado aqui para habilitar o HttpClient globalmente
    provideHttpClient(), // ✅ adicionado aqui para habilitar o HttpClient globalmente
  ],
};
