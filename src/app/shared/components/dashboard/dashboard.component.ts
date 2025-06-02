import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TransactionService } from '../../services/Transaction/transaction-service';
import { UserService } from '../../services/User/user-service';
import {
  Transaction,
  isCredit,
  isDebit,
  TRANSACTION_TYPE_LABELS
} from '../../models/transaction';
import { systemConfig } from '../../../app.config';
import { TransactionData } from '../../models/transaction-data';
import { TransactionEventService } from '../../services/TransactionEvent/transaction-event.service';
import { TransactionChartComponent } from '../../components/transaction-chart/transaction-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TransactionChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userId: string = systemConfig.userId;
  userName: string = '';
  currentDate: string = '';
  currentMonthName: string = '';
  balance: string = '';
  accountType: string = 'Conta Corrente';
  totalEntries: string = '';
  totalExits: string = '';
  idUser: string = '';
  transactionTypeLabels = TRANSACTION_TYPE_LABELS;

  showBalance: boolean = true;
  isLoading: boolean = true;

  transactionData: TransactionData[] = [];
  transactions: Transaction[] = [];
  currentMonthTransactions: Transaction[] = [];
  errorMessage: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private transactionService: TransactionService,
    private userService: UserService,
    private transactionEventService: TransactionEventService
  ) {}

  ngOnInit(): void {
    this.setCurrentDate();
    this.fetchUser();
    this.subscribeToTransactionEvents();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  subscribeToTransactionEvents(): void {
    this.transactionEventService.transactionCreated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(transaction => {
        if (transaction.id_user === this.userId) {
          this.transactions = [...this.transactions, transaction];
          this.filterCurrentMonthTransactions();
          this.updateDashboardData();
        }
      });

    this.transactionEventService.transactionUpdated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(transaction => {
        if (transaction.id_user === this.userId) {
          this.transactions = this.transactions.map(t =>
            t.id === transaction.id ? transaction : t
          );
          this.filterCurrentMonthTransactions();
          this.updateDashboardData();
        }
      });

    this.transactionEventService.transactionDeleted$
      .pipe(takeUntil(this.destroy$))
      .subscribe(transactionId => {
        const deletedTransaction = this.transactions.find(t => t.id === transactionId);
        if (deletedTransaction && deletedTransaction.id_user === this.userId) {
          this.transactions = this.transactions.filter(t => t.id !== transactionId);
          this.filterCurrentMonthTransactions();
          this.updateDashboardData();
        }
      });
  }

  setCurrentDate(): void {
    const weekDays = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ];

    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const today = new Date();
    const weekDay = weekDays[today.getDay()];
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const hour = String(today.getHours()).padStart(2, '0');
    const minute = String(today.getMinutes()).padStart(2, '0');

    this.currentDate = `${weekDay}, ${day}/${month}/${year} ${hour}:${minute}`;
    this.currentMonthName = months[today.getMonth()];
  }

  fetchUser(): void {
    this.isLoading = true;
    this.userService.getById(systemConfig.userId).subscribe({
      next: (response) => this.successUser(response),
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao buscar usuário.';
        console.error('Error fetching user name:', error);
      }
    });
  }

  successUser(response: any): void {
    this.errorMessage = '';
    this.userName = response.name;
    this.idUser = response.id;
    this.fetchTransactions(this.idUser);
  }

  fetchTransactions(id: string): void {
    this.transactionService.getByUserId(id).subscribe({
      next: (response) => {
        this.transactions = response;
        this.filterCurrentMonthTransactions();
        this.successTransaction();
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao buscar transações.';
        console.error('Error fetching transactions:', error);
      }
    });
  }

  filterCurrentMonthTransactions(): void {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    this.currentMonthTransactions = this.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getMonth() === currentMonth &&
             transactionDate.getFullYear() === currentYear;
    });
  }

  successTransaction(): void {
    this.updateDashboardData();
  }

  updateDashboardData(): void {
    let totalEntries = 0;
    let totalExits = 0;

    this.currentMonthTransactions.forEach((transaction) => {
      if (isCredit(transaction.type)) {
        totalEntries += transaction.amount;
      }
      if (isDebit(transaction.type)) {
        totalExits += transaction.amount;
      }
    });

    this.totalEntries = this.formatBalance(totalEntries);
    this.totalExits = this.formatBalance(totalExits);
    this.balance = this.formatBalance(totalEntries - totalExits);

    const weeklyData: { [key: string]: { entries: number; exits: number } } = {
      '1': { entries: 0, exits: 0 },
      '2': { entries: 0, exits: 0 },
      '3': { entries: 0, exits: 0 },
      '4': { entries: 0, exits: 0 }
    };

    this.currentMonthTransactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const dayOfMonth = date.getDate();

      let week = '1';
      if (dayOfMonth >= 1 && dayOfMonth <= 7) {
        week = '1';
      } else if (dayOfMonth >= 8 && dayOfMonth <= 14) {
        week = '2';
      } else if (dayOfMonth >= 15 && dayOfMonth <= 21) {
        week = '3';
      } else {
        week = '4';
      }

      if (isCredit(transaction.type)) {
        weeklyData[week].entries += transaction.amount;
      }
      if (isDebit(transaction.type)) {
        weeklyData[week].exits += transaction.amount;
      }
    });

    this.transactionData = Object.entries(weeklyData).map(([day, data]) => ({
      day: `Semana ${day}`,
      entries: data.entries,
      exits: data.exits,
    }));
  }

  formatBalance(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  toggleBalance(): void {
    this.showBalance = !this.showBalance;
  }
}