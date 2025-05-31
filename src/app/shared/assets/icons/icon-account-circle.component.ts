import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-account-circle',
  imports: [CommonModule],
  templateUrl: './icon-account-circle.component.html',
  styleUrl: './icon-account-circle.component.scss'
})
export class IconAccountCircleComponent {
  @Input() class = '';
}
