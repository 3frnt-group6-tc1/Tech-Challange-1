import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../../models/transaction';
import { apiConfig } from '../../../app.config';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = apiConfig.baseUrl + apiConfig.transactionsEndpoint;

  constructor(private http: HttpClient) {}

  create(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

  read(transactionId: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${transactionId}`);
  }

  update(
    transactionId: string,
    transaction: Transaction
  ): Observable<Transaction> {
    return this.http.put<Transaction>(
      `${this.apiUrl}/${transactionId}`,
      transaction
    );
  }

  delete(transactionId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${transactionId}`);
  }

  getAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  getById(transactionId: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${transactionId}`);
  }

  getByUserId(userId: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}?id_user=${userId}`);
  }
}
