import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-on',
  imports: [
    CommonModule
  ],
  templateUrl: './icon-on.component.html',
  styleUrl: './icon-on.component.scss'
})
export class IconOnComponent {
  @Input() class = '';
}
