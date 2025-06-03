import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DeleteModalComponent } from './delete-modal.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

const meta: Meta<DeleteModalComponent> = {
  title: 'Componentes/Modal/DeleteModal',
  component: DeleteModalComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ButtonComponent],
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
    message: {
      control: 'text',
      description: 'Mensagem exibida no modal de confirmação',
      table: {
        defaultValue: { summary: 'Deseja realmente deletar essa transação?' },
      },
    },
    confirm: {
      action: 'confirm',
      description: 'Evento emitido quando o usuário confirma a ação',
    },
    cancel: {
      action: 'cancel',
      description: 'Evento emitido quando o usuário cancela a ação',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Modal de confirmação para exclusão de itens, com opções para confirmar ou cancelar a ação.'
      },
    },
  },
};

export default meta;
type Story = StoryObj<DeleteModalComponent>;

export const Default: Story = {
  args: {
    isOpen: true,
    message: 'Deseja realmente deletar essa transação?',
  },
};

export const CustomMessage: Story = {
  args: {
    isOpen: true,
    message: 'Tem certeza que deseja excluir este item permanentemente?',
  },
};
