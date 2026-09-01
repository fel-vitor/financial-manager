import { Component, input, linkedSignal } from '@angular/core';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { Balance } from './components/balance/balance';

@Component({
  selector: 'app-home',
  imports: [Balance],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  transactions = input.required<Transaction[]>();
}
