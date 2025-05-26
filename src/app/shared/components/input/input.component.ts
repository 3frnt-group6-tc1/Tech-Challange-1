// input.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

interface OptionItem {
  display: string;
  value: any;
}

@Component({
  selector: 'app-input',
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() options: (string | OptionItem)[] = [];
  @Input() size: 'G' | 'P' = 'G';
  @Input() placeholder = 'Selecione o tipo de transação';
  @Output() selectionChange = new EventEmitter<any>();

  isOpen = false;
  selectedOption: string | null = null;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string | OptionItem) {
    this.selectedOption = typeof option === 'string' ? option : option.display;
    this.isOpen = false;
    this.selectionChange.emit(typeof option === 'string' ? option : option.value);
  }

  getDisplayValue(option: string | OptionItem): string {
    return typeof option === 'string' ? option : option.display;
  }
}