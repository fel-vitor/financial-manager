import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TransactionType } from '@shared/transaction/enums/transaction-types';
import { sumTransaction } from '@shared/transaction/functions/sum-transactions';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { Balance } from './components/balance/balance';
import { PieChartConfig } from './components/pie-chart/pie-chart-config.interface';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Balance, PieChartComponent, MatCardModule, MatButtonModule, MatProgressBarModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  transactions = input.required<Transaction[]>();
  layout = input.required<string>();
  title = input.required<string>();

  canLoadComponent = signal(false);

  ngOnInit(): void {
    console.log(this.layout());
    console.log(this.title());
  }

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
