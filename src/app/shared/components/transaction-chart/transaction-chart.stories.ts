import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TransactionChartComponent } from './transaction-chart.component';
import { CommonModule } from '@angular/common';

const meta: Meta<TransactionChartComponent> = {
  title: 'Componentes/TransactionChart',
  component: TransactionChartComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule]
    })
  ],
  argTypes: {
    transactionData: {
      control: 'object',
      description: 'Dados de transações para exibição no gráfico',
    },
    totalEntries: {
      control: 'text',
      description: 'Total de entradas formatado',
    },
    totalExits: {
      control: 'text',
      description: 'Total de saídas formatado',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Componente de gráfico que exibe as transações por semana, mostrando entradas e saídas.'
      },
    },
  },
};

export default meta;
type Story = StoryObj<TransactionChartComponent>;

export const Default: Story = {
  args: {
    transactionData: [
      { day: 'Semana 1', entries: 5000, exits: 1500 },
      { day: 'Semana 2', entries: 0, exits: 500 },
      { day: 'Semana 3', entries: 2000, exits: 0 },
      { day: 'Semana 4', entries: 0, exits: 0 }
    ],
    totalEntries: 'R$ 7.000,00',
    totalExits: 'R$ 2.000,00'
  },
};

export const HighValues: Story = {
  args: {
    transactionData: [
      { day: 'Semana 1', entries: 12000, exits: 3000 },
      { day: 'Semana 2', entries: 5000, exits: 8000 },
      { day: 'Semana 3', entries: 7500, exits: 4500 },
      { day: 'Semana 4', entries: 10000, exits: 6000 }
    ],
    totalEntries: 'R$ 34.500,00',
    totalExits: 'R$ 21.500,00'
  },
};

export const LowValues: Story = {
  args: {
    transactionData: [
      { day: 'Semana 1', entries: 100, exits: 50 },
      { day: 'Semana 2', entries: 75, exits: 125 },
      { day: 'Semana 3', entries: 200, exits: 150 },
      { day: 'Semana 4', entries: 150, exits: 100 }
    ],
    totalEntries: 'R$ 525,00',
    totalExits: 'R$ 425,00'
  },
};

export const NoTransactions: Story = {
  args: {
    transactionData: [
      { day: 'Semana 1', entries: 0, exits: 0 },
      { day: 'Semana 2', entries: 0, exits: 0 },
      { day: 'Semana 3', entries: 0, exits: 0 },
      { day: 'Semana 4', entries: 0, exits: 0 }
    ],
    totalEntries: 'R$ 0,00',
    totalExits: 'R$ 0,00'
  },
};
