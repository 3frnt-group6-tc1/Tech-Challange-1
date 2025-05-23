import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextComponent } from '../text/text.component';

import { IconArrowPencilComponent } from '../../assets/icons/icon-arrow-pencil.component';
import { IconBinComponent } from '../../assets/icons/icon-bin.component';
import { IconDollarComponent } from '../../assets/icons/icon-dollar.component';
import { IconArrowDownLeftComponent } from '../../assets/icons/icon-arrow-down-left.component';
import { IconArrowRightComponent } from '../../assets/icons/icon-arrow-right.component';
import { TransactionService } from '../../services/Transaction/transaction-service';
import { systemConfig } from '../../../app.config';
import { StatementItem } from '../../models/statement';
import { isCredit, isDebit, Transaction } from '../../models/transaction';
import { BrlPipe } from '../../pipes/brl.pipe';

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
    IconArrowRightComponent,
    BrlPipe,
  ],
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss'],
})
export class StatementComponent {
  userId: string = systemConfig.userId;
  items: StatementItem[] = [];
  errorMessage: string = '';

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    this.transactionService.getByUserId(this.userId).subscribe(
      (response) => this.onTransactionsFetchSuccess(response),
      (error) => {
        this.errorMessage = 'Erro ao buscar transações.';
        console.error('Error fetching transactions:', error);
      }
    );
  }

  onTransactionsFetchSuccess(response: any[]): void {
    this.errorMessage = '';

    const sorted = response
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);

    this.items = sorted.map(
      (t: Transaction): StatementItem => ({
        id: t.id,
        description: t.description,
        amount: t.amount,
        date: this.formatDate(t.date),
        credit: isCredit(t.type),
        debit: isDebit(t.type),
      })
    );
  }

  formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR');
  }

  deleteTransaction(id: string) {
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
      this.transactionService.delete(id).subscribe(() => {
        this.fetchTransactions();
      });
    }
  }
}
