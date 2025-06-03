import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { GraficComponent } from './grafic.component';
import { CommonModule } from '@angular/common';

const meta: Meta<GraficComponent> = {
  title: 'Componentes/Grafic',
  component: GraficComponent,
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
    maxChartValue: {
      control: 'number',
      description: 'Valor máximo para o eixo Y do gráfico',
    },
    barMaxHeight: {
      control: 'number',
      description: 'Altura máxima das barras em pixels',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Componente de gráfico simplificado que exibe transações com barras para entradas e saídas.'
      },
    },
  },
};

export default meta;
type Story = StoryObj<GraficComponent>;

export const Default: Story = {
  args: {
    transactionData: [
      { day: 'Seg', entries: 5000, exits: 1500 },
      { day: 'Ter', entries: 3000, exits: 2500 },
      { day: 'Qua', entries: 7000, exits: 1000 },
      { day: 'Qui', entries: 2000, exits: 3000 },
      { day: 'Sex', entries: 4000, exits: 2000 }
    ],
    maxChartValue: 10000,
    barMaxHeight: 170
  },
};

export const HighValues: Story = {
  args: {
    transactionData: [
      { day: 'Seg', entries: 15000, exits: 8000 },
      { day: 'Ter', entries: 12000, exits: 10000 },
      { day: 'Qua', entries: 18000, exits: 5000 },
      { day: 'Qui', entries: 9000, exits: 12000 },
      { day: 'Sex', entries: 14000, exits: 7000 }
    ],
    maxChartValue: 20000,
    barMaxHeight: 170
  },
};

export const LowValues: Story = {
  args: {
    transactionData: [
      { day: 'Seg', entries: 500, exits: 300 },
      { day: 'Ter', entries: 400, exits: 250 },
      { day: 'Qua', entries: 700, exits: 100 },
      { day: 'Qui', entries: 200, exits: 350 },
      { day: 'Sex', entries: 450, exits: 200 }
    ],
    maxChartValue: 1000,
    barMaxHeight: 170
  },
};
