import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/Transaction/transaction-service';
import { UserService } from '../../services/User/user-service';
import { TransactionData } from '../../models/transaction-data';
import { GraficComponent } from '../grafic/grafic.component';
import { User } from '../../models/user';
import { Transaction, TransactionType } from '../../models/transaction';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, GraficComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  userName: string = '';
  currentDate: string = '';
  balance: string = '';
  accountType: string = 'Conta Corrente';
  totalEntries: string = '';
  totalExits: string = '';

  idUser: string = '';

  showBalance: boolean = true;
  isLoading: boolean = false;

  transactionData: TransactionData[] = [];

  errorMessage: string = '';

  maxChartValue = 2000;
  barMaxHeight = 170;

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
    this.isLoading = true;
    this.userService.getById('u2').subscribe(
      (response) => this.onUserFetchSuccess(response),
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao buscar usuário.';
        console.error('Error fetching user name:', error);
      }
    );
  }

  onUserFetchSuccess(response: User): void {
    this.isLoading = false;
    this.errorMessage = '';
    this.userName = response.name;
    this.idUser = response.id;
    this.fetchTransactions(this.idUser);
  }

  fetchTransactions(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.transactionService.getByUserId(id).subscribe(
      (response) => this.onTransactionFetchSuccess(response),
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao buscar transações.';
      }
    );
  }

  onTransactionFetchSuccess(response: Transaction[]): void {
    this.isLoading = false;
    this.errorMessage = '';
    const totalEntries = response
      .filter((transaction) => this.isCredit(transaction.type))
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExits = response
      .filter((transaction) => this.isDebit(transaction.type))
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    this.totalEntries = this.formatBalance(totalEntries);
    this.totalExits = this.formatBalance(totalExits);
    this.balance = this.formatBalance(totalEntries - totalExits);

    const grouped = new Map<string, { entries: number; exits: number }>();
    response.forEach((transaction) => {
      const date = new Date(transaction.date);
      const key = `${date.getDate().toString().padStart(2, '0')}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}/${date.getFullYear()}`;
      if (!grouped.has(key)) grouped.set(key, { entries: 0, exits: 0 });
      if (this.isCredit(transaction.type))
        grouped.get(key)!.entries += transaction.amount;
      if (this.isDebit(transaction.type))
        grouped.get(key)!.exits += transaction.amount;
    });
    this.transactionData = Array.from(grouped, ([day, data]) => ({
      day,
      ...data,
    }));
  }

  isCredit(type: TransactionType): boolean {
    return type === 'exchange' || type === 'loan';
  }

  isDebit(type: TransactionType): boolean {
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
