import { Meta, StoryObj } from '@storybook/angular';
import { LayoutComponent } from './layout.component';

const meta: Meta<LayoutComponent> = {
  title: 'Componentes/Layout',
  component: LayoutComponent,

  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
    viewMode: 'story',
    docsOnly: true,
  },
};

export default meta;
type Story = StoryObj<LayoutComponent>;

// Story vazia
export const Hidden: Story = {
  parameters: {
    docs: {
      disable: true,
    },
  },
};
