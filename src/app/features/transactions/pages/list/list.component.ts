import { Component, computed, inject, Signal, signal } from '@angular/core';
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

function typeDelay(signal: Signal<string>) {
  const observable = toObservable(signal).pipe(debounceTime(500));

  return toSignal(observable, { initialValue: '' });
}

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
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private transactionsService = inject(TransactionsService);
  private feedbackService = inject(FeedbackService);
  private router = inject(Router);
  private confirmationDialogService = inject(ConfirmationDialogService);
  private activatedRoute = inject(ActivatedRoute);

  // transactions = input.required<Transaction[]>();

  // items = linkedSignal(() => this.transactions());

  searchTerm = signal('');

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

  private resourceRef = this.transactionsService.getAllWithHttpResource(typeDelay(this.searchTerm));

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

  private removeTransactionFromArray(transaction: Transaction) {
    this.resourceRef.update((transactions) => {
      return transactions.filter((item) => item.id !== transaction.id);
    });
  }
}
