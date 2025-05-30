import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { TextComponent } from "../text/text.component";
import { InputComponent } from "../input/input.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/Transaction/transaction-service';
import {
  Transaction,
  TransactionType,
  isCredit,
  TRANSACTION_TYPE_LABELS,
} from '../../models/transaction';
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
    { display: 'Receita (Câmbio de Moeda)', value: TransactionType.Exchange },
    { display: 'Despesa (DOC/TED)', value: TransactionType.Transfer },
    { display: 'Empréstimo (Empréstimo e Financiamento)', value: TransactionType.Loan }
  ];

  newTransaction: Partial<Transaction> = {
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
    let value = input.value.replace(/\D/g, '');

    value = value.substring(0, 12);

    while (value.length < 3) {
      value = '0' + value;
    }

    const cents = value.slice(-2);
    let integer = value.slice(0, -2);
    integer = integer.replace(/^0+/, '') || '0';

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    const formatted = `${integer},${cents}`;

    this.valorTransacao = formatted;
    this.newTransaction.amount = Number(integer.replace(/\./g, '') + '.' + cents);
  }

  onDescriptionChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.newTransaction.description = input.value;
  }

  getTransactionTypeLabel(type: TransactionType): string {
    const labels = Object.entries(TRANSACTION_TYPE_LABELS)
      .find(([label, value]) => value === type);

    return labels ? labels[0] : type;
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

        const transactionTypeLabel = this.getTransactionTypeLabel(transaction.type);

        this.submitStatus = {
          success: true,
          message: `Transação de ${isCredit(transaction.type) ? 'crédito' : 'débito'} (${transactionTypeLabel}) criada com sucesso!`
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
