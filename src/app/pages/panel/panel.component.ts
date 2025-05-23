import { Component } from '@angular/core';
import { StatementComponent } from '../../shared/components/statement/statement.component';
import { DashboardComponent } from '../../shared/components/dashboard/dashboard.component';
import { TransactionFormComponent } from '../../shared/components/transaction-form/transaction-form.component';
import { AsideComponent } from '../../shared/components/aside/aside.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    StatementComponent,
    DashboardComponent,
    TransactionFormComponent,
    AsideComponent,
    FooterComponent,
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PainelComponent {
  title: string = 'tech-challenge';

  constructor() {}

  ngOnInit(): void {}
}
