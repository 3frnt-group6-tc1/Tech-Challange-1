import { Component } from '@angular/core';
import { MenuItemComponent } from '../../shared/components/menu-item/menu-item.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { StatementComponent } from '../../shared/components/statement/statement.component';
import { IconCardComponent } from '../../shared/assets/icons/icon-card.component';
import { IconDollarComponent } from '../../shared/assets/icons/icon-dollar.component';
import { IconHomeComponent } from '../../shared/assets/icons/icon-home.component';
import { IconListComponent } from '../../shared/assets/icons/icon-list.component';
import { IconSettingsComponent } from '../../shared/assets/icons/icon-settings.component';
import { Router } from '@angular/router';
import { DashboardComponent } from '../../shared/components/dashboard/dashboard.component';
import { NewTransactionComponent } from "../../shared/components/new-transaction/new-transaction.component";

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    MenuItemComponent,
    StatementComponent,
    DashboardComponent,
    NewTransactionComponent
],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PainelComponent {
  title: string = 'tech-challenge';
  currentRoute: string = '/inicio';

  iconHome: any = IconHomeComponent;
  iconDollar: any = IconDollarComponent;
  iconList: any = IconListComponent;
  iconCard: any = IconCardComponent;
  iconSettings: any = IconSettingsComponent;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }
}
