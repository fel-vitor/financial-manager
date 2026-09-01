import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './core/auth/guards/is-authenticated-guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [isAuthenticatedGuard],
    loadComponent: () => import('./core/layout/layout').then((m) => m.Layout),
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/routes').then((m) => m.routes),
      },
      {
        path: 'transactions',
        loadChildren: () => import('./features/transactions/routes').then((m) => m.routes),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/pages/routes').then((m) => m.routes),
  },
];
