import type { Meta, StoryObj } from '@storybook/angular';
import { MenuItemComponent } from '../../../app/shared/components/menu-item/menu-item.component';
import { IconHomeComponent } from '../../../app/shared/assets/icons/icon-home.component';

const meta: Meta<MenuItemComponent> = {
  title: 'Dashboard/Menu/MenuItem',
  component: MenuItemComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    route: { control: 'text' },
    active: { control: 'boolean' },
    iconComponent: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<MenuItemComponent>;

export const Default: Story = {
  args: {
    label: 'Menu Item',
    route: '/home',
    active: false,
    iconComponent: IconHomeComponent,
  },
};

export const Active: Story = {
  args: {
    label: 'Menu Item',
    route: '/home',
    active: true,
    iconComponent: IconHomeComponent,
  },
}; 