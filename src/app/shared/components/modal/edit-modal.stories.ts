import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { EditModalComponent } from './edit-modal.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';
import { Transaction, TransactionType } from '../../models/transaction';

const meta: Meta<EditModalComponent> = {
  title: 'Componentes/Modal/EditModal',
  component: EditModalComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ButtonComponent, FormsModule],
    }),
  ],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Define se o modal está aberto ou fechado',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    transaction: {
      control: 'object',
      description: 'Objeto de transação a ser editado',
    },
    save: {
      action: 'save',
      description: 'Evento emitido quando o usuário salva as alterações',
    },
    cancel: {
      action: 'cancel',
      description: 'Evento emitido quando o usuário cancela a edição',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Modal para edição de transações financeiras, permitindo alterar valor e descrição.'
      },
    },
  },
};

export default meta;
type Story = StoryObj<EditModalComponent>;

// Exemplo de transação para o modal
const sampleTransaction: Transaction = {
  id: '1',
  type: TransactionType.Exchange,
  amount: 1500.75,
  date: new Date(),
  description: 'Câmbio de dólares',
  id_user: 'user123'
};

export const Default: Story = {
  args: {
    isOpen: true,
    transaction: sampleTransaction,
  },
};

export const EmptyDescription: Story = {
  args: {
    isOpen: true,
    transaction: {
      ...sampleTransaction,
      description: ''
    },
  },
};

export const LargeAmount: Story = {
  args: {
    isOpen: true,
    transaction: {
      ...sampleTransaction,
      amount: 9999999.99,
      description: 'Transação de alto valor'
    },
  },
};
