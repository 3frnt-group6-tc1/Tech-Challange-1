import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-under-construction',
  imports: [CommonModule],
  templateUrl: './icon-under-construction.component.html',
  styleUrl: './icon-under-construction.component.scss',
})
export class IconUnderConstructionComponent {
  @Input() class = '';
}
