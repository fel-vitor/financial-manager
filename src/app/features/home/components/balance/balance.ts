import { Component, computed, input } from '@angular/core';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { BalanceCard } from './components/balance-card/balance-card';
import { sumTransaction } from '@shared/transaction/functions/sum-transactions';
import { TransactionType } from '@shared/transaction/enums/transaction-types';

@Component({
  selector: 'app-balance',
  imports: [BalanceCard],
  templateUrl: './balance.html',
  styleUrl: './balance.scss',
})
export class Balance {
  transactions = input.required<Transaction[]>();

  totalIncomes = computed(() => {
    return sumTransaction(this.transactions(), TransactionType.INCOME);
  });

  totalOutcomes = computed(() => {
    return sumTransaction(this.transactions(), TransactionType.OUTCOME);
  });

  balance = computed(() => {
    return this.totalIncomes() - this.totalOutcomes();
  });
}
