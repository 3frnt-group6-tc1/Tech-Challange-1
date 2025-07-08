import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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
export class EditModalComponent implements OnChanges {
  @Input() isOpen: boolean = false;
  @Input() transaction: Transaction | null = null;
  @Output() save = new EventEmitter<{ id: string; amount: number; description: string }>();
  @Output() cancel = new EventEmitter<void>();

  amount: number = 0;
  description: string = '';
  amountFormatted: string = '';

  descriptionTouched = false;
  amountTouched = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.transaction) {
      this.amount = this.transaction.amount;
      this.description = this.transaction.description;
      this.amountFormatted = this.formatAmount(this.amount);
      this.descriptionTouched = false;
      this.amountTouched = false;
    }
  }

  get isDescriptionValid(): boolean {
    return this.description.trim().length >= 3;
  }

  get isAmountValid(): boolean {
    return this.amount > 0;
  }

  get isFormValid(): boolean {
    return this.isDescriptionValid && this.isAmountValid;
  }

  onSave(): void {
    this.descriptionTouched = true;
    this.amountTouched = true;

    if (this.transaction && this.transaction.id && this.isFormValid) {
      this.save.emit({
        id: this.transaction.id,
        amount: this.amount,
        description: this.description.trim()
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

  onlyNumbers(event: KeyboardEvent): boolean {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
      return false;
    }
    return true;
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
    this.amountTouched = true;
  }
}
