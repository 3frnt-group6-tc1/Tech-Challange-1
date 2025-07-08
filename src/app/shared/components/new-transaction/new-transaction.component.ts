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

  categorySuggestions: string[] = [
    'Alimentação', 'Transporte', 'Lazer', 'Educação', 'Saúde',
    'Investimentos', 'Moradia', 'Viagem', 'Compras', 'Salário'
  ];
  filteredCategorySuggestions: string[] = [];
  showSuggestions = false;

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

  selectedFiles: File[] = [];

  constructor(private transactionService: TransactionService) {}

  onTransactionTypeChange(value: TransactionType): void {
    this.newTransaction.type = value;
  }

  onAmountChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    value = value.substring(0, 12);

    while (value.length < 3) value = '0' + value;

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

    const value = input.value.toLowerCase();
    this.filteredCategorySuggestions = this.categorySuggestions
      .filter(c => c.toLowerCase().includes(value))
      .slice(0, 5);
    this.showSuggestions = true;
  }

  selectCategorySuggestion(suggestion: string): void {
    this.newTransaction.description = suggestion;
    this.filteredCategorySuggestions = [];
    this.showSuggestions = false;
  }

  hideSuggestionsDelayed(): void {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  getTransactionTypeLabel(type: TransactionType): string {
    const labels = Object.entries(TRANSACTION_TYPE_LABELS).find(([_, value]) => value === type);
    return labels ? labels[0] : type;
  }

  async createTransaction(): Promise<void> {
    if (!this.newTransaction.type || !this.newTransaction.amount || !this.newTransaction.description?.trim()) {
      this.submitStatus = { success: false, message: 'Preencha todos os campos obrigatórios.' };
      return;
    }

    this.submitStatus = { success: true, message: 'Processando transação...' };

    const attachments = await Promise.all(this.selectedFiles.map(file => this.convertFileToBase64(file)));

    const transaction: any = {
      type: this.newTransaction.type,
      amount: this.newTransaction.amount,
      description: this.newTransaction.description,
      date: new Date().toISOString(),
      id_user: this.fixedUserId,
      attachments
    };

    this.transactionService.create(transaction).subscribe({
      next: () => {
        this.submitStatus = { success: true, message: 'Transação criada com sucesso!' };
        this.resetForm();
      },
      error: (err) => {
        this.submitStatus = { success: false, message: 'Erro ao salvar transação.' };
        console.error(err);
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
    this.selectedFiles = [];
    setTimeout(() => {
      if (this.submitStatus.success) this.submitStatus.message = '';
    }, 3000);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles.push(...Array.from(input.files));
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const isNumber = /^[0-9]$/;
    if (!isNumber.test(event.key)) {
      event.preventDefault();
    }
  }

  allowOnlyLetters(event: KeyboardEvent): void {
    const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  private convertFileToBase64(file: File): Promise<{ name: string, type: string, data: string }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve({ name: file.name, type: file.type, data: reader.result as string });
      };
      reader.onerror = reject;
    });
  }


}
