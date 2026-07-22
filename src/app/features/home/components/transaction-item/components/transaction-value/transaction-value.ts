import { Component, computed, input } from '@angular/core';
import { Transaction } from '../../../../../../shared/transaction/interfaces/transaction';
import { TransactionType } from '../../../../../../shared/transaction/enums/transaction-types';

const CssClasses = {
  [TransactionType.INCOME]: 'income',
  [TransactionType.OUTCOME]: 'outcome',
};

@Component({
  selector: 'app-transaction-value',
  imports: [],
  template: '{{ transaction().value }}',
  styleUrl: './transaction-value.scss',
  host: {
    '[class]': 'cssClass()'
  },
})
export class TransactionValue {
  transaction = input.required<Transaction>();

  cssClass = computed(() => CssClasses[this.transaction().type]);
}
