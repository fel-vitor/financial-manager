import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { getTransactionsResolver } from './resolvers/get-transactions-resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      transactions: getTransactionsResolver,
    },
  },
];
