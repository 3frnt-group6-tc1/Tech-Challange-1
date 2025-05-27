import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { TransactionService } from '../../services/Transaction/transaction-service';
import { UserService } from '../../services/User/user-service';
import { TransactionEventService } from '../../services/TransactionEvent/transaction-event.service';
import { of, throwError, Subject } from 'rxjs';
import { Transaction, TransactionType } from '../../models/transaction';
import { systemConfig } from '../../../app.config';
import { User } from '../../models/user';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let transactionServiceMock: jasmine.SpyObj<TransactionService>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let transactionEventServiceMock: {
    transactionCreated$: Subject<Transaction>;
    transactionUpdated$: Subject<Transaction>;
    transactionDeleted$: Subject<string>;
  };

  const mockUser: User = {
    id: systemConfig.userId,
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  };

  const mockTransactions: Transaction[] = [
    {
      id: '1',
      id_user: systemConfig.userId,
      type: TransactionType.Exchange,
      amount: 200,
      description: 'Salary',
      date: new Date('2023-01-05')
    },
    {
      id: '2',
      id_user: systemConfig.userId,
      type: TransactionType.Loan,
      amount: 500,
      description: 'Loan',
      date: new Date('2023-01-10')
    },
    {
      id: '3',
      id_user: systemConfig.userId,
      type: TransactionType.Transfer,
      amount: 300,
      description: 'Bills',
      date: new Date('2023-01-20')
    }
  ];

  beforeEach(async () => {
    transactionServiceMock = jasmine.createSpyObj('TransactionService', ['getByUserId']);
    userServiceMock = jasmine.createSpyObj('UserService', ['getById']);

    transactionEventServiceMock = {
      transactionCreated$: new Subject<Transaction>(),
      transactionUpdated$: new Subject<Transaction>(),
      transactionDeleted$: new Subject<string>()
    };

    userServiceMock.getById.and.returnValue(of(mockUser));
    transactionServiceMock.getByUserId.and.returnValue(of(mockTransactions));

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: TransactionService, useValue: transactionServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: TransactionEventService, useValue: transactionEventServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    jasmine.clock().install();
    const baseTime = new Date(2023, 0, 15, 10, 30);
    jasmine.clock().mockDate(baseTime);

    fixture.detectChanges();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should set current date on init', () => {
      expect(component.currentDate).toContain('15/01/2023 10:30');
    });

    it('should fetch user on init', () => {
      expect(userServiceMock.getById).toHaveBeenCalledWith(systemConfig.userId);
      expect(component.userName).toBe('Test User');
    });

    it('should fetch transactions after user is loaded', () => {
      expect(transactionServiceMock.getByUserId).toHaveBeenCalledWith(mockUser.id);
      expect(component.transactions.length).toBe(3);
    });

    it('should calculate balance correctly on init', () => {
      // Use normalized formatting to avoid invisible character issues
      expect(component.balance.replace(/\s/g, '')).toBe('R$400,00'.replace(/\s/g, ''));
    });

    it('should calculate total entries correctly', () => {
      expect(component.totalEntries.replace(/\s/g, '')).toBe('R$700,00'.replace(/\s/g, ''));
    });

    it('should calculate total exits correctly', () => {
      expect(component.totalExits.replace(/\s/g, '')).toBe('R$300,00'.replace(/\s/g, ''));
    });

    it('should organize transactions into weekly data', () => {
      expect(component.transactionData.length).toBe(4);

      const week1 = component.transactionData.find(d => d.day === 'Semana 1');
      expect(week1?.entries).toBe(200);
      expect(week1?.exits).toBe(0);

      const week2 = component.transactionData.find(d => d.day === 'Semana 2');
      expect(week2?.entries).toBe(500);
      expect(week2?.exits).toBe(0);

      const week3 = component.transactionData.find(d => d.day === 'Semana 3');
      expect(week3?.entries).toBe(0);
      expect(week3?.exits).toBe(300);
    });
  });

  describe('Error Handling', () => {
    it('should handle user fetch error', fakeAsync(() => {
      userServiceMock.getById.and.returnValue(throwError(() => new Error('User fetch error')));

      fixture = TestBed.createComponent(DashboardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      tick();

      expect(component.isLoading).toBeFalse();
      expect(component.errorMessage).toBe('Erro ao buscar usuário.');
    }));

    it('should handle transaction fetch error', fakeAsync(() => {
      transactionServiceMock.getByUserId.and.returnValue(throwError(() => new Error('Transaction fetch error')));

      userServiceMock.getById.and.returnValue(of(mockUser));

      fixture = TestBed.createComponent(DashboardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      tick();

      expect(component.isLoading).toBeFalse();
      expect(component.errorMessage).toBe('Erro ao buscar transações.');
    }));
  });

  describe('Transaction Events', () => {
    it('should handle new transaction events', () => {
      const newTransaction: Transaction = {
        id: '4',
        id_user: systemConfig.userId,
        type: TransactionType.Exchange,
        amount: 150,
        description: 'New Income',
        date: new Date('2023-01-25')
      };

      expect(component.transactions.length).toBe(3);
      expect(component.balance.replace(/\s/g, '')).toBe('R$400,00'.replace(/\s/g, ''));

      transactionEventServiceMock.transactionCreated$.next(newTransaction);

      expect(component.transactions.length).toBe(4);
      expect(component.balance.replace(/\s/g, '')).toBe('R$550,00'.replace(/\s/g, ''));

      const week4 = component.transactionData.find(d => d.day === 'Semana 4');
      expect(week4?.entries).toBe(150);
    });

    it('should handle transaction update events', () => {
      const updatedTransaction: Transaction = {
        ...mockTransactions[0],
        amount: 300
      };

      expect(component.totalEntries.replace(/\s/g, '')).toBe('R$700,00'.replace(/\s/g, ''));

      transactionEventServiceMock.transactionUpdated$.next(updatedTransaction);

      expect(component.totalEntries.replace(/\s/g, '')).toBe('R$800,00'.replace(/\s/g, ''));
      expect(component.balance.replace(/\s/g, '')).toBe('R$500,00'.replace(/\s/g, ''));
    });

    it('should handle transaction delete events', () => {
      expect(component.transactions.length).toBe(3);
      expect(component.totalEntries.replace(/\s/g, '')).toBe('R$700,00'.replace(/\s/g, ''));

      transactionEventServiceMock.transactionDeleted$.next('1');

      expect(component.transactions.length).toBe(2);
      expect(component.totalEntries.replace(/\s/g, '')).toBe('R$500,00'.replace(/\s/g, ''));
      expect(component.balance.replace(/\s/g, '')).toBe('R$200,00'.replace(/\s/g, ''));
    });

    it('should ignore transaction events for other users', () => {
      const otherUserTransaction: Transaction = {
        id: '5',
        id_user: 'different-user-id',
        type: TransactionType.Exchange,
        amount: 100,
        description: 'Other User Income',
        date: new Date()
      };

      expect(component.transactions.length).toBe(3);

      transactionEventServiceMock.transactionCreated$.next(otherUserTransaction);
      expect(component.transactions.length).toBe(3);

      transactionEventServiceMock.transactionUpdated$.next({
        ...otherUserTransaction,
        amount: 200
      });
      expect(component.transactions.length).toBe(3);

      transactionEventServiceMock.transactionDeleted$.next('5');
      expect(component.transactions.length).toBe(3);
    });
  });

  describe('UI Interactions', () => {
    it('should toggle balance visibility', () => {
      expect(component.showBalance).toBeTrue();

      component.toggleBalance();
      expect(component.showBalance).toBeFalse();

      component.toggleBalance();
      expect(component.showBalance).toBeTrue();
    });
  });

  describe('Helper Functions', () => {
    it('should format balance correctly', () => {
      expect(component.formatBalance(1234.56).replace(/\s/g, '')).toBe('R$1.234,56'.replace(/\s/g, ''));
      expect(component.formatBalance(0).replace(/\s/g, '')).toBe('R$0,00'.replace(/\s/g, ''));
      expect(component.formatBalance(-1000).replace(/\s/g, '')).toBe('-R$1.000,00'.replace(/\s/g, ''));
    });

    it('should set current date with correct format', () => {
      component.setCurrentDate();
      // Modify the regex to account for "Domingo" without the -feira suffix
      expect(component.currentDate).toMatch(/^[A-Za-z\u00C0-\u00FF]+(-feira)?, \d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/);
    });
  });
});