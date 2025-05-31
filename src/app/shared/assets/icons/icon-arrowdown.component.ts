import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-arrowdown',
  imports: [CommonModule],
  templateUrl: './icon-arrowdown.component.html',
  styleUrl: './icon-arrowdown.component.scss'
})
export class IconArrowdownComponent {
  @Input() class = '';
}
