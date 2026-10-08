import { Routes } from '@angular/router';

import { getTransactionsResolver } from './resolvers/get-transactions-resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home.component').then(m => m.HomeComponent),
    data: {
      title: 'Home',
    },
    resolve: {
      transactions: getTransactionsResolver,
    },
  },
];
