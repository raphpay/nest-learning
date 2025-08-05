import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { CreateUserDto, User } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const user: User = {
      id: uuidV4(),
      ...createUserDto,
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    if (!user) return null;
    console.log('user1', user);
    console.log('userdto', updateUserDto);
    // Object.assign(user, updateUserDto);
    Object.entries(updateUserDto).forEach(([key, value]) => {
      if (value !== undefined) {
        user[key] = value;
      }
    });
    console.log('user2', user);
    return user;
  }

  remove(id: string) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    this.users.splice(index, 1)[0];
  }
}
