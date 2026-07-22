import { TransactionType } from "../enums/transaction-types";


export interface Transaction {
    title: string;
    value: number;
    type: TransactionType;
}