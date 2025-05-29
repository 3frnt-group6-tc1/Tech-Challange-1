import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-bell',
  imports: [CommonModule],
  templateUrl: './icon-bell.component.html',
  styleUrl: './icon-bell.component.scss'
})
export class IconBellComponent {
  @Input() class = '';
}
