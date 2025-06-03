import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TransactionService } from '../../services/Transaction/transaction-service';
import { TransactionEventService } from '../../services/TransactionEvent/transaction-event.service';
import { UserService } from '../../services/User/user-service';

// Mock do TransactionChartComponent
@Component({
  selector: 'app-transaction-chart',
  template: `
    <div class="transaction-chart-mock p-4 border rounded-lg">
      <h3 class="text-lg font-bold mb-4">Gráfico de Transações (Mock)</h3>
      <div class="flex justify-between mb-4">
        <div class="text-green-500">
          <p>Entradas</p>
          <p class="font-bold">{{ totalEntries }}</p>
        </div>
        <div class="text-red-500">
          <p>Saídas</p>
          <p class="font-bold">{{ totalExits }}</p>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-4">
        <div *ngFor="let data of transactionData" class="text-center">
          <p>{{ data.day }}</p>
          <div class="h-20 flex items-end justify-center space-x-2">
            <div class="bg-green-500 w-4" [style.height.px]="data.entries / 10"></div>
            <div class="bg-red-500 w-4" [style.height.px]="data.exits / 10"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
class MockTransactionChartComponent {
  @Input() transactionData: any[] = [];
  @Input() totalEntries: string = '';
  @Input() totalExits: string = '';
}

// Mock dos serviços
const mockTransactionService = {
  getByUserId: () => of([
    {
      id: '1',
      id_user: 'user123',
      description: 'Salário',
      amount: 5000,
      date: '2025-06-01T10:00:00',
      type: 'deposit'
    },
    {
      id: '2',
      id_user: 'user123',
      description: 'Aluguel',
      amount: 1500,
      date: '2025-06-05T14:30:00',
      type: 'withdrawal'
    },
    {
      id: '3',
      id_user: 'user123',
      description: 'Supermercado',
      amount: 500,
      date: '2025-06-10T16:45:00',
      type: 'withdrawal'
    },
    {
      id: '4',
      id_user: 'user123',
      description: 'Freelance',
      amount: 2000,
      date: '2025-06-15T09:15:00',
      type: 'deposit'
    }
  ])
};

const mockUserService = {
  getById: () => of({
    id: 'user123',
    name: 'João Silva',
    email: 'joao@example.com'
  })
};

const mockTransactionEventService = {
  transactionCreated$: of({}),
  transactionUpdated$: of({}),
  transactionDeleted$: of({})
};

const meta: Meta<DashboardComponent> = {
  title: 'Componentes/Dashboard',
  component: DashboardComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        HttpClientModule,
        MockTransactionChartComponent
      ],
      providers: [
        { provide: TransactionService, useValue: mockTransactionService },
        { provide: UserService, useValue: mockUserService },
        { provide: TransactionEventService, useValue: mockTransactionEventService },
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
    userName: {
      control: 'text',
      description: 'Nome do usuário',
      table: {
        defaultValue: { summary: 'João Silva' },
      },
    },
    currentDate: {
      control: 'text',
      description: 'Data atual formatada',
      table: {
        defaultValue: { summary: 'Segunda-feira, 02/06/2025 21:52' },
      },
    },
    balance: {
      control: 'text',
      description: 'Saldo da conta',
      table: {
        defaultValue: { summary: 'R$ 5.000,00' },
      },
    },
    showBalance: {
      control: 'boolean',
      description: 'Mostrar ou ocultar o saldo',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Estado de carregamento',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    errorMessage: {
      control: 'text',
      description: 'Mensagem de erro',
      table: {
        defaultValue: { summary: '' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Componente de dashboard que exibe o saldo da conta, informações do usuário e um gráfico de transações do mês atual.'
      },
    },
  },
};

export default meta;
type Story = StoryObj<DashboardComponent>;

export const Default: Story = {
  args: {
    userName: 'João Silva',
    currentDate: 'Segunda-feira, 02/06/2025 21:52',
    currentMonthName: 'Junho',
    balance: 'R$ 5.000,00',
    accountType: 'Conta Corrente',
    totalEntries: 'R$ 7.000,00',
    totalExits: 'R$ 2.000,00',
    showBalance: true,
    isLoading: false,
    transactionData: [
      { day: 'Semana 1', entries: 5000, exits: 1500 },
      { day: 'Semana 2', entries: 0, exits: 500 },
      { day: 'Semana 3', entries: 2000, exits: 0 },
      { day: 'Semana 4', entries: 0, exits: 0 }
    ],
    errorMessage: ''
  },
};

export const Loading: Story = {
  args: {
    isLoading: true
  },
};

export const WithError: Story = {
  args: {
    userName: 'João Silva',
    currentDate: 'Segunda-feira, 02/06/2025 21:52',
    currentMonthName: 'Junho',
    balance: 'R$ 5.000,00',
    accountType: 'Conta Corrente',
    totalEntries: 'R$ 7.000,00',
    totalExits: 'R$ 2.000,00',
    showBalance: true,
    isLoading: false,
    transactionData: [
      { day: 'Semana 1', entries: 5000, exits: 1500 },
      { day: 'Semana 2', entries: 0, exits: 500 },
      { day: 'Semana 3', entries: 2000, exits: 0 },
      { day: 'Semana 4', entries: 0, exits: 0 }
    ],
    errorMessage: 'Erro ao carregar as transações. Tente novamente mais tarde.'
  },
};

export const HiddenBalance: Story = {
  args: {
    userName: 'João Silva',
    currentDate: 'Segunda-feira, 02/06/2025 21:52',
    currentMonthName: 'Junho',
    balance: 'R$ 5.000,00',
    accountType: 'Conta Corrente',
    totalEntries: 'R$ 7.000,00',
    totalExits: 'R$ 2.000,00',
    showBalance: false,
    isLoading: false,
    transactionData: [
      { day: 'Semana 1', entries: 5000, exits: 1500 },
      { day: 'Semana 2', entries: 0, exits: 500 },
      { day: 'Semana 3', entries: 2000, exits: 0 },
      { day: 'Semana 4', entries: 0, exits: 0 }
    ],
    errorMessage: ''
  },
};
