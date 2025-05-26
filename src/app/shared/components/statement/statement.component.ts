import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent } from "../text/text.component";
import { IconArrowPencilComponent } from "../../assets/icons/icon-arrow-pencil.component";
import { IconBinComponent } from "../../assets/icons/icon-bin.component";
import { IconDollarComponent } from "../../assets/icons/icon-dollar.component";
import { IconArrowDownLeftComponent } from "../../assets/icons/icon-arrow-down-left.component";

import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/Transaction/transaction-service';
import { systemConfig } from '../../../app.config';
import { NewStatementItem } from '../../models/statement';

@Component({
  selector: 'app-statement',
  standalone: true,
  imports: [
    CommonModule,
    TextComponent,
    IconArrowPencilComponent,
    IconBinComponent,
    IconDollarComponent,
    IconArrowDownLeftComponent
  ],
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss'],
})
export class StatementComponent implements OnInit {
  items: NewStatementItem[] = [];

  // Propriedade computada para retornar apenas os 6 itens mais recentes
  get recentItems(): NewStatementItem[] {
    return this.items
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);
  }

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadUserTransactions();
  }

  loadUserTransactions(): void {
    const userId = systemConfig.userId;

    this.transactionService.getByUserId(userId).subscribe({
      next: (transactions) => {
        const validTransactions = transactions.filter(t => t.id);
        this.items = this.mapTransactionsToStatementItems(validTransactions);
        console.log(this.items);
      },
      error: (error) => {
        console.error('Error fetching user transactions:', error);
      }
    });
  }

  mapTransactionsToStatementItems(transactions: Transaction[]): NewStatementItem[] {
    return transactions.map(transaction => {
      const id = transaction.id as string;

      let type: 'deposit' | 'withdraw';

      if (transaction.type === 'exchange' ||
          transaction.type === 'loan') {
        type = 'deposit';
      } else {
        type = 'withdraw';
      }

      const dateObj = transaction.date instanceof Date ?
        transaction.date : new Date(transaction.date);
      const date = dateObj.toLocaleDateString();

      return {
        id: id,
        type: type,
        description: transaction.description,
        amount: transaction.amount,
        date: date
      };
    });
  }

  deleteTransaction(id: string): void {
    this.transactionService.delete(id).subscribe({
      next: () => {
        this.items = this.items.filter(item => item.id !== id);
      },
      error: (error) => {
        console.error('Error deleting transaction:', error);
      }
    });
  }

  editTransaction(id: string): void {
    // Implement navigation to edit page or show edit modal
    console.log('Edit transaction:', id);
    // This would typically navigate to an edit form or open a dialog
  }
}