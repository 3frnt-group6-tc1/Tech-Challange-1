import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { IconHomeComponent } from '../../assets/icons/icon-home.component';
import { IconDollarComponent } from '../../assets/icons/icon-dollar.component';
import { IconListComponent } from '../../assets/icons/icon-list.component';
import { IconCardComponent } from '../../assets/icons/icon-card.component';
import { IconSettingsComponent } from '../../assets/icons/icon-settings.component';

@Component({
  selector: 'app-aside',
  imports: [MenuItemComponent],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
})
export class AsideComponent {
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
