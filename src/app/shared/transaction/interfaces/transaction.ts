import { TransactionType } from "../enums/transaction-types";


export interface Transaction {
    id: string;
    title: string;
    value: number;
    type: TransactionType;
}