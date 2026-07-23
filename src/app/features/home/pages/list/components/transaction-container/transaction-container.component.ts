import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input, TemplateRef } from '@angular/core';
import { Transaction } from '@shared/transaction/interfaces/transaction';

@Component({
  selector: 'app-transaction-container',
  imports: [NgTemplateOutlet],
  templateUrl: './transaction-container.component.html',
  styleUrl: './transaction-container.component.scss',
})
export class TransactionContainerComponent {
  transactions = input.required<Transaction[]>();

  itemTemplate = contentChild.required<TemplateRef<unknown>>('item');
  noItemTemplate = contentChild.required<TemplateRef<unknown>>('noItems');
}
