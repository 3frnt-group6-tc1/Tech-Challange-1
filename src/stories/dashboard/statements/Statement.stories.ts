import type { Meta, StoryObj } from '@storybook/angular';
import { StatementComponent, StatementItem } from '../../../app/shared/components/statement/statement.component';

const meta: Meta<StatementComponent> = {
  title: 'Dashboard/Statements/Statement',
  component: StatementComponent,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<StatementComponent>;

const sampleItems: StatementItem[] = [
  { type: 'deposit', description: 'Depósito', amount: 100, date: '11/02/2025' },
  { type: 'withdraw', description: 'Saque', amount: 100, date: '11/02/2025' },
  { type: 'deposit', description: 'Depósito', amount: 200, date: '11/02/2025' },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
}; 