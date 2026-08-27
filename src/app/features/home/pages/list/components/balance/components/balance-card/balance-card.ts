import { CurrencyPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

type CardType = 'income' | 'outcome' | 'balance';

enum ValueCssClass {
  income = 'income',
  outcome = 'outcome',
  zero = 'zero',
}

@Component({
  selector: 'app-balance-card',
  imports: [MatCardModule, CurrencyPipe],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.scss',
})
export class BalanceCard {
  type = input.required<CardType>();
  label = input.required<string>();
  value = input.required<number>();

  cssClass = computed<ValueCssClass>(() => {
    const type = this.type();
    const { income, outcome, zero } = ValueCssClass;
    if(type === income) {
      return income;
    }

    if(type === outcome) {
      return outcome;
    }

    if(this.value() === 0) {
      return zero;
    }

    return this.value() > 0 ? income : outcome;
  });
}