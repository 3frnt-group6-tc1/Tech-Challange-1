import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '../../../app/shared/components/button/button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Shared/Buttons/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    theme: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: 'select',
      options: ['P', 'G'],
    },
    disabled: { control: 'boolean' },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    label: 'Button',
    theme: 'primary',
    size: 'G',
    disabled: false,
    iconPosition: 'left',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
    theme: 'secondary',
    size: 'G',
    disabled: false,
    iconPosition: 'left',
  },
};

export const Danger: Story = {
  args: {
    label: 'Button',
    theme: 'danger',
    size: 'G',
    disabled: false,
    iconPosition: 'left',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Button',
    theme: 'primary',
    size: 'G',
    disabled: true,
    iconPosition: 'left',
  },
}; 