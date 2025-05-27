import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent } from '../text/text.component';
import { IconArrowPencilComponent } from '../../assets/icons/icon-arrow-pencil.component';
import { IconBinComponent } from '../../assets/icons/icon-bin.component';
import { IconDollarComponent } from '../../assets/icons/icon-dollar.component';
import { IconArrowDownLeftComponent } from '../../assets/icons/icon-arrow-down-left.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  Transaction,
  TransactionType,
  isCredit,
  isDebit,
  TRANSACTION_TYPE_LABELS,
} from '../../models/transaction';
import { TransactionService } from '../../services/Transaction/transaction-service';
import { systemConfig } from '../../../app.config';
import { TransactionEventService } from '../../services/TransactionEvent/transaction-event.service';

@Component({
  selector: 'app-statement',
  standalone: true,
  imports: [
    CommonModule,
    TextComponent,
    IconArrowPencilComponent,
    IconBinComponent,
    IconDollarComponent,
    IconArrowDownLeftComponent,
  ],
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss'],
})
export class StatementComponent implements OnInit, OnDestroy {
  transactions: Transaction[] = [];
  transactionLabels = TRANSACTION_TYPE_LABELS;
  isLoading = false;
  private destroy$ = new Subject<void>();

  get recentTransactions(): Transaction[] {
    return this.transactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);
  }

  constructor(
    private transactionService: TransactionService,
    private transactionEventService: TransactionEventService
  ) {}

  ngOnInit(): void {
    this.loadUserTransactions();

    // Listen for created transactions
    this.transactionEventService.transactionCreated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(transaction => {
        if (transaction.id_user === systemConfig.userId) {
          // Add the new transaction to our list
          this.transactions = [transaction, ...this.transactions];
        }
      });

    // Listen for updated transactions
    this.transactionEventService.transactionUpdated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(transaction => {
        if (transaction.id_user === systemConfig.userId) {
          // Update the transaction in our list
          this.transactions = this.transactions.map(t =>
            t.id === transaction.id ? transaction : t
          );
        }
      });

    // Listen for deleted transactions
    this.transactionEventService.transactionDeleted$
      .pipe(takeUntil(this.destroy$))
      .subscribe(transactionId => {
        // Remove the transaction from our list
        this.transactions = this.transactions.filter(t => t.id !== transactionId);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadUserTransactions(): void {
    const userId = systemConfig.userId;
    this.isLoading = true;

    this.transactionService.getByUserId(userId).subscribe({
      next: (transactions) => {
        this.transactions = transactions.filter(t => t.id);
        this.isLoading = false;
        console.log('Loaded transactions:', this.transactions);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error fetching user transactions:', error);
      },
    });
  }

  // Helper methods for template use
  isDeposit(transaction: Transaction): boolean {
    return isCredit(transaction.type);
  }

  isWithdraw(transaction: Transaction): boolean {
    return isDebit(transaction.type);
  }

  formatDate(date: Date | string): string {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString();
  }

  getTransactionTypeLabel(type: TransactionType): string {
    const entry = Object.entries(TRANSACTION_TYPE_LABELS)
      .find(([_, value]) => value === type);

    return entry ? entry[0] : type;
  }

  deleteTransaction(id: string): void {
    if (!id) return;

    this.transactionService.delete(id).subscribe({
      next: () => {
        // The transaction will be removed via the subscription to transactionDeleted$
        console.log('Transaction deleted', id);
      },
      error: (error) => {
        console.error('Error deleting transaction:', error);
      },
    });
  }

  editTransaction(id: string): void {
    console.log('Edit transaction:', id);
    // Implement your edit logic here
  }
}