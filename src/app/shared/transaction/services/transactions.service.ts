import { HttpClient, HttpParams, httpResource, HttpResourceRequest } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { Transaction, TransactionPayload } from '../interfaces/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private httpClient = inject(HttpClient);

  getAll(searchTerm?: string) {
    let httpParams = new HttpParams();

    if (searchTerm) {
      httpParams = httpParams.append('q', searchTerm);
    }

    return this.httpClient.get<Transaction[]>('/api/transaction', { params: httpParams });
  }

  getAllWithHttpResource(searchTerm: Signal<string>) {
    return httpResource<Transaction[]>(
      () => {
        let httpParams = new HttpParams();

        if (searchTerm()) {
          httpParams = httpParams.append('q', searchTerm());
        }

        return {
          url: '/api/transaction',
          params: httpParams,
        } as HttpResourceRequest;
      },
      {
        defaultValue: [],
      },
    );
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
