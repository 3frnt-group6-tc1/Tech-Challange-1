import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from '../../../app/shared/components/input/input.component';

const meta: Meta<InputComponent> = {
  title: 'Shared/Inputs/Input',
  component: InputComponent,
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object' },
    size: {
      control: 'select',
      options: ['G', 'P'],
    },
    placeholder: { control: 'text' },
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

export const Empty: Story = {
  args: {
    options: [],
    size: 'G',
    placeholder: 'Nenhuma opção disponível',
  },
}; 