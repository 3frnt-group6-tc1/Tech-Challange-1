import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-app-text-regular-gray',
  imports: [CommonModule],
  templateUrl: './app-text-regular-gray.component.html',
  styleUrl: './app-text-regular-gray.component.scss'
})
export class AppTextRegularGrayComponent {
  @Input() color: string = 'text-black-900';
}
