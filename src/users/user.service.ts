import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create({
      id: uuidV4(), // ou laisse TypeORM gérer l'id
      ...createUserDto,
    });

    return this.userRepo.save(user);
  }

  async findAll() {
    return this.userRepo.find({ relations: ['bike'] });
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['bike'],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findBike(id: string) {
    const user = await this.findOne(id);

    if (!user.bike) {
      throw new NotFoundException(`User with id ${id} doesn't have a bike`);
    }

    return user.bike;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    Object.assign(user, updateUserDto);

    return this.userRepo.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.userRepo.remove(user);
  }
}
