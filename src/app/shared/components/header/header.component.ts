import { Component, OnDestroy } from '@angular/core';

import { IconExitComponent } from '../../assets/icons/icon-exit.component';
import { ButtonComponent } from '../button/button.component';
import { TextComponent } from '../text/text.component';
import { systemConfig } from '../../../app.config';
import { IconHamburgerComponent } from '../../assets/icons/icon-hamburger.component';
import { IconDarkmodeComponent } from '../../assets/icons/icon-darkmode.component';

@Component({
  selector: 'app-header',
  imports: [
    ButtonComponent,
    TextComponent,
    IconExitComponent,
    IconHamburgerComponent,
    IconDarkmodeComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {
  isLoggedIn: boolean = false;
  mobile: boolean = false;

  constructor() {
    const path = window.location.pathname;
    this.isLoggedIn = systemConfig.loggedPages.includes(path);
  }

  private resizeListener = () => this.checkScreen();

  ngOnInit() {
    this.checkScreen();
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
  }

  checkScreen(): void {
    const width = window.innerWidth;
    this.mobile = width <= 1024;
  }
}
