import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-youtube',
  imports: [CommonModule],
  templateUrl: './icon-youtube.component.html',
  styleUrl: './icon-youtube.component.scss'
})
export class IconYoutubeComponent {
  @Input() class = '';
}
