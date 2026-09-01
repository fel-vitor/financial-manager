import { Component, inject, input, linkedSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmationDialogService } from '@shared/dialog/confirmation/services/confirmation-dialog.service';
import { FeedbackService } from '@shared/feedback/services/feedback.service';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { TransactionsService } from '@shared/transaction/services/transactions.service';
import { NoTransactions } from './components/no-transactions/no-transactions';
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

  transactions = input.required<Transaction[]>();

  items = linkedSignal(() => this.transactions());

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
    this.items.update((transactions) => {
      return transactions.filter((item) => item.id !== transaction.id);
    });
  }
}
