import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { apiConfig } from '../../../app.config';

import { TransactionService } from './transaction-service';
import { Transaction } from '../../models/transaction';

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
    const newTransaction: Transaction = {
      id: '3',
      type: 'credit',
      amount: 200,
      date: new Date(),
      description: 'New',
      id_user: 'u3',
    };

    service.create(newTransaction).subscribe((transaction) => {
      expect(transaction).toEqual(newTransaction);
    });

    const req = httpMock.expectOne(transactionsUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTransaction);
    req.flush(newTransaction);
  });

  it('should read a transaction by id', () => {
    const transaction: Transaction = {
      id: '1',
      type: 'credit',
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
      type: 'debit',
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
      type: 'debit',
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
        type: 'credit',
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
});
