import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ButtonComponent } from '../button/button.component';
import { IconExitComponent } from '../../assets/icons/icon-exit.component';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, ButtonComponent, IconExitComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements AfterViewInit {
  @Input() isLoggedIn: boolean = false;
  @Input() mobile: boolean = false;
  @Input() tablet: boolean = false;
  @Input() menuOpen: boolean = false;
  @Input() menuRef: any;

  @ViewChild('menuRef') menuRefElement!: ElementRef;
 
  @Output() menuRefReady = new EventEmitter<ElementRef>();
  @Output() closeMenu = new EventEmitter<void>();

  constructor(
    private readonly router: Router,
  ) {}

  ngAfterViewInit() {
    if (this.menuRefElement) {
      this.menuRefReady.emit(this.menuRefElement);
    }
  }

  onLinkClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.closeMenu.emit();
  }

  goToPanel(): void {
    this.router.navigate(['/panel']);
  }
}