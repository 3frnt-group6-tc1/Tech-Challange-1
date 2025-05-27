import { NewTransactionComponent } from './new-transaction.component';
import { TransactionType, Transaction } from '../../models/transaction';
import { systemConfig } from '../../../app.config';
import { of, throwError } from 'rxjs';

describe('NewTransactionComponent Logic Functions', () => {
  let component: NewTransactionComponent;
  let transactionServiceMock: any;

  beforeEach(() => {
    transactionServiceMock = {
      create: jasmine.createSpy('create')
    };

    component = new NewTransactionComponent(transactionServiceMock);
  });

  describe('onTransactionTypeChange', () => {
    it('should update the transaction type', () => {

      component.newTransaction.type = TransactionType.Exchange;


      component.onTransactionTypeChange(TransactionType.Transfer);


      expect(component.newTransaction.type).toBe(TransactionType.Transfer);
    });
  });

  describe('onAmountChange', () => {
    it('should format input to only allow numbers and one comma', () => {
      const event = {
        target: {
          value: '123,456,789'
        }
      } as unknown as Event;


      component.onAmountChange(event);


      expect(component.valorTransacao).toBe('123,456789');
      expect(component.newTransaction.amount).toBe(123.456789);
    });

    it('should limit decimal places to 2', () => {
      const event = {
        target: {
          value: '123,456'
        }
      } as unknown as Event;


      component.onAmountChange(event);


      expect(component.valorTransacao).toBe('123,45');
      expect(component.newTransaction.amount).toBe(123.45);
    });

    it('should strip non-numeric characters except comma', () => {
      const event = {
        target: {
          value: 'abc123,45xyz'
        }
      } as unknown as Event;


      component.onAmountChange(event);


      expect(component.valorTransacao).toBe('123,45');
      expect(component.newTransaction.amount).toBe(123.45);
    });

    it('should handle empty input', () => {
      const event = {
        target: {
          value: ''
        }
      } as unknown as Event;


      component.onAmountChange(event);


      expect(component.valorTransacao).toBe('');
      expect(component.newTransaction.amount).toBe(0);
    });
  });

  describe('onDescriptionChange', () => {
    it('should update the transaction description', () => {
      const event = {
        target: {
          value: 'Test description'
        }
      } as unknown as Event;


      component.onDescriptionChange(event);


      expect(component.newTransaction.description).toBe('Test description');
    });
  });

  describe('getTransactionTypeLabel', () => {
    it('should return correct labels for transaction types', () => {
      expect(component.getTransactionTypeLabel(TransactionType.Exchange)).toBe('Câmbio de Moeda');
      expect(component.getTransactionTypeLabel(TransactionType.Transfer)).toBe('DOC/TED');
      expect(component.getTransactionTypeLabel(TransactionType.Loan)).toBe('Empréstimo e Financiamento');
    });

    it('should return the type itself if no label is found', () => {
      const unknownType = 'UnknownType' as any;
      expect(component.getTransactionTypeLabel(unknownType)).toBe(unknownType);
    });
  });

  describe('createTransaction', () => {
    beforeEach(() => {
      component.newTransaction = {
        type: TransactionType.Exchange,
        amount: 100,
        description: 'Valid description'
      };
      spyOn(component, 'resetForm');
    });

    it('should validate transaction type before submission', () => {

      component.newTransaction.type = undefined;


      component.createTransaction();


      expect(component.submitStatus.success).toBeFalse();
      expect(component.submitStatus.message).toContain('tipo de transação');
      expect(transactionServiceMock.create).not.toHaveBeenCalled();
    });

    it('should validate transaction amount before submission', () => {
      component.newTransaction.amount = 0;
      component.createTransaction();
      expect(component.submitStatus.success).toBeFalse();
      expect(component.submitStatus.message).toContain('valor válido');
      expect(transactionServiceMock.create).not.toHaveBeenCalled();

      component.newTransaction.amount = -10;
      component.createTransaction();
      expect(component.submitStatus.success).toBeFalse();
      expect(component.submitStatus.message).toContain('valor válido');
      expect(transactionServiceMock.create).not.toHaveBeenCalled();
    });

    it('should validate transaction description before submission', () => {
      component.newTransaction.description = '';
      component.createTransaction();
      expect(component.submitStatus.success).toBeFalse();
      expect(component.submitStatus.message).toContain('descrição');
      expect(transactionServiceMock.create).not.toHaveBeenCalled();

      component.newTransaction.description = '   ';
      component.createTransaction();
      expect(component.submitStatus.success).toBeFalse();
      expect(component.submitStatus.message).toContain('descrição');
      expect(transactionServiceMock.create).not.toHaveBeenCalled();
    });

    it('should call the transaction service on valid submission', () => {

      const expectedTransaction = {
        type: TransactionType.Exchange,
        amount: 100,
        description: 'Valid description',
        date: jasmine.any(Date),
        id_user: systemConfig.userId
      };

      transactionServiceMock.create.and.returnValue(of({
        id: '123',
        ...expectedTransaction
      }));


      component.createTransaction();


      expect(component.submitStatus.success).toBeTrue();
      expect(transactionServiceMock.create).toHaveBeenCalled();

      const serviceCallArgs = transactionServiceMock.create.calls.first().args[0];
      expect(serviceCallArgs.type).toBe(expectedTransaction.type);
      expect(serviceCallArgs.amount).toBe(expectedTransaction.amount);
      expect(serviceCallArgs.description).toBe(expectedTransaction.description);
      expect(serviceCallArgs.id_user).toBe(systemConfig.userId);
    });

    it('should handle successful transaction creation', () => {

      const createdTransaction = {
        id: '123',
        type: TransactionType.Exchange,
        amount: 100,
        description: 'Valid description',
        date: new Date(),
        id_user: systemConfig.userId
      };
      transactionServiceMock.create.and.returnValue(of(createdTransaction));


      component.createTransaction();


      expect(component.submitStatus.success).toBeTrue();
      expect(component.submitStatus.message).toContain('sucesso');
      expect(component.resetForm).toHaveBeenCalled();
    });

    it('should handle transaction creation error', () => {

      const testError = new Error('Test error');
      transactionServiceMock.create.and.returnValue(throwError(() => testError));


      component.createTransaction();


      expect(component.submitStatus.success).toBeFalse();
      expect(component.submitStatus.message).toContain('Erro');
      expect(component.submitStatus.message).toContain('Test error');
    });
  });

  describe('resetForm', () => {
    it('should reset the form fields', () => {
      component.newTransaction = {
        type: TransactionType.Transfer,
        amount: 500,
        description: 'Test transaction'
      };
      component.valorTransacao = '500,00';
      component.selectedOption = 'some-option';


      component.resetForm();


      expect(component.newTransaction.type).toBe(TransactionType.Exchange);
      expect(component.newTransaction.amount).toBe(0);
      expect(component.newTransaction.description).toBe('');
      expect(component.valorTransacao).toBe('');
      expect(component.selectedOption).toBe('');
    });

    it('should clear success message after timeout', () => {

      jasmine.clock().install();
      component.submitStatus = {
        success: true,
        message: 'Success message'
      };


      component.resetForm();
      jasmine.clock().tick(3000);


      expect(component.submitStatus.message).toBe('');

      jasmine.clock().uninstall();
    });

    it('should not clear error message after timeout', () => {

      jasmine.clock().install();
      component.submitStatus = {
        success: false,
        message: 'Error message'
      };


      component.resetForm();
      jasmine.clock().tick(3000);


      expect(component.submitStatus.message).toBe('Error message');

      jasmine.clock().uninstall();
    });
  });
});