import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSubtitleComponent } from "../../typography/app-subtitle.component";
import { AppTextRegularComponent } from "../../typography/app-text-regular.component";
import { IconArrowPencilComponent } from "../../assets/icons/icon-arrow-pencil.component";
import { IconBinComponent } from "../../assets/icons/icon-bin.component";
import { IconDollarComponent } from "../../assets/icons/icon-dollar.component";
import { IconArrowDownLeftComponent } from "../../assets/icons/icon-arrow-down-left.component";

export interface StatementItem {
  type: 'deposit' | 'withdraw';
  description: string;
  amount: number;
  date: string;
}

@Component({
  selector: 'app-statement',
  standalone: true,
  imports: [CommonModule, AppSubtitleComponent, AppTextRegularComponent, IconArrowPencilComponent, IconBinComponent, IconDollarComponent, IconArrowDownLeftComponent],
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss'],
})

export class StatementComponent {
  items: StatementItem[] = [
    { type: 'deposit', description: 'Depósito', amount: 100, date: '11/02/2025' },
    { type: 'withdraw', description: 'Saque', amount: 100, date: '11/02/2025' },
    { type: 'deposit', description: 'Depósito', amount: 200, date: '11/02/2025' },
    { type: 'withdraw', description: 'Saque', amount: 200, date: '11/02/2025' },
    { type: 'deposit', description: 'Depósito', amount: 300, date: '11/02/2025' },
    { type: 'withdraw', description: 'Saque', amount: 300, date: '11/02/2025' },
    { type: 'deposit', description: 'Depósito', amount: 400, date: '11/02/2025' },
    { type: 'withdraw', description: 'Saque', amount: 400, date: '11/02/2025' },
    { type: 'deposit', description: 'Depósito', amount: 500, date: '11/02/2025' },
    { type: 'withdraw', description: 'Saque', amount: 500, date: '11/02/2025' },
  ];
}
