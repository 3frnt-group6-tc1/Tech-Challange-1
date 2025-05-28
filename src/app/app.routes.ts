import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'panel',
    loadComponent: () =>
      import('./pages/panel/panel.component').then((m) => m.PainelComponent),
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import('./pages/transactions/transactions.component').then(
        (m) => m.TransactionsComponent
      ),
  },
  {
    path: 'cards',
    loadComponent: () =>
      import('./pages/cards/cards.component').then((m) => m.CardsComponent),
  },
  {
    path: 'configurations',
    loadComponent: () =>
      import('./pages/configurations/configurations.component').then(
        (m) => m.ConfigurationsComponent
      ),
  },
];
