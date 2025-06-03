import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TransactionFormComponent } from './transaction-form.component';
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

const meta: Meta<TransactionFormComponent> = {
  title: 'Componentes/TransactionForm',
  component: TransactionFormComponent,
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
    form: {
      control: 'object',
      description: 'Formulário de transação com tipo e valor',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Componente de formulário simplificado para criação de novas transações financeiras.'
      },
    },
  },
};

export default meta;
type Story = StoryObj<TransactionFormComponent>;

export const Default: Story = {
  args: {
    form: {
      type: 'Câmbio de Moeda',
      amount: '00,00'
    }
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="rounded-xl shadow p-6 bg-white pb-[80px]">
        <div class="pb-4">
          <div class="border-b-2">
            <app-text variant="title-bold" as="h1" class="mb-4 border-gray-200 block">
              Nova Transação
            </app-text>
          </div>
        </div>

        <div class="flex flex-col md:flex-row">
          <div class="w-full flex flex-col items-center md:items-start md:justify-start">
            <form
              class="w-full max-w-sm md:max-w-none mt-8"
              (ngSubmit)="submitForm()"
              #transactionForm="ngForm"
            >
              <div class="mb-4">
                <app-input
                  class="w-full"
                  [(ngModel)]="form.type"
                  name="type"
                  required
                  [options]="transactionOptions"
                  placeholder="Selecione o tipo de transação"
                  size="G"
                >
                </app-input>
              </div>

              <div class="mb-4">
                <div class="relative inline-block w-full">
                  <div
                    class="w-full bg-gray-100 border border-cyan-blue-500 text-cyan-blue-500 font-lato font-medium rounded-md p-4 flex items-center"
                    [ngClass]="{
                      'max-w-[360px]': true
                    }"
                  >
                    <span class="text-cyan-blue-500 mr-2">R$</span>
                    <input
                      type="text"
                      placeholder="00,00"
                      class="bg-transparent w-full outline-none text-cyan-blue-500 placeholder-cyan-blue-500 placeholder-opacity-70"
                      [(ngModel)]="form.amount"
                      name="amount"
                      autocomplete="off"
                      inputmode="numeric"
                      (click)="form.amount = ''"
                      required
                    />
                  </div>
                </div>
              </div>

              <app-button
                theme="primary"
                size="GG"
                label="Concluir Transação"
                class="w-full"
                type="submit"
              ></app-button>
            </form>
          </div>
        </div>
      </div>
    `
  })
};

export const WithAmount: Story = {
  args: {
    form: {
      type: 'Câmbio de Moeda',
      amount: '1.000,00'
    }
  },
};

export const TransferType: Story = {
  args: {
    form: {
      type: 'DOC/TED',
      amount: '500,00'
    }
  },
};

export const LoanType: Story = {
  args: {
    form: {
      type: 'Empréstimo e Financiamento',
      amount: '5.000,00'
    }
  },
};
