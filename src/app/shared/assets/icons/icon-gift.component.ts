import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-gift',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './icon-gift.component.html',
})
export class IconGiftComponent {
  @Input() class = '';
}
