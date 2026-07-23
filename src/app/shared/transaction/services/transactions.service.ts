import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Transaction, TransactionPayload } from '../interfaces/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private httpClient = inject(HttpClient);

  getAll() {
    return this.httpClient.get<Transaction[]>('/api/transaction');
  }

  getById(id: string) {
    return this.httpClient.get<Transaction>(`/api/transaction/${id}`);
  }

  post(payload: TransactionPayload) {
    return this.httpClient.post<Transaction>('/api/transaction', payload);
  }

  put(id: string, payload: TransactionPayload) {
    return this.httpClient.put<Transaction>(`/api/transaction/${id}`, payload);
  }

  delete(id: string) {
    return this.httpClient.delete<Transaction>(`/api/transaction/${id}`);
  }
}
