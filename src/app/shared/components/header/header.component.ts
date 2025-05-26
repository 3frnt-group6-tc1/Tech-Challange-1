import { Component } from '@angular/core';

import { IconExitComponent } from '../../assets/icons/icon-exit.component'
import { ButtonComponent } from '../button/button.component'
import { TextComponent } from '../text/text.component'

@Component({
  selector: 'app-header',
  imports: [
    ButtonComponent,
    TextComponent,
    IconExitComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn: boolean = true; // Validação para saber se o Header e da LandingPage ou da Area Logada
}
