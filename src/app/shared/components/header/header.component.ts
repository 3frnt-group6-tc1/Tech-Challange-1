import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconExitComponent } from '../../assets/icons/icon-exit.component';
import { ButtonComponent } from '../button/button.component';
import { TextComponent } from '../text/text.component';
import { systemConfig } from '../../../app.config';
import { IconHamburgerComponent } from "../../assets/icons/icon-hamburger.component";
import { IconDarkmodeComponent } from "../../assets/icons/icon-darkmode.component";

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    ButtonComponent,
    TextComponent,
    IconExitComponent,
    IconHamburgerComponent,
    IconDarkmodeComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  mobile = false;
  menuOpen = false;

  @ViewChild('menuRef') menuRef?: ElementRef;
  private resizeListener = () => this.checkScreen();
  private clickListener!: (event: MouseEvent) => void;

  ngOnInit() {
    this.checkScreen();
    window.addEventListener('resize', this.resizeListener);

    this.clickListener = this.handleClickOutside.bind(this);
    document.addEventListener('click', this.clickListener, true);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
    document.removeEventListener('click', this.clickListener, true);
    this.enableScroll();
  }

  checkScreen(): void {
    this.mobile = window.innerWidth <= 1024;
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
      this.menuOpen = false;
      this.enableScroll();
    }
  }
}
