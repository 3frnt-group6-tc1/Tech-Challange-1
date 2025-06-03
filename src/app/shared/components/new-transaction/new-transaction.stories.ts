import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { NewTransactionComponent } from './new-transaction.component';
import { ButtonComponent } from '../button/button.component';
import { TextComponent } from '../text/text.component';
import { InputComponent } from '../input/input.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TransactionService } from '../../services/Transaction/transaction-service';

// Mock do TransactionService
const mockTransactionService = {
  create: () => of({
    id: '123',
    type: 'exchange',
    description: 'Transação de teste',
    amount: 1000,
    date: new Date(),
    id_user: 'user123'
  })
};

const meta: Meta<NewTransactionComponent> = {
  title: 'Componentes/NewTransaction',
  component: NewTransactionComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ButtonComponent, 
        TextComponent, 
        InputComponent, 
        CommonModule, 
        HttpClientModule,
        FormsModule
      ],
      providers: [
        { provide: TransactionService, useValue: mockTransactionService },
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
    valorTransacao: {
      control: 'text',
      description: 'Valor formatado da transação',
    },
    selectedOption: {
      control: 'text',
      description: 'Opção selecionada no dropdown',
    },
    submitStatus: {
      control: 'object',
      description: 'Status da submissão do formulário',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Componente de formulário para criação de novas transações financeiras, permitindo selecionar o tipo, valor e descrição.'
      },
    },
  },
};

export default meta;
type Story = StoryObj<NewTransactionComponent>;

export const Default: Story = {
  args: {
    valorTransacao: '',
    selectedOption: '',
    submitStatus: {
      success: false,
      message: ''
    }
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="rounded-xl shadow p-6 bg-white">
        <div class="pb-6">
          <div class="border-b-2">
            <app-text
              variant="subtitle"
              as="h1"
              color="text-gray-900"
              class="mb-4 border-gray-200 block"
              >Nova Transação</app-text
            >
          </div>
        </div>
      
        <div class="flex flex-col md:flex-row">
          <div
            class="w-full flex flex-col items-center md:items-start md:justify-start"
          >
            <div class="w-full max-w-sm md:max-w-none">
              <div class="mb-4">
                <app-input
                  [options]="transactionOptions"
                  placeholder="Selecione o tipo de transação"
                  size="G"
                  (selectionChange)="onTransactionTypeChange($event)"
                >
                </app-input>
              </div>
      
              <div class="mb-4">
                <div class="relative inline-block w-full">
                  <div
                    class="w-full bg-gray-100 border border-cyan-blue-500 dark:border-blue-violet-500  text-cyan-blue-500 dark:text-blue-violet-500 font-lato font-medium rounded-md p-4 flex items-center max-w-[360px]"
                  >
                    <span class="text-cyan-blue-500  dark:text-blue-violet-500 mr-2">R$</span>
                    <input
                      type="text"
                      placeholder="00,00"
                      class="bg-transparent w-full outline-none text-cyan-blue-500 dark:text-blue-violet-500 placeholder-cyan-blue-500 dark:placeholder-blue-violet-500 placeholder-opacity-70"
                      [(ngModel)]="valorTransacao"
                      (input)="onAmountChange($event)"
                      autocomplete="off"
                      inputmode="numeric"
                    />
                  </div>
                </div>
              </div>
      
              <div class="mb-4">
                <input
                  type="text"
                  placeholder="Descrição da transação"
                  class="w-full max-w-[360px] bg-gray-100 border border-cyan-blue-500 dark:border-blue-violet-500 text-cyan-blue-500 dark:text-blue-violet-500 font-lato font-medium rounded-md p-4"
                  [(ngModel)]="newTransaction.description"
                  (input)="onDescriptionChange($event)"
                />
              </div>
      
              <div
                *ngIf="submitStatus.message"
                class="mb-4 p-3 rounded-md max-w-[360px]"
                [ngClass]="{
                  'bg-green-100 text-green-800': submitStatus.success,
                  'bg-red-100 text-red-800': !submitStatus.success
                }"
              >
                {{ submitStatus.message }}
              </div>
      
              <app-button
                theme="primary"
                size="GG"
                label="Concluir Transação"
                class="w-full max-w-full sm:max-w-[360px]"
                (click)="createTransaction()"
              >
              </app-button>
            </div>
          </div>
        </div>
      </div>
    `
  })
};

export const WithValues: Story = {
  args: {
    valorTransacao: '1.000,00',
    selectedOption: 'Receita (Câmbio de Moeda)',
    submitStatus: {
      success: false,
      message: ''
    }
  },
};

export const SuccessState: Story = {
  args: {
    valorTransacao: '1.000,00',
    selectedOption: 'Receita (Câmbio de Moeda)',
    submitStatus: {
      success: true,
      message: 'Transação de crédito (Câmbio de Moeda) criada com sucesso!'
    }
  },
};

export const ErrorState: Story = {
  args: {
    valorTransacao: '1.000,00',
    selectedOption: 'Receita (Câmbio de Moeda)',
    submitStatus: {
      success: false,
      message: 'Erro ao criar transação: Tente novamente mais tarde'
    }
  },
};
