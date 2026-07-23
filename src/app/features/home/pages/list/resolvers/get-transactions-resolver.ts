import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { TransactionsService } from '@shared/transaction/services/transactions.service';

export const getTransactionsResolver: ResolveFn<Transaction[]> = (route, state) => {
  const transactionsService = inject(TransactionsService);
  return transactionsService.getAll();
};
