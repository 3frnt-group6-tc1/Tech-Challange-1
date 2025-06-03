import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FooterComponent } from './footer.component';
import { CommonModule } from '@angular/common';
import { TextComponent } from '../text/text.component';
import { ButtonComponent } from '../button/button.component';
import { Component } from '@angular/core';
import { of } from 'rxjs';

// Mock do Router
class Router {
  url = '/';
  events = of({});
  navigate() {}
}

// Mock dos componentes de ícones
@Component({
  selector: 'app-icon-logo',
  template: '<div class="w-8 h-8 bg-blue-500">Logo</div>',
  standalone: true
})
class MockIconLogoComponent {}

@Component({
  selector: 'app-icon-whatsapp',
  template: '<div class="w-4 h-4 bg-green-500">WhatsApp</div>',
  standalone: true
})
class MockIconWhatsappComponent {}

@Component({
  selector: 'app-icon-instagram',
  template: '<div class="w-4 h-4 bg-pink-500">Instagram</div>',
  standalone: true
})
class MockIconInstagramComponent {}

@Component({
  selector: 'app-icon-youtube',
  template: '<div class="w-4 h-4 bg-red-500">YouTube</div>',
  standalone: true
})
class MockIconYoutubeComponent {}

const meta: Meta<FooterComponent> = {
  title: 'Componentes/Footer',
  component: FooterComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        TextComponent,
        ButtonComponent,
        MockIconLogoComponent,
        MockIconWhatsappComponent,
        MockIconInstagramComponent,
        MockIconYoutubeComponent
      ],
      providers: [
        { provide: Router, useValue: new Router() }
      ]
    })
  ],
  argTypes: {
    isLoggedIn: {
      control: 'boolean',
      description: 'Define se o usuário está logado ou não',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    company: {
      control: 'text',
      description: 'Nome da empresa',
      table: {
        defaultValue: { summary: 'ByteBank' },
      },
    },
    version: {
      control: 'text',
      description: 'Versão da aplicação',
      table: {
        defaultValue: { summary: '1.0.0' },
      },
    },
    year: {
      control: 'number',
      description: 'Ano atual para o copyright',
      table: {
        defaultValue: { summary: '2025' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Componente de rodapé da aplicação, com diferentes layouts para usuários logados e não logados.'
      },
    },
  },
};

export default meta;
type Story = StoryObj<FooterComponent>;

export const LoggedOut: Story = {
  args: {
    isLoggedIn: false,
    company: 'ByteBank',
    version: '1.0.0',
    year: 2025,
  },
};

export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
    company: 'ByteBank',
    version: '1.0.0',
    year: 2025,
  },
};
