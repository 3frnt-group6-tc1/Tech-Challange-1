import { StatementComponent } from './statement.component';
import { TransactionType, Transaction } from '../../models/transaction';
import { systemConfig } from '../../../app.config';

describe('StatementComponent Logic Functions', () => {
  let component: StatementComponent;

  const mockTransactions: Transaction[] = [
    {
      id: '1',
      type: TransactionType.Exchange,
      amount: 100,
      date: new Date('2023-01-10'),
      description: 'Currency Exchange',
      id_user: systemConfig.userId
    },
    {
      id: '2',
      type: TransactionType.Loan,
      amount: 200,
      date: new Date('2023-01-15'),
      description: 'Loan',
      id_user: systemConfig.userId
    },
    {
      id: '3',
      type: TransactionType.Transfer,
      amount: 50,
      date: new Date('2023-01-20'),
      description: 'Transfer',
      id_user: systemConfig.userId
    },
    {
      id: '4',
      type: TransactionType.Exchange,
      amount: 75,
      date: new Date('2023-01-05'),
      description: 'Currency Exchange 2',
      id_user: systemConfig.userId
    },
    {
      id: '5',
      type: TransactionType.Loan,
      amount: 300,
      date: new Date('2023-01-25'),
      description: 'Loan 2',
      id_user: systemConfig.userId
    },
    {
      id: '6',
      type: TransactionType.Transfer,
      amount: 25,
      date: new Date('2023-01-30'),
      description: 'Transfer 2',
      id_user: systemConfig.userId
    },
    {
      id: '7',
      type: TransactionType.Exchange,
      amount: 150,
      date: new Date('2023-01-01'),
      description: 'Currency Exchange 3',
      id_user: systemConfig.userId
    }
  ];

  beforeEach(() => {
    component = new StatementComponent(
      {} as any,
      {} as any
    );

    component.transactions = [...mockTransactions];
  });

  describe('recentTransactions', () => {
    it('should return transactions sorted by date in descending order and limited to 6', () => {
      const expected = [...mockTransactions]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 6);

      const result = component.recentTransactions;

      expect(result.length).toBeLessThanOrEqual(6);
      expect(result).toEqual(expected);

      expect(result[0].id).toBe('6');
    });

    it('should handle an empty transactions array', () => {
      component.transactions = [];
      expect(component.recentTransactions).toEqual([]);
      expect(component.recentTransactions.length).toBe(0);
    });
  });

  describe('isDeposit and isWithdraw', () => {
    it('should correctly identify deposit transactions', () => {
      const depositTransaction: Transaction = {
        id: '1',
        type: TransactionType.Exchange,
        amount: 100,
        date: new Date(),
        description: 'Test',
        id_user: systemConfig.userId
      };

      expect(component.isDeposit(depositTransaction)).toBeTrue();
      expect(component.isWithdraw(depositTransaction)).toBeFalse();
    });

    it('should correctly identify withdraw transactions', () => {
      const withdrawalTransaction: Transaction = {
        id: '2',
        type: TransactionType.Transfer,
        amount: 50,
        date: new Date(),
        description: 'Test',
        id_user: systemConfig.userId
      };

      expect(component.isDeposit(withdrawalTransaction)).toBeFalse();
      expect(component.isWithdraw(withdrawalTransaction)).toBeTrue();
    });
  });

  describe('formatDate', () => {
    it('should format Date objects correctly', () => {
      const testDate = new Date('2023-05-15');
      const expected = testDate.toLocaleDateString();

      expect(component.formatDate(testDate)).toBe(expected);
    });

    it('should format date strings correctly', () => {
      const testDateString = '2023-05-15';
      const testDate = new Date(testDateString);
      const expected = testDate.toLocaleDateString();

      expect(component.formatDate(testDateString)).toBe(expected);
    });
  });

  describe('getTransactionTypeLabel', () => {
    it('should return correct labels for transaction types', () => {
      expect(component.getTransactionTypeLabel(TransactionType.Exchange)).toBe('Câmbio de Moeda');
      expect(component.getTransactionTypeLabel(TransactionType.Loan)).toBe('Empréstimo e Financiamento');
      expect(component.getTransactionTypeLabel(TransactionType.Transfer)).toBe('DOC/TED');
    });

    it('should return the type itself if no label is found', () => {
      const unknownType = 'UnknownType' as any;
      expect(component.getTransactionTypeLabel(unknownType)).toBe(unknownType);
    });
  });
});