import { Component } from '@angular/core';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { DashboardComponent } from '../../shared/components/dashboard/dashboard.component';
import { StatementComponent } from '../../shared/components/statement/statement.component';
import { NewTransactionComponent } from '../../shared/components/new-transaction/new-transaction.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    LayoutComponent,
    DashboardComponent,
    StatementComponent,
    NewTransactionComponent,
],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PainelComponent {
  title: string = 'tech-challenge';

  constructor() {}

  ngOnInit(): void {}
}
