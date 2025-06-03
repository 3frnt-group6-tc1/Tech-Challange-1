import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { MenuComponent } from './menu.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { Component } from '@angular/core';
import { of } from 'rxjs';

// Mock do Router
class Router {
  url = '/panel';
  events = of({});
  navigate() {}
}

// Mock do ThemeService
class ThemeService {
  isDarkMode() { return false; }
  toggleDarkMode() {}
}

// Mock dos componentes de ícones
@Component({
  selector: 'app-icon-exit',
  template: '<div class="w-4 h-4 bg-gray-500">Exit</div>',
  standalone: true
})
class MockIconExitComponent {}

const meta: Meta<MenuComponent> = {
  title: 'Componentes/Menu',
  component: MenuComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ButtonComponent,
        MockIconExitComponent
      ],
      providers: [
        { provide: Router, useValue: new Router() },
        { provide: ThemeService, useValue: new ThemeService() }
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
    mobile: {
      control: 'boolean',
      description: 'Define se está em modo mobile',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    tablet: {
      control: 'boolean',
      description: 'Define se está em modo tablet',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    menuOpen: {
      control: 'boolean',
      description: 'Define se o menu está aberto',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    closeMenu: {
      action: 'closeMenu',
      description: 'Evento emitido quando o menu é fechado',
    },
    menuRefReady: {
      action: 'menuRefReady',
      description: 'Evento emitido quando a referência do menu está pronta',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Componente de menu da aplicação, com diferentes layouts para usuários logados e não logados, e responsivo para diferentes tamanhos de tela.'
      },
    },
  },
};

export default meta;
type Story = StoryObj<MenuComponent>;

export const LoggedOutMobile: Story = {
  args: {
    isLoggedIn: false,
    mobile: true,
    tablet: false,
    menuOpen: true,
  },
};

export const LoggedInTablet: Story = {
  args: {
    isLoggedIn: true,
    mobile: false,
    tablet: true,
    menuOpen: false,
  },
};

export const LoggedInMobile: Story = {
  args: {
    isLoggedIn: true,
    mobile: true,
    tablet: false,
    menuOpen: true,
  },
};
