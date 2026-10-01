import { TransactionType } from "../enums/transaction-types";

export interface GetTransactionFilter {
  type: TransactionType | 'all';
  search: string;
}
