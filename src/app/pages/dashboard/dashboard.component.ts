import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../shared/services/Transaction/transaction-service';
import { UserService } from '../../shared/services/User/user-service';
import { Transaction } from '../../shared/models/transaction';

interface TransactionData {
  day: string;
  entries: number;
  exits: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  userName: string = 'Fulano';
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
    this.userService.getById('u1').subscribe(
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

    const grouped: { [key: string]: { entries: number; exits: number } } = {};
    response.forEach((transaction) => {
      const date = new Date(transaction.date);
      const key = `${date.getDate().toString().padStart(2, '0')}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}/${date.getFullYear()}`;
      if (!grouped[key]) grouped[key] = { entries: 0, exits: 0 };
      if (this.isCredit(transaction.type))
        grouped[key].entries += transaction.amount;
      if (this.isDebit(transaction.type))
        grouped[key].exits += transaction.amount;
    });
    this.transactionData = Object.entries(grouped).map(([day, data]) => ({
      day,
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
