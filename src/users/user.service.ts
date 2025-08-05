import { Injectable } from '@nestjs/common';
import { CreateUserDto, User } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private users: User[] = [];
  private idCounter = 1;

  create(createUserDto: CreateUserDto) {
    const user: User = {
      id: this.idCounter++,
      ...createUserDto,
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((u) => u.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    if (!user) return null;
    Object.assign(user, updateUserDto);
    return user;
  }

  remove(id: number) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    this.users.splice(index, 1)[0];
  }
}
