import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-title',
  imports: [CommonModule],
  templateUrl: './app-title.component.html',
  styleUrl: './app-title.component.scss'
})
export class AppTitleComponent {
  @Input() color: string = 'text-black-900';
}
