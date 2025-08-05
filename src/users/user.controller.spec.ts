import { Test, TestingModule } from '@nestjs/testing';
// import { APiKeyGuard } from 'src/common/guards/api-key.guard';
import { v4 as uuidv4 } from 'uuid';
import { APiKeyGuard } from '../common/guards/api-key.guard';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UsersController', () => {
  let controller: UserController;
  let mockService: Partial<UserService>;
  const commonUUID = uuidv4();

  mockService = {
    findAll: jest.fn(() => [
      { id: commonUUID, name: 'Test', email: 'test@test.com' },
    ]),
  };

  const mockApiKeyGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockService,
        },
        {
          provide: APiKeyGuard,
          useValue: mockApiKeyGuard, // ← notre guard simulé
        },
      ],
    }).compile();

    controller = new UserController(mockService as UserService);
  });

  // ! This doesn't pass because of the API guard
  // TODO: To be fixed
  it('should return users from the service', () => {
    const users = controller.findAll();
    expect(users).toEqual([
      { id: commonUUID, name: 'Test', email: 'test@test.com' },
    ]);
  });
});
