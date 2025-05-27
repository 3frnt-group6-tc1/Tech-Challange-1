import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TransactionData {
  day: string;
  entries: number;
  exits: number;
}

@Component({
  selector: 'app-grafic',
  imports: [CommonModule],
  templateUrl: './grafic.component.html',
  styleUrl: './grafic.component.scss',
})

export class GraficComponent {
  @Input() transactionData: TransactionData[] = [];
  @Input() maxChartValue = 20000;
  @Input() barMaxHeight = 170;
}
