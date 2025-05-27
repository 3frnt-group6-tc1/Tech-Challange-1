import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-whatsapp',
  imports: [CommonModule],
  templateUrl: './icon-whatsapp.component.html',
  styleUrl: './icon-whatsapp.component.scss'
})
export class IconWhatsappComponent {
  @Input() class = '';
}
