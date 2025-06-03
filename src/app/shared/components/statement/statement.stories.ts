import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { StatementComponent } from './statement.component';
import { TextComponent } from '../text/text.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { BrlPipe } from '../../pipes/brl.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../services/Transaction/transaction-service';
import { TransactionEventService } from '../../services/TransactionEvent/transaction-event.service';

// Mock dos componentes de ícones
@Component({
  selector: 'app-icon-arrow-pencil',
  template: '<svg width="16" height="16" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"></path></svg>',
  standalone: true
})
class MockIconArrowPencilComponent {}

@Component({
  selector: 'app-icon-bin',
  template: '<svg width="16" height="16" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12z"></path></svg>',
  standalone: true
})
class MockIconBinComponent {}

@Component({
  selector: 'app-icon-dollar',
  template: '<svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>',
  standalone: true
})
class MockIconDollarComponent {}

@Component({
  selector: 'app-icon-arrow-down-left',
  template: '<svg width="16" height="16" viewBox="0 0 24 24"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path></svg>',
  standalone: true
})
class MockIconArrowDownLeftComponent {}

@Component({
  selector: 'app-icon-arrow-right',
  template: '<svg width="16" height="16" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path></svg>',
  standalone: true
})
class MockIconArrowRightComponent {}

@Component({
  selector: 'app-delete-modal',
  template: '<div *ngIf="isOpen">Mock Delete Modal</div>',
  inputs: ['isOpen'],
  outputs: ['confirm', 'cancel'],
  standalone: true,
  imports: [CommonModule]
})
class MockDeleteModalComponent {}

@Component({
  selector: 'app-edit-modal',
  template: '<div *ngIf="isOpen">Mock Edit Modal</div>',
  inputs: ['isOpen', 'transaction'],
  outputs: ['confirm', 'cancel'],
  standalone: true,
  imports: [CommonModule]
})
class MockEditModalComponent {}

// Mock do TransactionService e TransactionEventService
const mockTransactionService = {
  getByUserId: () => of([
    {
      id: '1',
      type: 'exchange',
      description: 'Câmbio de moeda',
      amount: 1500.75,
      date: new Date('2023-05-10'),
      id_user: 'user123'
    },
    {
      id: '2',
      type: 'transfer',
      description: 'Transferência bancária',
      amount: 750.50,
      date: new Date('2023-05-08'),
      id_user: 'user123'
    },
    {
      id: '3',
      type: 'loan',
      description: 'Empréstimo pessoal',
      amount: 3000,
      date: new Date('2023-05-05'),
      id_user: 'user123'
    }
  ]),
  delete: () => of({}),
  update: () => of({})
};

const mockTransactionEventService = {
  transactionCreated$: of({}),
  transactionUpdated$: of({}),
  transactionDeleted$: of({})
};

// Criando um mock do BrlPipe
class MockBrlPipe extends BrlPipe {
  override transform(value: any): string {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  }
}

const meta: Meta<StatementComponent> = {
  title: 'Componentes/Statement',
  component: StatementComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule, 
        HttpClientModule,
        TextComponent,
        MockIconArrowPencilComponent,
        MockIconBinComponent,
        MockIconDollarComponent,
        MockIconArrowDownLeftComponent,
        MockIconArrowRightComponent,
        MockDeleteModalComponent,
        MockEditModalComponent
      ],
      providers: [
        { provide: BrlPipe, useClass: MockBrlPipe },
        { provide: TransactionService, useValue: mockTransactionService },
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
    showDetails: {
      control: 'boolean',
      description: 'Exibe detalhes das transações',
    },
    showAllTransactions: {
      control: 'boolean',
      description: 'Exibe todas as transações ou apenas as 6 mais recentes',
    },
    customTitle: {
      control: 'text',
      description: 'Título personalizado para o componente',
    },
    showLastTransactionsSubtitle: {
      control: 'boolean',
      description: 'Exibe o subtítulo de últimas transações',
    },
    swapColumns: {
      control: 'boolean',
      description: 'Inverte a ordem das colunas',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Componente que exibe um extrato de transações financeiras com opções para editar e excluir transações.'
      },
    },
  },
};

export default meta;
type Story = StoryObj<StatementComponent>;

export const Default: Story = {
  args: {
    showDetails: true,
    showAllTransactions: false,
    customTitle: 'Transações',
    showLastTransactionsSubtitle: true,
    swapColumns: false
  },
};

export const AllTransactions: Story = {
  args: {
    showDetails: true,
    showAllTransactions: true,
    customTitle: 'Histórico Completo',
    showLastTransactionsSubtitle: false,
    swapColumns: false
  },
};

export const CompactView: Story = {
  args: {
    showDetails: false,
    showAllTransactions: false,
    customTitle: 'Resumo',
    showLastTransactionsSubtitle: false,
    swapColumns: false
  },
};

export const SwappedColumns: Story = {
  args: {
    showDetails: true,
    showAllTransactions: false,
    customTitle: 'Transações',
    showLastTransactionsSubtitle: true,
    swapColumns: true
  },
};
