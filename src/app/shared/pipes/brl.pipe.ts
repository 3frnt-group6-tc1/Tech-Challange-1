import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brl',
  standalone: true
})
export class BrlPipe implements PipeTransform {
  transform(value: number | string): string {
    const number = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(number)) return 'R$ 0,00';

    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
