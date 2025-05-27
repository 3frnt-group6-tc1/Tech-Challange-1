import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-darkmode',
  imports: [CommonModule],
  templateUrl: './icon-darkmode.component.html',
  styleUrl: './icon-darkmode.component.scss'
})
export class IconDarkmodeComponent {
  @Input() class = '';
}
