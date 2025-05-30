import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { IconExitComponent } from '../../assets/icons/icon-exit.component';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, ButtonComponent, IconExitComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Input() isLoggedIn: boolean = false;
  @Input() mobile: boolean = false;
  @Input() tablet: boolean = false;
  @Input() menuOpen: boolean = false;
  @Input() menuRef: any;
}