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

  ngOnChanges(): void {
    if (this.transaction) {
      this.amount = this.transaction.amount;
      this.description = this.transaction.description;
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
} 