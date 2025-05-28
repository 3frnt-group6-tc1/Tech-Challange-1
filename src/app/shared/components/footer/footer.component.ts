import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
export class FooterComponent {
  isLoggedIn: boolean = false;
  company: string = systemConfig.company;
  version: string = systemConfig.version;
  year: number = systemConfig.year;

  constructor() {
    const path = window.location.pathname;
    this.isLoggedIn = systemConfig.loggedPages.includes(path);
  }
}
