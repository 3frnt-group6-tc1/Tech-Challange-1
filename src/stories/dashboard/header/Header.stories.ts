import type { Meta, StoryObj } from '@storybook/angular';
import { HeaderComponent } from '../../../app/shared/components/header/header.component';

const meta: Meta<HeaderComponent> = {
  title: 'Dashboard/Header/Header',
  component: HeaderComponent,
  tags: ['autodocs'],
  argTypes: {
    isLoggedIn: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
  },
};

export const LoggedOut: Story = {
  args: {
    isLoggedIn: false,
  },
}; 