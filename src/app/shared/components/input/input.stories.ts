import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { InputComponent } from './input.component';
import { CommonModule } from '@angular/common';

const meta: Meta<InputComponent> = {
  title: 'Componentes/Input',
  component: InputComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  argTypes: {
    options: {
      control: 'object',
      description: 'Lista de opções disponíveis no dropdown',
    },
    size: {
      control: 'select',
      options: ['G', 'P'],
      description: 'Tamanho do input',
      table: {
        defaultValue: { summary: 'G' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Texto exibido quando nenhuma opção está selecionada',
      table: {
        defaultValue: { summary: 'Selecione o tipo de transação' },
      },
    },
    selectionChange: {
      action: 'selectionChanged',
      description: 'Evento emitido quando uma opção é selecionada',
    },
  },
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Default: Story = {
  args: {
    options: ['Opção 1', 'Opção 2', 'Opção 3'],
    size: 'G',
    placeholder: 'Selecione uma opção',
  },
};

export const Small: Story = {
  args: {
    options: ['Opção 1', 'Opção 2', 'Opção 3'],
    size: 'P',
    placeholder: 'Selecione uma opção',
  },
};

export const WithObjectOptions: Story = {
  args: {
    options: [
      { display: 'Opção A', value: 'a' },
      { display: 'Opção B', value: 'b' },
      { display: 'Opção C', value: 'c' },
    ],
    size: 'G',
    placeholder: 'Selecione uma opção',
  },
};

export const TransactionType: Story = {
  args: {
    options: ['Receita', 'Despesa', 'Transferência'],
    size: 'G',
    placeholder: 'Selecione o tipo de transação',
  },
};
