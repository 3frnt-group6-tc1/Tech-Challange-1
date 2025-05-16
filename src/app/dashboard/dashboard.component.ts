import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TransactionData {
  day: number;
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
  currentDate: string = 'Quarta-feira, 07/05/2025';
  balance: string = 'R$ 2.500,00';
  accountType: string = 'Conta Corrente';
  totalEntries: string = 'R$ 2.512,50';
  totalExits: string = 'R$ 212,34';

  showBalance: boolean = true;

  // Dados mockados para o gráfico
  transactionData: TransactionData[] = [
    { day: 0, entries: 850, exits: 1500 },
    { day: 1, entries: 800, exits: 1900 },
    { day: 2, entries: 1650, exits: 400 },
    { day: 3, entries: 500, exits: 500 },
    { day: 4, entries: 1550, exits: 700 },
  ];

  toggleBalance(): void {
    this.showBalance = !this.showBalance;
  }
}