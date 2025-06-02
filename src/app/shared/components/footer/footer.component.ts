import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { systemConfig } from '../../../app.config';

import { TextComponent } from '../text/text.component';
import { IconWhatsappComponent } from '../../assets/icons/icon-whatsapp.component';
import { IconInstagramComponent } from '../../assets/icons/icon-instagram.component';
import { IconYoutubeComponent } from '../../assets/icons/icon-youtube.component';
import { IconLogoComponent } from '../../assets/icons/icon-logo.component';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    TextComponent,
    IconWhatsappComponent,
    IconInstagramComponent,
    IconYoutubeComponent,
    IconLogoComponent,
    ButtonComponent
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  company: string = systemConfig.company;
  version: string = systemConfig.version;
  year: number = systemConfig.year;
  private routerEventsSubscription: any;

  constructor(private readonly router: Router) {
    this.updateLoginState(this.router.url);
  }

  ngOnInit(): void {
    this.routerEventsSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateLoginState(event.urlAfterRedirects);
      });
  }

  ngOnDestroy(): void {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
  }

  private updateLoginState(url: string) {
    this.isLoggedIn = systemConfig.loggedPages.includes(url);
  }
}
