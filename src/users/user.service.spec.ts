import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';
import { UserService } from './user.service';

const commonUUID = uuidv4();

const mockUser: User = {
  id: commonUUID,
  name: 'Alice',
  email: 'email@test.com',
};

describe('UserService', () => {
  let service: UserService;
  let mockRepo: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn().mockResolvedValue(mockUser),
            save: jest.fn(),
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    mockRepo = module.get(getRepositoryToken(User));
  });

  it('should create a user', async () => {
    const dto = { name: 'John', email: 'john@example.com' };
    mockRepo.create.mockReturnValue({ ...mockUser });
    mockRepo.save.mockResolvedValue(mockUser);

    const result = await service.create(dto);
    expect(mockRepo.create).toHaveBeenCalledWith(expect.objectContaining(dto));
    expect(mockRepo.save).toHaveBeenCalled();
    expect(result).toEqual(mockUser);
  });

  it('should find all users with bikes', async () => {
    mockRepo.find.mockResolvedValue([mockUser]);

    const result = await service.findAll();
    expect(mockRepo.find).toHaveBeenCalledWith({ relations: ['bike'] });
    expect(result).toEqual([mockUser]);
  });

  it('should return all users', async () => {
    const mockUsers = [mockUser];
    mockRepo.find.mockResolvedValue(mockUsers);

    const users = await service.findAll();
    expect(users).toEqual(mockUsers);
  });

  it('should throw NotFoundException if user not found', async () => {
    mockRepo.findOne.mockResolvedValue(null);

    await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
  });

  // it('should return bike from user', async () => {
  //   mockRepo.findOne.mockResolvedValue(mockUser);

  //   const bike = await service.findBike(commonUUID);
  //   expect(bike).toEqual(mockUser.bike);
  // });

  it('should throw if user has no bike', async () => {
    mockRepo.findOne.mockResolvedValue({ ...mockUser, bike: undefined });

    await expect(service.findBike(commonUUID)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should update user', async () => {
    const updatedUser = { ...mockUser, name: 'Jane' };
    mockRepo.findOne.mockResolvedValue(mockUser);
    mockRepo.save.mockResolvedValue(updatedUser);

    const result = await service.update(commonUUID, { name: 'Jane' });
    expect(result.name).toEqual('Jane');
  });

  it('should remove user', async () => {
    mockRepo.findOne.mockResolvedValue(mockUser);
    mockRepo.remove.mockResolvedValue(mockUser);

    const result = await service.remove(commonUUID);
    expect(mockRepo.remove).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockUser);
  });
});
