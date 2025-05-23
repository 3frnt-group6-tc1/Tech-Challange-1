import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-instagram',
  imports: [CommonModule],
  templateUrl: './icon-instagram.component.html',
  styleUrl: './icon-instagram.component.scss'
})
export class IconInstagramComponent {
  @Input() class = '';
}
