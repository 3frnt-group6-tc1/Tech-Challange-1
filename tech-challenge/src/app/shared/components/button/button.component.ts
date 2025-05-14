import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [
    CommonModule
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() theme: string = 'primary'; // Ipções aceitas: primary, secondary, danger
  // @Input() size: string = 'G'; // Opções aceitas: P,M,G
  @Input() size: 'P' | 'G' = 'G'; // valor padrão
  @Input() disabled: boolean = false;
  @Input() label: string = 'Button';
}
