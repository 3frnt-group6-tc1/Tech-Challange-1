import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent, FormsModule],
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent {
  @Input() isOpen: boolean = false;
  @Input() transaction: Transaction | null = null;
  @Output() save = new EventEmitter<{ id: string; amount: number; description: string }>();
  @Output() cancel = new EventEmitter<void>();

  amount: number = 0;
  description: string = '';
  amountFormatted: string = '';

  ngOnChanges(): void {
    if (this.transaction) {
      this.amount = this.transaction.amount;
      this.description = this.transaction.description;
      this.amountFormatted = this.formatAmount(this.amount);
    }
  }

  onSave(): void {
    if (this.transaction && this.transaction.id) {
      this.save.emit({
        id: this.transaction.id,
        amount: this.amount,
        description: this.description
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  formatAmount(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  onAmountInput(event: Event): void {
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

    this.amountFormatted = `${integer},${cents}`;
    this.amount = Number(integer.replace(/\./g, '') + '.' + cents);
  }
}
