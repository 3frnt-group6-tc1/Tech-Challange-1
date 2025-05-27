import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-star',
  imports: [
    CommonModule
  ],
  templateUrl: './icon-star.component.html',
  styleUrl: './icon-star.component.scss'
})
export class IconStarComponent {
  @Input() class = '';
}
