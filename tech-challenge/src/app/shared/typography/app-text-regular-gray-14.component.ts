import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-text-regular-gray-14',
  imports: [CommonModule],
  templateUrl: './app-text-regular-gray-14.component.html',
  styleUrl: './app-text-regular-gray-14.component.scss'
})
export class AppTextRegularGray14Component {
  @Input() color: string = 'text-black-900';
}
