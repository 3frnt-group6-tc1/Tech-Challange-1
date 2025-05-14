import { CommonModule } from '@angular/common';
import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [
    CommonModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() options: string[] = [];
  @Input() size: 'G' | 'P' = 'G';
  @Input() placeholder = 'Selecione o tipo de transação';

  isOpen = false;
  selectedOption: string | null = null;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
  }
}
