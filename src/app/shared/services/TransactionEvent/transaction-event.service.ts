import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Transaction } from '../../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionEventService {
  private readonly transactionCreated = new Subject<Transaction>();
  transactionCreated$ = this.transactionCreated.asObservable();

  private readonly transactionUpdated = new Subject<Transaction>();
  transactionUpdated$ = this.transactionUpdated.asObservable();

  private readonly transactionDeleted = new Subject<string>();
  transactionDeleted$ = this.transactionDeleted.asObservable();

  notifyTransactionCreated(transaction: Transaction): void {
    this.transactionCreated.next(transaction);
  }

  notifyTransactionUpdated(transaction: Transaction): void {
    this.transactionUpdated.next(transaction);
  }

  notifyTransactionDeleted(transactionId: string): void {
    this.transactionDeleted.next(transactionId);
  }
}