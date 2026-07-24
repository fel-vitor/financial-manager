import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Layout } from '../../layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ]
  },
];
