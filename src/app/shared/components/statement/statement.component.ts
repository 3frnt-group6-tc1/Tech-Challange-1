import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent } from '../text/text.component';
import { IconArrowPencilComponent } from '../../assets/icons/icon-arrow-pencil.component';
import { IconBinComponent } from '../../assets/icons/icon-bin.component';
import { IconDollarComponent } from '../../assets/icons/icon-dollar.component';
import { IconArrowDownLeftComponent } from '../../assets/icons/icon-arrow-down-left.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeleteModalComponent } from '../modal/delete-modal.component';
import { EditModalComponent } from '../modal/edit-modal.component';

import {
  Transaction,
  TransactionType,
  isCredit,
  isDebit,
  TRANSACTION_TYPE_LABELS,
  Attachment,
} from '../../models/transaction';
import { TransactionService } from '../../services/Transaction/transaction-service';
import { systemConfig } from '../../../app.config';
import { TransactionEventService } from '../../services/TransactionEvent/transaction-event.service';
import { IconArrowRightComponent } from '../../assets/icons/icon-arrow-right.component';
import { BrlPipe } from '../../pipes/brl.pipe';
import { FormsModule } from '@angular/forms';
import { IconClipComponent } from "../../assets/icons/icon-clip.component";

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
    DeleteModalComponent,
    EditModalComponent,
    BrlPipe,
    FormsModule,
    IconClipComponent
],
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss'],
})
export class StatementComponent implements OnInit, OnDestroy {
  @Input() showDetails = true;
  @Input() showAllTransactions = false;
  @Input() customTitle = 'Transações';
  @Input() showLastTransactionsSubtitle = false;
  @Input() swapColumns = false;
  transactions: Transaction[] = [];
  transactionLabels = TRANSACTION_TYPE_LABELS;
  isLoading = false;
  private destroy$ = new Subject<void>();
  isModalOpen = false;
  transactionToDelete: string | null = null;
  showAlert = false;
  alertMessage = '';
  isEditModalOpen = false;
  transactionToEdit: Transaction | null = null;

  filters = {
    description: '',
    type: '',
    category: '',
    minValue: null as number | null,
    maxValue: null as number | null,
    date: ''
  };

  get transactionTypeKeys(): string[] {
    return Object.keys(this.transactionLabels);
  }

  get recentTransactions(): Transaction[] {
    let filtered = [...this.transactions];

    if (this.filters.description) {
      filtered = filtered.filter(t =>
        t.description?.toLowerCase().includes(this.filters.description.toLowerCase())
      );
    }

    if (this.filters.type) {
      filtered = filtered.filter(t =>
        this.filters.type === 'credit' ? isCredit(t.type) : isDebit(t.type)
      );
    }

    if (this.filters.category) {
      filtered = filtered.filter(t => t.type === this.filters.category);
    }

    if (this.filters.minValue !== null) {
      filtered = filtered.filter(t => t.amount >= this.filters.minValue!);
    }

    if (this.filters.maxValue !== null) {
      filtered = filtered.filter(t => t.amount <= this.filters.maxValue!);
    }

    if (this.filters.date) {
      filtered = filtered.filter(t => {
        const transactionDate = new Date(t.date);
        const selectedDate = new Date(this.filters.date);
        return (
          transactionDate.getFullYear() === selectedDate.getFullYear() &&
          transactionDate.getMonth() === selectedDate.getMonth() &&
          transactionDate.getDate() === selectedDate.getDate()
        );
      });
    }

    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return this.showAllTransactions ? filtered : filtered.slice(0, 6);
  }


  constructor(
    private transactionService: TransactionService,
    private transactionEventService: TransactionEventService
  ) {}

  ngOnInit(): void {
    this.loadUserTransactions();

    this.transactionEventService.transactionCreated$
      .pipe(takeUntil(this.destroy$))
      .subscribe((transaction) => {
        if (transaction.id_user === systemConfig.userId) {
          this.transactions = [transaction, ...this.transactions];
        }
      });

    this.transactionEventService.transactionUpdated$
      .pipe(takeUntil(this.destroy$))
      .subscribe((transaction) => {
        if (transaction.id_user === systemConfig.userId) {
          this.transactions = this.transactions.map((t) =>
            t.id === transaction.id ? transaction : t
          );
        }
      });

    this.transactionEventService.transactionDeleted$
      .pipe(takeUntil(this.destroy$))
      .subscribe((transactionId) => {
        this.transactions = this.transactions.filter(
          (t) => t.id !== transactionId
        );
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
        this.transactions = transactions.filter((t) => t.id);
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error fetching user transactions:', error);
      },
    });
  }

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
    const entry = Object.entries(TRANSACTION_TYPE_LABELS).find(
      ([_, value]) => value === type
    );

    return entry ? entry[0] : type;
  }

  openDeleteModal(id: string): void {
    this.transactionToDelete = id;
    this.isModalOpen = true;
  }

  onConfirmDelete(): void {
    if (this.transactionToDelete) {
      this.deleteTransaction(this.transactionToDelete);
      this.isModalOpen = false;
      this.transactionToDelete = null;
      this.showAlert = true;
      this.alertMessage = 'Transação deletada com sucesso!';
      setTimeout(() => {
        this.showAlert = false;
      }, 2000);
    }
  }

  onCancelDelete(): void {
    this.isModalOpen = false;
    this.transactionToDelete = null;
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

  openEditModal(transaction: Transaction): void {
    this.transactionToEdit = transaction;
    this.isEditModalOpen = true;
  }

  onSaveEdit(updatedTransaction: { id: string; amount: number; description: string }): void {
    if (this.transactionToEdit) {
      const updated = { ...this.transactionToEdit, ...updatedTransaction };
      this.transactionService.update(updated.id, updated).subscribe({
        next: () => {
          this.isEditModalOpen = false;
          this.transactionToEdit = null;
          this.showAlert = true;
          this.alertMessage = 'Transação atualizada com sucesso!';
          setTimeout(() => {
            this.showAlert = false;
          }, 2000);
        },
        error: (error) => {
          console.error('Error updating transaction:', error);
        },
      });
    }
  }

  onCancelEdit(): void {
    this.isEditModalOpen = false;
    this.transactionToEdit = null;
  }

  editTransaction(id: string): void {
    const transaction = this.transactions.find(t => t.id === id);
    if (transaction) {
      this.openEditModal(transaction);
    }
  }

  openFirstAttachment(attachments?: Attachment[]): void {
    if (!attachments || attachments.length === 0) return;

    const first = attachments[0];

    const fileUrl = first.data;

    const newTab = window.open();
    if (newTab) {
      if (first.type.startsWith('image/')) {
        newTab.document.write(`
          <html>
            <head><title>${first.name}</title></head>
            <body style="margin:0;">
              <img src="${fileUrl}" style="width:100%;height:auto;display:block;" />
            </body>
          </html>
        `);
      } else {
        newTab.location.href = fileUrl;
      }
      newTab.document.close();
    } else {
      console.error("Não foi possível abrir a nova aba.");
    }
  }


}
