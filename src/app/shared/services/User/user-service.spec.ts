import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user-service';
import { User } from '../../models/user';
import { apiConfig } from '../../../app.config';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const usersUrl = apiConfig.baseUrl + apiConfig.usersEndpoint;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a user', () => {
    const newUser: User = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    service.create(newUser).subscribe((user) => {
      expect(user).toEqual(newUser);
    });

    const req = httpMock.expectOne(usersUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(newUser);
  });

  it('should read a user by id', () => {
    const user: User = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };
    const userId = '1';

    service.read(userId).subscribe((result) => {
      expect(result).toEqual(user);
    });

    const req = httpMock.expectOne(`${usersUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(user);
  });

  it('should update a user', () => {
    const updatedUser: User = {
      id: '1',
      name: 'Updated User',
      email: 'updated@example.com',
      password: 'newpassword',
    };
    const userId = '1';

    service.update(userId, updatedUser).subscribe((result) => {
      expect(result).toEqual(updatedUser);
    });

    const req = httpMock.expectOne(`${usersUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedUser);
    req.flush(updatedUser);
  });

  it('should delete a user', () => {
    const userId = '1';
    service.delete(userId).subscribe((result) => {
      expect(result).toBeNull();
    });

    const req = httpMock.expectOne(`${usersUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should get all users', () => {
    const users: User[] = [
      { id: '1', name: 'User1', email: 'user1@example.com', password: 'pass1' },
      { id: '2', name: 'User2', email: 'user2@example.com', password: 'pass2' },
    ];

    service.getAll().subscribe((result) => {
      expect(result).toEqual(users);
    });

    const req = httpMock.expectOne(usersUrl);
    expect(req.request.method).toBe('GET');
    req.flush(users);
  });

  it('should get user by id', () => {
    const user: User = {
      id: '1',
      name: 'User1',
      email: 'user1@example.com',
      password: 'pass1',
    };
    const userId = '1';

    service.getById(userId).subscribe((result) => {
      expect(result).toEqual(user);
    });

    const req = httpMock.expectOne(`${usersUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(user);
  });
});