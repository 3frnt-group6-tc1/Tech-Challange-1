import type { Meta, StoryObj } from '@storybook/angular';
import { TextComponent } from '../../../app/shared/components/text/text.component';

const meta: Meta<TextComponent> = {
  title: 'Shared/Text/Text',
  component: TextComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'title-bold',
        'title-regular',
        'subtitle',
        'text-regular',
        'text-regular-special',
        'text-small',
        'text-small-bold'
      ],
    },
    color: {
      control: 'select',
      options: ['text-black-900', 'text-primary', 'text-secondary', 'text-danger', 'text-success', 'text-warning'],
    },
    tag: {
      control: 'select',
      options: ['p', 'h1', 'h2', 'span'],
    },
  },
};

export default meta;
type Story = StoryObj<TextComponent>;

export const TitleBold: Story = {
  args: {
    variant: 'title-bold',
    color: 'text-black-900',
    tag: 'h1',
  },
};

export const Subtitle: Story = {
  args: {
    variant: 'subtitle',
    color: 'text-primary',
    tag: 'h2',
  },
};

export const RegularText: Story = {
  args: {
    variant: 'text-regular',
    color: 'text-black-900',
    tag: 'p',
  },
};

export const SmallText: Story = {
  args: {
    variant: 'text-small',
    color: 'text-secondary',
    tag: 'span',
  },
}; 