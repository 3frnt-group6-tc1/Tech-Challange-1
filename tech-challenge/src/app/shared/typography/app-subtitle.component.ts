import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-subtitle',
  imports: [CommonModule],
  templateUrl: './app-subtitle.component.html',
  styleUrl: './app-subtitle.component.scss'
})
export class AppSubtitleComponent {
  @Input() color: string = 'text-black-900';
}
