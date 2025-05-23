import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { apiConfig } from '../../../app.config';

import { TransactionService } from './transaction-service';
import { Transaction, TransactionType } from '../../models/transaction';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;
  const transactionsUrl = apiConfig.baseUrl + apiConfig.transactionsEndpoint;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionService],
    });
    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a transaction', () => {
    const TransactionForm: Transaction = {
      id: '3',
      type: TransactionType.Exchange,
      amount: 200,
      date: new Date(),
      description: 'New',
      id_user: 'u3',
    };

    service.create(TransactionForm).subscribe((transaction) => {
      expect(transaction).toEqual(TransactionForm);
    });

    const req = httpMock.expectOne(transactionsUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(TransactionForm);
    req.flush(TransactionForm);
  });

  it('should read a transaction by id', () => {
    const transaction: Transaction = {
      id: '1',
      type: TransactionType.Exchange,
      amount: 100,
      date: new Date(),
      description: 'Test',
      id_user: 'u1',
    };

    service.read('1').subscribe((result) => {
      expect(result).toEqual(transaction);
    });

    const req = httpMock.expectOne(`${transactionsUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(transaction);
  });

  it('should update a transaction', () => {
    const updatedTransaction: Transaction = {
      id: '1',
      type: TransactionType.Transfer,
      amount: 150,
      date: new Date(),
      description: 'Updated',
      id_user: 'u1',
    };

    service.update('1', updatedTransaction).subscribe((result) => {
      expect(result).toEqual(updatedTransaction);
    });

    const req = httpMock.expectOne(`${transactionsUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTransaction);
    req.flush(updatedTransaction);
  });

  it('should delete a transaction', () => {
    service.delete('1').subscribe((result) => {
      expect(result).toBeNull();
    });

    const req = httpMock.expectOne(`${transactionsUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should get transaction by id', () => {
    const transaction: Transaction = {
      id: '2',
      type: TransactionType.Transfer,
      amount: 50,
      date: new Date(),
      description: 'Test2',
      id_user: 'u2',
    };

    service.getById('2').subscribe((result) => {
      expect(result).toEqual(transaction);
    });

    const req = httpMock.expectOne(`${transactionsUrl}/2`);
    expect(req.request.method).toBe('GET');
    req.flush(transaction);
  });

  it('should get transactions by user id', () => {
    const userId = 'u1';
    const userTransactions: Transaction[] = [
      {
        id: '1',
        type: TransactionType.Exchange,
        amount: 100,
        date: new Date(),
        description: 'Test',
        id_user: 'u1',
      },
    ];

    service.getByUserId(userId).subscribe((transactions) => {
      expect(transactions).toEqual(userTransactions);
    });

    const req = httpMock.expectOne(`${transactionsUrl}?id_user=${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(userTransactions);
  });

  it('should get all transactions', () => {
    const transactions: Transaction[] = [
      {
        id: '1',
        type: TransactionType.Exchange,
        amount: 100,
        date: new Date(),
        description: 'Test',
        id_user: 'u1',
      },
      {
        id: '2',
        type: TransactionType.Transfer,
        amount: 50,
        date: new Date(),
        description: 'Test2',
        id_user: 'u2',
      },
    ];
    service.getAll().subscribe((result) => {
      expect(result).toEqual(transactions);
    });
    const req = httpMock.expectOne(transactionsUrl);
    expect(req.request.method).toBe('GET');
    req.flush(transactions);
  });

  it('should get credits by user id', () => {
    const userId = 'u1';
    const credits: Transaction[] = [
      {
        id: '1',
        type: TransactionType.Exchange,
        amount: 100,
        date: new Date(),
        description: 'Credit',
        id_user: 'u1',
      },
    ];
    service.getCreditsByUserId(userId).subscribe((result) => {
      expect(result).toEqual(credits);
    });
    const req = httpMock.expectOne(
      `${transactionsUrl}?id_user=${userId}&type=exchange,loan`
    );
    expect(req.request.method).toBe('GET');
    req.flush(credits);
  });

  it('should get debits by user id', () => {
    const userId = 'u1';
    const debits: Transaction[] = [
      {
        id: '2',
        type: TransactionType.Transfer,
        amount: 50,
        date: new Date(),
        description: 'Debit',
        id_user: 'u1',
      },
    ];
    service.getDebitsByUserId(userId).subscribe((result) => {
      expect(result).toEqual(debits);
    });
    const req = httpMock.expectOne(
      `${transactionsUrl}?id_user=${userId}&type=transfer`
    );
    expect(req.request.method).toBe('GET');
    req.flush(debits);
  });

  it('should return user balance', () => {
    const userId = 'u1';
    const transactions: Transaction[] = [
      {
        id: '1',
        type: TransactionType.Exchange,
        amount: 100,
        date: new Date(),
        description: '',
        id_user: 'u1',
      },
      {
        id: '2',
        type: TransactionType.Transfer,
        amount: 40,
        date: new Date(),
        description: '',
        id_user: 'u1',
      },
    ];
    service.getUserBalance(userId).subscribe((balance) => {
      expect(balance).toEqual({
        totalCredits: 100,
        totalDebits: 40,
        balance: 60,
      });
    });
    const req = httpMock.expectOne(`${transactionsUrl}?id_user=${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(transactions);
  });

  it('should handle empty transactions for user balance', () => {
    const userId = 'u1';
    service.getUserBalance(userId).subscribe((balance) => {
      expect(balance).toEqual({ totalCredits: 0, totalDebits: 0, balance: 0 });
    });
    const req = httpMock.expectOne(`${transactionsUrl}?id_user=${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should handle http error', () => {
    service.getAll().subscribe({
      next: () => fail('should have failed'),
      error: (err) => {
        expect(err.status).toBe(500);
      },
    });
    const req = httpMock.expectOne(transactionsUrl);
    req.flush('Internal Server Error', {
      status: 500,
      statusText: 'Server Error',
    });
  });
});
