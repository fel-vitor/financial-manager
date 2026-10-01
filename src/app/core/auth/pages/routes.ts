import { Routes } from '@angular/router';



export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../components/layout/layout').then(m => m.Layout),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
      },
    ]
  },
];
