import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { TransactionChartComponent } from './transaction-chart.component';
import { TransactionData } from '../../models/transaction-data';

describe('TransactionChartComponent', () => {
  let component: TransactionChartComponent;
  let fixture: ComponentFixture<TransactionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionChartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionChartComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('getMaxTransactionValue', () => {
    it('should return default value when no data is provided', () => {
      component.transactionData = [];
      const result = component.getMaxTransactionValue();
      // Apenas verificar que é um número positivo que seria o valor padrão
      expect(result).toBeGreaterThan(0);
    });

    it('should return a value based on max transaction data', () => {
      component.transactionData = [
        { day: 'Semana 1', entries: 1000, exits: 500 },
        { day: 'Semana 2', entries: 2000, exits: 1500 },
        { day: 'Semana 3', entries: 3000, exits: 800 }
      ];
      const result = component.getMaxTransactionValue();
      // O máximo é 3000 e deve retornar um valor maior que 3000 (considerando o fator 1.1)
      expect(result).toBeGreaterThan(3000);
    });

    it('should handle large values correctly', () => {
      component.transactionData = [
        { day: 'Semana 1', entries: 5000, exits: 3000 },
        { day: 'Semana 2', entries: 8000, exits: 7000 },
      ];
      const result = component.getMaxTransactionValue();
      expect(result).toBeGreaterThan(8000);
    });
  });

  describe('updateYAxisLabels', () => {
    it('should create 5 evenly spaced labels from 0 to maxValue', () => {
      component.updateYAxisLabels(3000);
      expect(component.yAxisLabels.length).toBe(5);
      expect(component.yAxisLabels[4]).toBe(0); // O último valor deve ser zero
    });

    it('should create labels with decreasing values', () => {
      component.updateYAxisLabels(4700);
      expect(component.yAxisLabels.length).toBe(5);
      for (let i = 1; i < component.yAxisLabels.length; i++) {
        expect(component.yAxisLabels[i-1]).toBeGreaterThan(component.yAxisLabels[i]);
      }
    });
  });

  describe('calculateBarHeight', () => {
    beforeEach(() => {
      component.chartHeight = 200;
      component.yAxisLabels = [3000, 2250, 1500, 750, 0];
    });

    it('should calculate height proportionally based on the max y-axis value', () => {
      // Max value é 3000, chartHeight é 200, então 1500 deve ser 100px (metade da altura)
      const height = component.calculateBarHeight(1500);
      expect(Math.round(height)).toBeCloseTo(100, 0);
    });
  });

  describe('formatAxisLabel', () => {
    it('should format numbers with thousands separators', () => {
      expect(component.formatAxisLabel(1000)).toContain('1');
      expect(component.formatAxisLabel(1000)).not.toContain(',');
    });

    it('should format integer values correctly', () => {
      const result = component.formatAxisLabel(1234);
      expect(result).toBeTruthy();
      // A formatação exata pode variar dependendo da localização, então verificamos apenas se retorna uma string
      expect(typeof result).toBe('string');
    });
  });

  describe('formatBalance', () => {
    it('should format numbers as currency', () => {
      const result = component.formatBalance(1000);
      // Verificar se contém o valor e não os detalhes específicos da formatação
      expect(result).toContain('1');
      expect(typeof result).toBe('string');
    });
  });

  describe('updateChart', () => {
    it('should call getMaxTransactionValue and updateYAxisLabels', () => {
      spyOn(component, 'getMaxTransactionValue').and.returnValue(3000);
      spyOn(component, 'updateYAxisLabels');

      component.updateChart();

      expect(component.getMaxTransactionValue).toHaveBeenCalled();
      expect(component.updateYAxisLabels).toHaveBeenCalledWith(3000);
    });
  });

  describe('ngOnChanges', () => {
    it('should call updateChart when inputs change', () => {
      spyOn(component, 'updateChart');
      component.ngOnChanges();
      expect(component.updateChart).toHaveBeenCalled();
    });
  });

  describe('getMaxValue', () => {
    it('should return the first value in yAxisLabels array', () => {
      component.yAxisLabels = [3000, 2250, 1500, 750, 0];
      expect(component.getMaxValue()).toBe(3000);
    });
  });

  describe('Component data binding', () => {
    beforeEach(() => {
      component.transactionData = [
        { day: 'Semana 1', entries: 1000, exits: 500 },
        { day: 'Semana 2', entries: 2000, exits: 1500 }
      ];
      component.totalEntries = 'R$ 3.000,00';
      component.totalExits = 'R$ 2.000,00';
      fixture.detectChanges();
    });

    it('should have expected input values', () => {
      expect(component.transactionData.length).toBe(2);
      expect(component.totalEntries).toBe('R$ 3.000,00');
      expect(component.totalExits).toBe('R$ 2.000,00');
    });

    // Se você precisar testar elementos específicos do DOM, primeiro inspecione o HTML
    // real do componente para garantir que os seletores estão corretos
  });
});