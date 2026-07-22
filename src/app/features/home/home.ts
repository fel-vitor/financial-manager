import { Component, signal } from '@angular/core';
import { Balance } from './components/balance/balance';
import { TransactionItem } from "./components/transaction-item/transaction-item";
import { Transaction } from '../../shared/transaction/interfaces/transaction';
import { TransactionType } from '../../shared/transaction/enums/transaction-types';

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  transactions =  signal<Transaction[]>([
    { title: 'Salário', value: 100, type: TransactionType.INCOME },
    { title: 'VA', value: 0, type: TransactionType.INCOME },
    { title: 'Aluguel', value: 100, type: TransactionType.OUTCOME },
  ]);
}
