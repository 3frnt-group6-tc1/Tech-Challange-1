import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/Transaction/transaction-service';
import { UserService } from '../../services/User/user-service';
import { Transaction } from '../../models/transaction';
import { systemConfig } from '../../../app.config';
import { TransactionData } from '../../models/transaction-data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  userId: string = systemConfig.userId;
  userName: string = '';
  currentDate: string = '';
  balance: string = '';
  accountType: string = 'Conta Corrente';
  totalEntries: string = '';
  totalExits: string = '';
  idUser: string = '';

  showBalance: boolean = true;

  transactionData: TransactionData[] = [];

  errorMessage: string = '';

  constructor(
    private transactionService: TransactionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.setCurrentDate();
    this.fetchUser();
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
    const today = new Date();
    const weekDay = weekDays[today.getDay()];
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const hour = String(today.getHours()).padStart(2, '0');
    const minute = String(today.getMinutes()).padStart(2, '0');
    this.currentDate = `${weekDay}, ${day}/${month}/${year} ${hour}:${minute}`;
  }

  fetchUser(): void {
    this.userService.getById(systemConfig.userId).subscribe(
      (response) => this.successUser(response),
      (error) => {
        this.errorMessage = 'Erro ao buscar usuário.';
        console.error('Error fetching user name:', error);
      }
    );
  }

  successUser(response: any): void {
    this.errorMessage = '';
    this.userName = response.name;
    this.idUser = response.id;
    this.fetchTransactions(this.idUser);
  }

  fetchTransactions(id: string): void {
    this.transactionService.getByUserId(id).subscribe(
      (response) => this.successTransaction(response),
      (error) => {
        this.errorMessage = 'Erro ao buscar transações.';
        console.error('Error fetching transactions:', error);
      }
    );
  }

  successTransaction(response: Transaction[]): void {
    let totalEntries = 0;
    let totalExits = 0;

    response.forEach((transaction) => {
      if (this.isCredit(transaction.type)) {
        totalEntries += transaction.amount;
      }
      if (this.isDebit(transaction.type)) {
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

    response.forEach((transaction) => {
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

      if (this.isCredit(transaction.type)) {
        weeklyData[week].entries += transaction.amount;
      }
      if (this.isDebit(transaction.type)) {
        weeklyData[week].exits += transaction.amount;
      }
    });

    this.transactionData = Object.entries(weeklyData).map(([day, data]) => ({
      day: `Semana ${day}`,
      entries: data.entries,
      exits: data.exits,
    }));

  }

  isCredit(type: string): boolean {
    return type === 'exchange' || type === 'loan';
  }

  isDebit(type: string): boolean {
    return type === 'transfer';
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