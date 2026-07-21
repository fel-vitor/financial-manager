import { Component, signal } from '@angular/core';
import { Balance } from './components/balance/balance';

@Component({
  selector: 'app-home',
  imports: [Balance],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  transactions =  signal([
    { value: 100, type: 'income' },
    { value: 0, type: 'income' },
    { value: 100, type: 'outcome' },
  ]);
}
