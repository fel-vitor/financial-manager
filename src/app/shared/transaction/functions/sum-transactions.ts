import { TransactionType } from '../enums/transaction-types';
import { Transaction } from '../interfaces/transaction';

export function sumTransaction(transactions: Transaction[], type: TransactionType) {
  return transactions
    .filter((item) => item.type === type)
    .reduce((total, item) => total + item.value, 0);
}
