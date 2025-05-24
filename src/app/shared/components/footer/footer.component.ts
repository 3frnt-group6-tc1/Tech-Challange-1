import { Component } from '@angular/core';
<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { TextComponent } from "../text/text.component";
import { IconWhatsappComponent } from "../../assets/icons/icon-whatsapp.component";
import { IconInstagramComponent } from "../../assets/icons/icon-instagram.component";
import { IconYoutubeComponent } from "../../assets/icons/icon-youtube.component";
import { IconLogoComponent } from "../../assets/icons/icon-logo.component";

@Component({
  selector: 'app-footer',
  imports: [CommonModule, TextComponent, IconWhatsappComponent, IconInstagramComponent, IconYoutubeComponent, IconLogoComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  isLoggedIn: boolean = true; // Validação para saber se o Header e da LandingPage ou da Area Logada
=======
import { TextComponent } from '../text/text.component';
import { apiConfig, systemConfig } from '../../../app.config';

@Component({
  selector: 'app-footer',
  imports: [TextComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  company: string = systemConfig.company;
  version: string = systemConfig.version;
  year: number = systemConfig.year;
>>>>>>> origin
}
