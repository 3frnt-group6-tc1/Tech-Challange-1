import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { MenuItemComponent } from './menu-item.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { of } from 'rxjs';

// Componentes de ícones mock para os exemplos
@Component({
  selector: 'app-icon-home',
  template: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
  standalone: true
})
class IconHomeComponent {}

@Component({
  selector: 'app-icon-transaction',
  template: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
  standalone: true
})
class IconTransactionComponent {}

@Component({
  selector: 'app-icon-card',
  template: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>',
  standalone: true
})
class IconCardComponent {}

const meta: Meta<MenuItemComponent> = {
  title: 'Componentes/MenuItem',
  component: MenuItemComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        RouterModule.forChild([]), 
        NgClass, 
        NgComponentOutlet,
        IconHomeComponent, 
        IconTransactionComponent, 
        IconCardComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            snapshot: {
              paramMap: {
                get: () => null
              },
              queryParamMap: {
                get: () => null
              }
            }
          }
        }
      ]
    })
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto do item de menu',
      table: {
        defaultValue: { summary: '' },
      },
    },
    route: {
      control: 'text',
      description: 'Rota para navegação',
      table: {
        defaultValue: { summary: '' },
      },
    },
    active: {
      control: 'boolean',
      description: 'Define se o item está ativo',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    iconComponent: {
      control: { type: 'select', options: ['IconHomeComponent', 'IconTransactionComponent', 'IconCardComponent'] },
      description: 'Componente de ícone a ser exibido',
      mapping: {
        IconHomeComponent: IconHomeComponent,
        IconTransactionComponent: IconTransactionComponent,
        IconCardComponent: IconCardComponent
      }
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Componente de item de menu utilizado na navegação lateral da aplicação.'
      },
    },
  },
};

export default meta;
type Story = StoryObj<MenuItemComponent>;

export const Home: Story = {
  args: {
    label: 'Início',
    route: '/panel',
    active: false,
    iconComponent: IconHomeComponent
  },
};

export const HomeActive: Story = {
  args: {
    label: 'Início',
    route: '/panel',
    active: true,
    iconComponent: IconHomeComponent
  },
};

export const Transactions: Story = {
  args: {
    label: 'Transações',
    route: '/transactions',
    active: false,
    iconComponent: IconTransactionComponent
  },
};

export const Cards: Story = {
  args: {
    label: 'Meus Cartões',
    route: '/cards',
    active: false,
    iconComponent: IconCardComponent
  },
};
