import { TestBed } from '@angular/core/testing';
import { TransactionEventService } from './transaction-event.service';
import { Transaction, TransactionType } from '../../models/transaction';

describe('TransactionEventService', () => {
  let service: TransactionEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionEventService]
    });
    service = TestBed.inject(TransactionEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Transaction Created Events', () => {
    it('should emit a transaction created event when notifyTransactionCreated is called', (done: DoneFn) => {
      const mockTransaction: Transaction = {
        id: '1',
        id_user: 'user1',
        date: new Date('2023-05-10'),
        amount: 100,
        description: 'Test transaction',
        type: TransactionType.Exchange
      };

      service.transactionCreated$.subscribe(transaction => {
        expect(transaction).toEqual(mockTransaction);
        done();
      });

      service.notifyTransactionCreated(mockTransaction);
    });

    it('should allow multiple subscribers to receive transaction created events', () => {

      const mockTransaction: Transaction = {
        id: '1',
        id_user: 'user1',
        date: new Date('2023-05-10'),
        amount: 100,
        description: 'Test transaction',
        type: TransactionType.Loan
      };

      const subscriber1 = jasmine.createSpy('subscriber1');
      const subscriber2 = jasmine.createSpy('subscriber2');

      service.transactionCreated$.subscribe(subscriber1);
      service.transactionCreated$.subscribe(subscriber2);

      service.notifyTransactionCreated(mockTransaction);

      expect(subscriber1).toHaveBeenCalledWith(mockTransaction);
      expect(subscriber2).toHaveBeenCalledWith(mockTransaction);
    });
  });

  describe('Transaction Updated Events', () => {
    it('should emit a transaction updated event when notifyTransactionUpdated is called', (done: DoneFn) => {
      const mockTransaction: Transaction = {
        id: '1',
        id_user: 'user1',
        date: new Date('2023-05-10'),
        amount: 150,
        description: 'Updated transaction',
        type: TransactionType.Transfer
      };

      service.transactionUpdated$.subscribe(transaction => {
        expect(transaction).toEqual(mockTransaction);
        done();
      });

      service.notifyTransactionUpdated(mockTransaction);
    });

    it('should allow multiple subscribers to receive transaction updated events', () => {
      const mockTransaction: Transaction = {
        id: '1',
        id_user: 'user1',
        date: new Date('2023-05-10'),
        amount: 150,
        description: 'Updated transaction',
        type: TransactionType.Exchange
      };

      const subscriber1 = jasmine.createSpy('subscriber1');
      const subscriber2 = jasmine.createSpy('subscriber2');

      service.transactionUpdated$.subscribe(subscriber1);
      service.transactionUpdated$.subscribe(subscriber2);

      service.notifyTransactionUpdated(mockTransaction);

      expect(subscriber1).toHaveBeenCalledWith(mockTransaction);
      expect(subscriber2).toHaveBeenCalledWith(mockTransaction);
    });
  });

  describe('Transaction Deleted Events', () => {
    it('should emit a transaction ID when notifyTransactionDeleted is called', (done: DoneFn) => {
      const transactionId = '1';

      service.transactionDeleted$.subscribe(id => {
        expect(id).toBe(transactionId);
        done();
      });

      service.notifyTransactionDeleted(transactionId);
    });

    it('should allow multiple subscribers to receive transaction deleted events', () => {
      const transactionId = '1';

      const subscriber1 = jasmine.createSpy('subscriber1');
      const subscriber2 = jasmine.createSpy('subscriber2');

      service.transactionDeleted$.subscribe(subscriber1);
      service.transactionDeleted$.subscribe(subscriber2);

      service.notifyTransactionDeleted(transactionId);

      expect(subscriber1).toHaveBeenCalledWith(transactionId);
      expect(subscriber2).toHaveBeenCalledWith(transactionId);
    });
  });

  describe('Integration between events', () => {
    it('should keep event streams separated', () => {
      const mockTransaction: Transaction = {
        id: '1',
        id_user: 'user1',
        date: new Date('2023-05-10'),
        amount: 100,
        description: 'Test transaction',
        type: TransactionType.Loan
      };

      const transactionId = '1';

      const createdSubscriber = jasmine.createSpy('createdSubscriber');
      const updatedSubscriber = jasmine.createSpy('updatedSubscriber');
      const deletedSubscriber = jasmine.createSpy('deletedSubscriber');

      service.transactionCreated$.subscribe(createdSubscriber);
      service.transactionUpdated$.subscribe(updatedSubscriber);
      service.transactionDeleted$.subscribe(deletedSubscriber);

      service.notifyTransactionCreated(mockTransaction);

      expect(createdSubscriber).toHaveBeenCalledWith(mockTransaction);
      expect(updatedSubscriber).not.toHaveBeenCalled();
      expect(deletedSubscriber).not.toHaveBeenCalled();

      createdSubscriber.calls.reset();
      updatedSubscriber.calls.reset();
      deletedSubscriber.calls.reset();

      service.notifyTransactionUpdated(mockTransaction);

      expect(createdSubscriber).not.toHaveBeenCalled();
      expect(updatedSubscriber).toHaveBeenCalledWith(mockTransaction);
      expect(deletedSubscriber).not.toHaveBeenCalled();

      createdSubscriber.calls.reset();
      updatedSubscriber.calls.reset();
      deletedSubscriber.calls.reset();

      service.notifyTransactionDeleted(transactionId);

      expect(createdSubscriber).not.toHaveBeenCalled();
      expect(updatedSubscriber).not.toHaveBeenCalled();
      expect(deletedSubscriber).toHaveBeenCalledWith(transactionId);
    });
  });

  describe('Event behavior', () => {
    it('should only emit to subscribers who subscribed before the event was triggered', () => {
      const mockTransaction: Transaction = {
        id: '1',
        id_user: 'user1',
        date: new Date('2023-05-10'),
        amount: 100,
        description: 'Test transaction',
        type: TransactionType.Transfer
      };

      const earlySubscriber = jasmine.createSpy('earlySubscriber');
      service.transactionCreated$.subscribe(earlySubscriber);

      service.notifyTransactionCreated(mockTransaction);

      const lateSubscriber = jasmine.createSpy('lateSubscriber');
      service.transactionCreated$.subscribe(lateSubscriber);

      expect(earlySubscriber).toHaveBeenCalledWith(mockTransaction);
      expect(lateSubscriber).not.toHaveBeenCalled();
    });

    it('should allow subscribers to unsubscribe', () => {
      const mockTransaction: Transaction = {
        id: '1',
        id_user: 'user1',
        date: new Date('2023-05-10'),
        amount: 100,
        description: 'Test transaction',
        type: TransactionType.Exchange
      };

      const subscriber = jasmine.createSpy('subscriber');
      const subscription = service.transactionCreated$.subscribe(subscriber);

      service.notifyTransactionCreated(mockTransaction);
      expect(subscriber).toHaveBeenCalledTimes(1);

      subscription.unsubscribe();

      service.notifyTransactionCreated(mockTransaction);

      expect(subscriber).toHaveBeenCalledTimes(1);
    });
  });
});