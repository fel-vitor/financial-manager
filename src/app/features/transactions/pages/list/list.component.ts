import { HttpParams, httpResource, HttpResourceRequest } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmationDialogService } from '@shared/dialog/confirmation/services/confirmation-dialog.service';
import { FeedbackService } from '@shared/feedback/services/feedback.service';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { TransactionsService } from '@shared/transaction/services/transactions.service';
import { NoTransactions } from './components/no-transactions/no-transactions';
import { SearchComponent } from './components/search/search.component';
import { TransactionContainerComponent } from './components/transaction-container/transaction-container.component';
import { TransactionItem } from './components/transaction-item/transaction-item';

@Component({
  selector: 'app-list',
  imports: [
    TransactionItem,
    NoTransactions,
    MatButtonModule,
    RouterLink,
    TransactionContainerComponent,
    SearchComponent,
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

  resourceRef = this.transactionsService.getAllWithHttpResource(this.searchTerm);

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
