import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnInit, OnDestroy, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { ThemeService } from '../../services/Theme/theme.service';

import { ButtonComponent } from '../button/button.component';
import { IconExitComponent } from '../../assets/icons/icon-exit.component';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, ButtonComponent, IconExitComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input() isLoggedIn: boolean = false;
  @Input() mobile: boolean = false;
  @Input() tablet: boolean = false;
  @Input() menuOpen: boolean = false;
  @Input() menuRef: any;

  @ViewChild('menuRef') menuRefElement!: ElementRef;
 
  @Output() menuRefReady = new EventEmitter<ElementRef>();
  @Output() closeMenu = new EventEmitter<void>();

  private routerSub: Subscription | undefined;

  constructor(
    private readonly router: Router,
    public readonly themeService: ThemeService,
    private cdr: ChangeDetectorRef
  ) {}

    ngOnInit() {
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Força re-render ao mudar rota
        this.cdr.markForCheck();
      }
    });
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }


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

  goToTransactions(): void {
    this.router.navigate(['/transactions']);
  }

  goToCards(): void {
    this.router.navigate(['/cards']);
  }

  goToConfiguration(): void {
    this.router.navigate(['/configurations']);
  }

  // isActive(path: string): boolean {
  //   const result = this.router.url.startsWith(path);
  //   return result;
  // }

  isActive(path: string): boolean {
    // Remove query params e fragment
    const cleanUrl = this.router.url.split('?')[0].split('#')[0];
    return cleanUrl === path || cleanUrl.startsWith(path + '/');
  }

  get themeButton(): string {
    return this.themeService.isDarkMode() ? 'ghost-white' : 'outline-cyan-blue';
  }
}