import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  Transaction,
  TransactionType,
  DEBIT_TYPES,
  CREDIT_TYPES,
} from '../../models/transaction';
import { Balance } from '../../models/balance';
import { apiConfig } from '../../../app.config';
import { TransactionEventService } from '../TransactionEvent/transaction-event.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = apiConfig.baseUrl + apiConfig.transactionsEndpoint;

  constructor(
    private http: HttpClient,
    private transactionEventService: TransactionEventService
  ) {}

  create(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction).pipe(
      tap((createdTransaction) => {
        this.transactionEventService.notifyTransactionCreated(
          createdTransaction
        );
      })
    );
  }

  read(transactionId: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${transactionId}`);
  }

  update(
    transactionId: string,
    transaction: Transaction
  ): Observable<Transaction> {
    return this.http
      .put<Transaction>(`${this.apiUrl}/${transactionId}`, transaction)
      .pipe(
        tap((updatedTransaction) => {
          this.transactionEventService.notifyTransactionUpdated(
            updatedTransaction
          );
        })
      );
  }

  delete(transactionId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${transactionId}`).pipe(
      tap(() => {
        this.transactionEventService.notifyTransactionDeleted(transactionId);
      })
    );
  }

  getAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  getById(transactionId: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${transactionId}`);
  }

  getByUserId(
    userId: string,
    types?: TransactionType[]
  ): Observable<Transaction[]> {
    let url = `${this.apiUrl}?id_user=${userId}`;
    if (types && types.length > 0) {
      url += `&type=${types.join(',')}`;
    }
    return this.http.get<Transaction[]>(url);
  }

  getCreditsByUserId(userId: string): Observable<Transaction[]> {
    return this.getByUserId(userId, CREDIT_TYPES);
  }

  getDebitsByUserId(userId: string): Observable<Transaction[]> {
    return this.getByUserId(userId, DEBIT_TYPES);
  }

  getUserBalance(userId: string): Observable<Balance> {
    return this.getByUserId(userId).pipe(
      map((transactions) => {
        const totalCredits = transactions
          .filter((t) => CREDIT_TYPES.includes(t.type))
          .reduce((sum, t) => sum + t.amount, 0);

        const totalDebits = transactions
          .filter((t) => DEBIT_TYPES.includes(t.type))
          .reduce((sum, t) => sum + t.amount, 0);

        return {
          totalCredits,
          totalDebits,
          balance: totalCredits - totalDebits,
        };
      })
    );
  }
}
