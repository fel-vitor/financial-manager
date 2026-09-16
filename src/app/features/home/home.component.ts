import { Component, computed, input, linkedSignal } from '@angular/core';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { Balance } from './components/balance/balance';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { PieChartConfig } from './components/pie-chart/pie-chart-config.interface';
import { TransactionType } from '@shared/transaction/enums/transaction-types';
import { sumTransaction } from '@shared/transaction/functions/sum-transactions';

@Component({
  selector: 'app-home',
  imports: [Balance, PieChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  transactions = input.required<Transaction[]>();

  totalIncomes = computed(() => {
    return sumTransaction(this.transactions(), TransactionType.INCOME);
  });

  totalOutcomes = computed(() => {
    return sumTransaction(this.transactions(), TransactionType.OUTCOME);
  });

  chartConfig = computed<PieChartConfig>(() => {
    return {
      labels: ['Ganhos', 'Gastos'],
      dataLabel: 'Valor total',
      data: [this.totalIncomes(), this.totalOutcomes()],
    };
  });
}
