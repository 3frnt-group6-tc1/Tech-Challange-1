import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() theme:
    | 'primary'
    | 'secondary'
    | 'outline-cyan-blue'
    | 'ghost-cyan-blue'
    | 'ghost-white' = 'primary';
  @Input() size: 'PP' | 'P' | 'G' | 'GG' = 'G';
  @Input() disabled: boolean = false;
  @Input() label: string = 'Button';
  @Input() iconPosition: 'left' | 'right' = 'left';
}
