import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-hamburger',
  imports: [CommonModule],
  templateUrl: './icon-hamburger.component.html',
  styleUrl: './icon-hamburger.component.scss'
})
export class IconHamburgerComponent {
    @Input() class = '';
}
