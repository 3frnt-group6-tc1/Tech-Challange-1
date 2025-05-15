import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonComponent } from './shared/components/button/button.component';
import { InputComponent } from './shared/components/input/input.component';

import { AppTitleComponent } from './shared/typography/app-title.component';
import { AppTitleRegularComponent } from './shared/typography/app-title-regular.component';
import { AppSubtitleComponent } from './shared/typography/app-subtitle.component';
import { AppTextRegularComponent } from './shared/typography/app-text-regular.component';
import { AppTextRegularGrayComponent } from './shared/typography/app-text-regular-gray.component';
import { AppTextRegularGray14Component } from './shared/typography/app-text-regular-gray-14.component';
import { AppTextBoldComponent } from './shared/typography/app-text-bold.component';
import { MenuItemComponent } from './shared/components/menu-item/menu-item.component';

import { IconHomeComponent } from './shared/assets/icons/icon-home.component';
import { IconDollarComponent } from './shared/assets/icons/icon-dollar.component';
import { IconListComponent } from './shared/assets/icons/icon-list.component';
import { IconCardComponent } from './shared/assets/icons/icon-card.component';
import { IconSettingsComponent } from './shared/assets/icons/icon-settings.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    MenuItemComponent,

    AppTitleComponent,
    AppTitleRegularComponent,
    AppSubtitleComponent,
    AppTextRegularComponent,
    AppTextRegularGrayComponent,
    AppTextRegularGray14Component,
    AppTextBoldComponent,

    IconHomeComponent,
    IconDollarComponent,
    IconListComponent,
    IconCardComponent,
    IconSettingsComponent
  ]
})
export class AppComponent {
  title: string = 'tech-challenge';
  currentRoute: string = '/inicio';
  
  iconHome = IconHomeComponent;
  iconDollar = IconDollarComponent;
  iconList = IconListComponent;
  iconCard = IconCardComponent;
  iconSettings = IconSettingsComponent;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }
}