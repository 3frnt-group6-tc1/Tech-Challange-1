import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-logo',
  imports: [CommonModule],
  templateUrl: './icon-logo.component.html',
  styleUrl: './icon-logo.component.scss'
})
export class IconLogoComponent {
  @Input() class = '';
}
