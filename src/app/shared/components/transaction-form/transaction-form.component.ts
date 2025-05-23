import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { TextComponent } from '../text/text.component';
import { InputComponent } from '../input/input.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/Transaction/transaction-service';
import {
  Transaction,
  TransactionType,
  TRANSACTION_TYPE_LABELS,
} from '../../models/transaction';
import { systemConfig } from '../../../app.config';

export interface TransactionForm {
  type: string;
  amount: string;
}

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  imports: [
    ButtonComponent,
    TextComponent,
    InputComponent,
    CommonModule,
    FormsModule,
  ],
})
export class TransactionFormComponent implements OnInit {
  transactionOptions = Object.keys(TRANSACTION_TYPE_LABELS);
  form: TransactionForm = this.createEmptyForm();

  private createEmptyForm(): TransactionForm {
    return {
      type: this.transactionOptions[0],
      amount: '00,00',
    };
  }

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {}

  submitForm() {
    const type = TRANSACTION_TYPE_LABELS[this.form.type] as TransactionType;
    const amount = Number((this.form.amount as string).replace(',', '.'));

    const transaction: Transaction = {
      type,
      amount,
      date: new Date(),
      description: this.form.type,
      id_user: systemConfig.userId,
    } as Transaction;

    this.transactionService.create(transaction).subscribe(
      () => {
        this.resetForm();
      },
      (error) => {
        console.error('Error creating transaction:', error);
      }
    );
  }

  resetForm() {
    this.form = this.createEmptyForm();
  }
}
