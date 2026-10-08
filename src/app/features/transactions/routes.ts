import { Routes } from '@angular/router';

import { getTransactionByIdResolver } from './pages/create-or-edit/resolvers/get-transaction-by-id-resolver';
import { ActionLogService } from './store/action-log.service';

export const routes: Routes = [
  {
    path: '',
    providers: [ActionLogService],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/list/list.component').then((m) => m.ListComponent),
      },
      {
        path: 'create/new',
        loadComponent: () =>
          import('./pages/create-or-edit/create-or-edit.component').then(
            (m) => m.CreateOrEditComponent,
          ),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./pages/create-or-edit/create-or-edit.component').then(
            (m) => m.CreateOrEditComponent,
          ),
        resolve: {
          transaction: getTransactionByIdResolver,
        },
      },
    ],
  },
];
