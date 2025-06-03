import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { CommonModule } from '@angular/common';

const meta: Meta<ButtonComponent> = {
  title: 'Componentes/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  argTypes: {
    theme: {
      control: 'select',
      options: ['primary', 'secondary', 'outline-cyan-blue', 'ghost-cyan-blue', 'ghost-white'],
      description: 'Tema do botão que define suas cores e estilos',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['P', 'G', 'GG'],
      description: 'Tamanho do botão',
      table: {
        defaultValue: { summary: 'G' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Define se o botão está desabilitado',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Texto do botão',
      table: {
        defaultValue: { summary: 'Button' },
      },
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Posição do ícone em relação ao texto',
      table: {
        defaultValue: { summary: 'left' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    theme: 'primary',
    size: 'G',
    label: 'Botão Primário',
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    theme: 'secondary',
    size: 'G',
    label: 'Botão Secundário',
    disabled: false,
  },
};

export const OutlineCyanBlue: Story = {
  args: {
    theme: 'outline-cyan-blue',
    size: 'G',
    label: 'Botão Outline',
    disabled: false,
  },
};

export const GhostCyanBlue: Story = {
  args: {
    theme: 'ghost-cyan-blue',
    size: 'G',
    label: 'Botão Ghost Cyan',
    disabled: false,
  },
};

export const GhostWhite: Story = {
  args: {
    theme: 'ghost-white',
    size: 'G',
    label: 'Botão Ghost White',
    disabled: false,
  },
};

export const Small: Story = {
  args: {
    theme: 'primary',
    size: 'P',
    label: 'Botão Pequeno',
    disabled: false,
  },
};

export const Large: Story = {
  args: {
    theme: 'primary',
    size: 'G',
    label: 'Botão Grande',
    disabled: false,
  },
};

export const ExtraLarge: Story = {
  args: {
    theme: 'primary',
    size: 'GG',
    label: 'Botão Extra Grande',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    theme: 'primary',
    size: 'G',
    label: 'Botão Desabilitado',
    disabled: true,
  },
};
