import { Route, Routes } from '@angular/router';
import { Home } from './home';
import { CreateComponent } from './pages/create/create.component';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'create',
    component: CreateComponent,
  }
];
