import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-title-regular',
  imports: [CommonModule],
  templateUrl: './app-title-regular.component.html',
  styleUrl: './app-title-regular.component.scss'
})
export class AppTitleRegularComponent {
  @Input() color: string = 'text-black-900';
}
