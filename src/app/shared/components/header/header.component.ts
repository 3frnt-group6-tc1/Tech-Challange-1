import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeService } from '../../services/Theme/theme.service'

import { IconExitComponent } from '../../assets/icons/icon-exit.component';
import { ButtonComponent } from '../button/button.component';
import { TextComponent } from '../text/text.component';
import { systemConfig } from '../../../app.config';
import { IconHamburgerComponent } from "../../assets/icons/icon-hamburger.component";
import { IconDarkmodeComponent } from "../../assets/icons/icon-darkmode.component";
import { IconBellComponent } from "../../assets/icons/icon-bell.component";
import { IconAccountCircleComponent } from "../../assets/icons/icon-account-circle.component";
import { IconLogoComponent } from '../../assets/icons/icon-logo.component';
import { IconArrowdownComponent } from '../../assets/icons/icon-arrowdown.component';
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    TextComponent,
    IconExitComponent,
    IconHamburgerComponent,
    IconDarkmodeComponent,
    IconBellComponent,
    IconAccountCircleComponent,
    IconLogoComponent,
    IconArrowdownComponent,
    MenuComponent
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = true;
  mobile: boolean = false;
  tablet: boolean = false;
  menuOpen: boolean = false;

  constructor(
    public themeService: ThemeService
  ) {
    const path = window.location.pathname;
    this.isLoggedIn = systemConfig.loggedPages.includes(path);
  }

  @ViewChild('menuRef') menuRef?: ElementRef;
  private resizeListener = () => this.checkScreen();
  private clickListener!: (event: MouseEvent) => void;

  ngOnInit() {
    this.checkScreen();
    window.addEventListener('resize', this.resizeListener);

    this.clickListener = this.handleClickOutside.bind(this);
    document.addEventListener('click', this.clickListener, true);

    if (this.menuOpen) {
      document.body.classList.add('overflow-hidden');
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
    document.removeEventListener('click', this.clickListener, true);
    this.enableScroll();
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  checkScreen(): void {
    const width = window.innerWidth;
    this.mobile = width <= 639;
    this.tablet = width >= 640 && width <= 1279;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      this.enableScroll();
    }
  }

  private enableScroll(): void {
    document.body.classList.remove('overflow-hidden');
  }

  private handleClickOutside(event: MouseEvent): void {
    if (!this.menuOpen) return;

    const target = event.target as Node;
    const menuElement = this.menuRef?.nativeElement;

    if (menuElement && !menuElement.contains(target)) {
      this.closeMenu();
    }
  }

  get showLandingMobileMenu(): boolean {
    const condition = !this.isLoggedIn && (this.mobile || this.tablet) && this.menuOpen;

    if (condition) {
      document.body.classList.add('overflow-hidden');
    } else {
      this.enableScroll();
    }

    return condition;
  }

  get showLandingDesktopMenu(): boolean {
    return !this.isLoggedIn && !this.mobile;
  }

  get showLoggedMobileMenu(): boolean {
    return this.isLoggedIn && this.mobile && this.menuOpen;
  }

  get showLoggedTabletMenu(): boolean {
    return this.isLoggedIn && this.tablet;
  }

  setMenuRef(ref: ElementRef): void {
    this.menuRef = ref;
  }

  private closeMenu(): void {
    this.menuOpen = false;
    this.enableScroll();
  }
}
