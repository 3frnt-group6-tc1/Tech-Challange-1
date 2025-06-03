import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UnderConstructionComponent } from './under-construction.component';
import { TextComponent } from '../text/text.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-icon-under-construction',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"></rect>
      <path d="M12 12h.01"></path>
      <path d="M17 12h.01"></path>
      <path d="M7 12h.01"></path>
      <path d="M2 10h20"></path>
      <path d="M2 14h20"></path>
      <path d="M6 18v2"></path>
      <path d="M18 18v2"></path>
      <path d="M10 18v2"></path>
      <path d="M14 18v2"></path>
    </svg>
  `,
  standalone: true
})
class MockIconUnderConstructionComponent {}

const meta: Meta<UnderConstructionComponent> = {
  title: 'Componentes/UnderConstruction',
  component: UnderConstructionComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        TextComponent,
        MockIconUnderConstructionComponent
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: 'Componente que exibe uma mensagem de página em construção, utilizado para páginas que ainda estão sendo desenvolvidas.'
      },
    },
  },
};

export default meta;
type Story = StoryObj<UnderConstructionComponent>;

export const Default: Story = {
  args: {}
};
