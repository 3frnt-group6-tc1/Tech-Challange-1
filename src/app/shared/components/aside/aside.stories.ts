import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { AsideComponent } from './aside.component';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { of } from 'rxjs';

// Mock do Router
class Router {
  url = '/panel';
  events = {
    subscribe: () => {}
  };
}

@Component({
  selector: 'app-icon-home',
  template: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
  standalone: true
})
class MockIconHomeComponent {}

@Component({
  selector: 'app-icon-dollar',
  template: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
  standalone: true
})
class MockIconDollarComponent {}

@Component({
  selector: 'app-icon-list',
  template: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>',
  standalone: true
})
class MockIconListComponent {}

@Component({
  selector: 'app-icon-card',
  template: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>',
  standalone: true
})
class MockIconCardComponent {}

@Component({
  selector: 'app-icon-settings',
  template: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
  standalone: true
})
class MockIconSettingsComponent {}

const meta: Meta<AsideComponent> = {
  title: 'Componentes/Aside',
  component: AsideComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        RouterModule.forChild([]),
        MenuItemComponent,
        NgClass,
        NgComponentOutlet,
        MockIconHomeComponent,
        MockIconDollarComponent,
        MockIconListComponent,
        MockIconCardComponent,
        MockIconSettingsComponent
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
        },
        { provide: Router, useValue: new Router() }
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: 'Componente de barra lateral de navegação com menu de itens para as principais seções da aplicação.'
      },
    },
  },
};

export default meta;
type Story = StoryObj<AsideComponent>;

export const Default: Story = {
  args: {
    currentRoute: '/panel'
  },
};

export const TransactionsActive: Story = {
  args: {
    currentRoute: '/transactions'
  },
};

export const CardsActive: Story = {
  args: {
    currentRoute: '/cards'
  },
};

export const ConfigurationsActive: Story = {
  args: {
    currentRoute: '/configurations'
  },
};
