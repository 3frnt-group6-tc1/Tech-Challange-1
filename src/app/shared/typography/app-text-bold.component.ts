import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-text-bold',
  imports: [CommonModule],
  templateUrl: './app-text-bold.component.html',
  styleUrl: './app-text-bold.component.scss'
})
export class AppTextBoldComponent {
  @Input() color: string = 'text-black-900';
}
