import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text.component.html',
})
export class TextComponent {
  @Input() variant:
    | 'title-bold'
    | 'title-regular'
    | 'subtitle'
    | 'text-regular'
    | 'text-regular-special'
    | 'text-small'
    | 'text-small-bold' = 'text-regular';

  @Input() color: string = 'text-black-900';

  @Input() tag: 'p' | 'h1' | 'h2' | 'span' = 'p';

  get classes(): string {
    const base = 'font-lato leading-[20px]';

    const variants: Record<string, string> = {
      'title-bold': 'text-[24px] font-bold',
      'title-regular': 'text-[24px] font-normal',
      'subtitle': 'text-[20px] font-normal',
      'text-regular': 'text-[16px] font-normal',
      'text-regular-special': 'text-[16px] font-normal',
      'text-small': 'text-[14px] font-normal',
      'text-small-bold': 'text-[14px] font-bold',
    };

    return `${base} ${variants[this.variant]} ${this.color}`;
  }
}
