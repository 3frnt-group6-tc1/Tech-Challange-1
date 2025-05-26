import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { TextComponent } from "../text/text.component";
import { InputComponent } from "../input/input.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/Transaction/transaction-service';
import { Transaction, TransactionType, isCredit, isDebit } from '../../models/transaction';
import { systemConfig } from '../../../app.config';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  standalone: true,
  imports: [ButtonComponent, TextComponent, InputComponent, CommonModule, FormsModule]
})
export class NewTransactionComponent {
  private readonly fixedUserId = systemConfig.userId;

  transactionOptions = [
    { display: 'Receita (Exchange)', value: 'exchange' },
    { display: 'Despesa (Transfer)', value: 'transfer' },
    { display: 'Empréstimo (Loan)', value: 'loan'}
  ];

  newTransaction: {
    type: TransactionType;
    amount: number;
    description: string;
  } = {
    type: TransactionType.Exchange,
    amount: 0,
    description: '',
  };

  valorTransacao: string = '';
  selectedOption: string = '';

  submitStatus: {
    success: boolean;
    message: string;
  } = {
    success: false,
    message: ''
  };

  constructor(
    private transactionService: TransactionService
  ) {}

  onTransactionTypeChange(value: TransactionType): void {
    this.newTransaction.type = value;
  }

  onAmountChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    value = value.replace(/[^\d,]/g, '');

    const parts = value.split(',');
    if (parts.length > 2) {
      value = parts[0] + ',' + parts.slice(1).join('');
    }

    if (parts.length === 2 && parts[1].length > 2) {
      parts[1] = parts[1].substring(0, 2);
      value = parts.join(',');
    }

    this.valorTransacao = value;

    this.newTransaction.amount = Number(value.replace(',', '.'));
  }

  onDescriptionChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.newTransaction.description = input.value;
  }

  createTransaction(): void {
    if (!this.newTransaction.type) {
      this.submitStatus = {
        success: false,
        message: 'Por favor, selecione o tipo de transação.'
      };
      return;
    }

    if (!this.newTransaction.amount || this.newTransaction.amount <= 0) {
      this.submitStatus = {
        success: false,
        message: 'Por favor, informe um valor válido para a transação.'
      };
      return;
    }

    if (!this.newTransaction.description || this.newTransaction.description.trim() === '') {
      this.submitStatus = {
        success: false,
        message: 'Por favor, adicione uma descrição para a transação.'
      };
      return;
    }

    this.submitStatus = {
      success: true,
      message: 'Processando transação...'
    };

    const transaction: Transaction = {
      type: this.newTransaction.type,
      description: this.newTransaction.description,
      amount: this.newTransaction.amount,
      date: new Date(),
      id_user: this.fixedUserId
    };

    this.transactionService.create(transaction).subscribe({
      next: (createdTransaction) => {
        console.log('Transação criada:', createdTransaction);
        this.submitStatus = {
          success: true,
          message: `Transação ${isCredit(transaction.type) ? 'de crédito' : 'de débito'} criada com sucesso!`
        };

        this.resetForm();
      },
      error: (error) => {
        console.error('Erro ao criar transação:', error);
        this.submitStatus = {
          success: false,
          message: 'Erro ao criar transação: ' + (error.message || 'Tente novamente mais tarde')
        };
      }
    });
  }

  resetForm(): void {
    this.newTransaction = {
      type: TransactionType.Exchange,
      amount: 0,
      description: ''
    };
    this.valorTransacao = '';
    this.selectedOption = '';

    setTimeout(() => {
      if (this.submitStatus.success) {
        this.submitStatus.message = '';
      }
    }, 3000);
  }
}