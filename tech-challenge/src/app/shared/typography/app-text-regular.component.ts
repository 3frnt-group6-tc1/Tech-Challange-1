import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-text-regular',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-text-regular.component.html',
  styleUrl: './app-text-regular.component.scss'
})
export class AppTextRegularComponent {
  @Input() color: string = 'text-black-900';
}
