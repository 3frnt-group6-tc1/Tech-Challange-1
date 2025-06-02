import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionData } from '../../models/transaction-data';

@Component({
  selector: 'app-transaction-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-chart.component.html',
  styleUrls: ['./transaction-chart.component.scss']
})
export class TransactionChartComponent implements OnInit {
  @Input() transactionData: TransactionData[] = [];
  @Input() totalEntries: string = '';
  @Input() totalExits: string = '';

  @ViewChild('chartContainer') chartContainer: ElementRef | undefined;
  chartHeight: number = 192;
  yAxisLabels: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }

  updateChart(): void {
    const maxValue = this.getMaxTransactionValue();
    this.updateYAxisLabels(maxValue);
  }

  getMaxTransactionValue(): number {
    let maxValue = 500;
    for (const data of this.transactionData) {
      if (data.entries > maxValue) maxValue = data.entries;
      if (data.exits > maxValue) maxValue = data.exits;
    }
    maxValue = maxValue * 1.1;
    return Math.ceil(maxValue / 750) * 750;
  }

  updateYAxisLabels(maxValue: number): void {
    const roundedMax = Math.ceil(maxValue / 750) * 750;

    this.yAxisLabels = [];
    const step = roundedMax / 4;
    for (let i = 4; i >= 0; i--) {
      this.yAxisLabels.push(i * step);
    }
  }

  getMaxValue(): number {
    return this.yAxisLabels[0];
  }

  calculateBarHeight(value: number): number {
    const maxYAxisValue = this.yAxisLabels[0];
    if (maxYAxisValue === 0) return 0;
    const proportion = value / maxYAxisValue;
    const height = proportion * this.chartHeight;
    return height;
  }

  formatAxisLabel(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'decimal',
      maximumFractionDigits: 0
    });
  }

  formatBalance(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}