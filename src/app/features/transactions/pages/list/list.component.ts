import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  debounced,
  ElementRef,
  inject,
  injectAsync,
  linkedSignal,
  onIdle,
  Signal,
  signal,
  viewChild,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmationDialogService } from '@shared/dialog/confirmation/services/confirmation-dialog.service';
import { FeedbackService } from '@shared/feedback/services/feedback.service';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { TransactionsService } from '@shared/transaction/services/transactions.service';
import { debounceTime } from 'rxjs';
import { NoTransactions } from './components/no-transactions/no-transactions';
import { SearchComponent } from './components/search/search.component';
import { TransactionContainerComponent } from './components/transaction-container/transaction-container.component';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { TransactionType } from '@shared/transaction/enums/transaction-types';
import { GetTransactionFilter } from '@shared/transaction/interfaces/get-transactions-filter';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { createMouseNear } from './functions/create-mouse-near';
import { ActionLogService } from '../../store/action-log.service';

const typeFilterOptions = [
  { value: 'all', label: 'Todas' },
  { value: TransactionType.INCOME, label: 'Receitas' },
  { value: TransactionType.OUTCOME, label: 'Despesas' },
];

@Component({
  selector: 'app-list',
  imports: [
    TransactionItem,
    NoTransactions,
    MatButtonModule,
    RouterLink,
    TransactionContainerComponent,
    SearchComponent,
    MatProgressBar,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  private transactionsService = inject(TransactionsService);
  private feedbackService = inject(FeedbackService);
  private router = inject(Router);
  private confirmationDialogService = inject(ConfirmationDialogService);
  private activatedRoute = inject(ActivatedRoute);
  private actionLogService = inject(ActionLogService);

  private isMouseNear = createMouseNear();
  private exportBtn = viewChild.required('exportBtn', {
    read: ElementRef,
  });

  private reportsServices = injectAsync(
    () => import('./../../../../shared/transaction/services/reports.service'),
    {
      // prefetch: onIdle,
      prefetch: () => {
        return new Promise<void>((resolve) => {
          afterNextRender({
            read: () => {
              this.isMouseNear(this.exportBtn().nativeElement).then(() => resolve());
            },
          });
        });
      },
    },
  );

  // transactions = input.required<Transaction[]>();

  // items = linkedSignal(() => this.transactions());

  // resourceRef = resource({
  //   params: () => {
  //     return {
  //       searchTerm: this.searchTerm(),
  //     };
  //   },
  //   loader: ({ params: { searchTerm } }) => {
  //     return firstValueFrom(this.transactionsService.getAll(searchTerm));
  //   },
  //   defaultValue: [],
  // });

  // resourceRef = rxResource({
  //   params: () => {
  //     return {
  //       searchTerm: this.searchTerm(),
  //     };
  //   },
  //   stream: ({ params: { searchTerm } }) => {
  //     return this.transactionsService.getAll(searchTerm);
  //   },
  //   defaultValue: [],
  // });

  typeFilterOptions = typeFilterOptions;

  constructor() {
    this.actionLogService.add('Listagem de transações');
  }

  filters = signal<GetTransactionFilter>({
    search: '',
    type: 'all',
  });

  private filtersTermWithDebounce = debounced(this.filters, 500);

  private resourceRef = this.transactionsService.getAllWithHttpResource(
    this.filtersTermWithDebounce.value,
  );

  search = linkedSignal(() => this.filters().search, {
    set: (value) => {
      this.filters.update((filters) => {
        return {
          ...filters,
          search: value,
        };
      });
    },
  });

  type = linkedSignal(() => this.filters().type, {
    set: (value) => {
      this.filters.update((filters) => {
        return {
          ...filters,
          type: value,
        };
      });
    },
  });

  transactions = computed(() => this.resourceRef.value());
  isLoading = computed(() => this.resourceRef.isLoading());

  edit(transaction: Transaction) {
    this.router.navigate(['edit', transaction.id], { relativeTo: this.activatedRoute });
  }

  remove(transaction: Transaction) {
    this.confirmationDialogService
      .open({
        title: 'Deletar transação',
        message: 'Você realmente quer desletar essa transação?',
      })
      .subscribe({
        next: () => {
          this.transactionsService.delete(transaction.id).subscribe({
            next: () => {
              this.removeTransactionFromArray(transaction);
              this.feedbackService.success('Transação removida com sucesso!');
            },
          });
        },
      });
  }

  async export() {
    (await this.reportsServices()).exportToCsv(this.transactions());
  }

  private removeTransactionFromArray(transaction: Transaction) {
    this.resourceRef.update((transactions) => {
      return transactions.filter((item) => item.id !== transaction.id);
    });
  }
}
