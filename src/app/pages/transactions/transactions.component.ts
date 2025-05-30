import { Component } from '@angular/core';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { StatementComponent } from '../../shared/components/statement/statement.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [LayoutComponent, StatementComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {}
