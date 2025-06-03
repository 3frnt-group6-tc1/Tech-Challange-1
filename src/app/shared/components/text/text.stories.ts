import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TextComponent } from './text.component';
import { CommonModule } from '@angular/common';

const meta: Meta<TextComponent> = {
  title: 'Componentes/Text',
  component: TextComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
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
      description: 'Variante do texto que define o tamanho e peso da fonte',
      table: {
        defaultValue: { summary: 'text-regular' },
      },
    },
    color: {
      control: 'text',
      description: 'Classe CSS para a cor do texto (classes do Tailwind)',
      table: {
        defaultValue: { summary: 'text-white' },
      },
    },
    tag: {
      control: 'select',
      options: ['p', 'h1', 'h2', 'span'],
      description: 'Tag HTML a ser usada para renderizar o texto',
      table: {
        defaultValue: { summary: 'p' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Componente de texto com diferentes variantes, cores e tags HTML.'
      },
    },
  },
};

export default meta;
type Story = StoryObj<TextComponent>;

export const TitleBold: Story = {
  args: {
    variant: 'title-bold',
    color: 'text-cyan-blue-500 dark:text-blue-violet-500',
    tag: 'h1',
  },
  render: (args) => ({
    props: args,
    template: `<app-text [variant]="variant" [color]="color" [tag]="tag">Título em Negrito</app-text>`,
  }),
};

export const TitleRegular: Story = {
  args: {
    variant: 'title-regular',
    color: 'text-cyan-blue-500 dark:text-blue-violet-500',
    tag: 'h1',
  },
  render: (args) => ({
    props: args,
    template: `<app-text [variant]="variant" [color]="color" [tag]="tag">Título Regular</app-text>`,
  }),
};

export const Subtitle: Story = {
  args: {
    variant: 'subtitle',
    color: 'text-cyan-blue-500 dark:text-blue-violet-500',
    tag: 'h2',
  },
  render: (args) => ({
    props: args,
    template: `<app-text [variant]="variant" [color]="color" [tag]="tag">Subtítulo</app-text>`,
  }),
};

export const TextRegular: Story = {
  args: {
    variant: 'text-regular',
    color: 'text-gray-800 dark:text-gray-200',
    tag: 'p',
  },
  render: (args) => ({
    props: args,
    template: `<app-text [variant]="variant" [color]="color" [tag]="tag">Texto Regular</app-text>`,
  }),
};

export const TextRegularSpecial: Story = {
  args: {
    variant: 'text-regular-special',
    color: 'text-gray-800 dark:text-gray-200',
    tag: 'p',
  },
  render: (args) => ({
    props: args,
    template: `<app-text [variant]="variant" [color]="color" [tag]="tag">Texto Regular Especial</app-text>`,
  }),
};

export const TextSmall: Story = {
  args: {
    variant: 'text-small',
    color: 'text-gray-600 dark:text-gray-400',
    tag: 'p',
  },
  render: (args) => ({
    props: args,
    template: `<app-text [variant]="variant" [color]="color" [tag]="tag">Texto Pequeno</app-text>`,
  }),
};

export const TextSmallBold: Story = {
  args: {
    variant: 'text-small-bold',
    color: 'text-gray-600 dark:text-gray-400',
    tag: 'p',
  },
  render: (args) => ({
    props: args,
    template: `<app-text [variant]="variant" [color]="color" [tag]="tag">Texto Pequeno em Negrito</app-text>`,
  }),
};

export const SpanText: Story = {
  args: {
    variant: 'text-regular',
    color: 'text-gray-800 dark:text-gray-200',
    tag: 'span',
  },
  render: (args) => ({
    props: args,
    template: `<app-text [variant]="variant" [color]="color" [tag]="tag">Texto em Span</app-text>`,
  }),
};
