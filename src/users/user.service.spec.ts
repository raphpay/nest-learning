import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  it('should create a user', () => {
    const user = service.create({ name: 'Alice', email: 'email@jest.com' });
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Alice');
    expect(user.email).toBe('email@jest.com');
  });

  it('should find a user by ID', () => {
    const created = service.create({ name: 'Alice', email: 'email@jest.com' });
    const found = service.findOne(created.id);
    expect(found).toEqual(created);
  });

  it('should return undefined for unknown ID', () => {
    expect(() => service.findOne('unknown-id')).toThrow(
      'User with id unknown-id not found',
    );
  });

  it('should return all users', () => {
    service.create({ name: 'Alice', email: 'email@jest.com' });
    service.create({ name: 'dan', email: 'dan@jest.com' });
    const users = service.findAll();
    expect(users.length).toEqual(2);
  });
});
