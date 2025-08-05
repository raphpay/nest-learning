import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bike } from 'src/bikes/bike.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateBikeDto } from './dto/create-bike.dto';

@Injectable()
export class BikeService {
  constructor(
    @InjectRepository(Bike)
    private bikeRepo: Repository<Bike>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createBikeDto: CreateBikeDto) {
    const { brand, size, ownerId } = createBikeDto;

    const user = await this.userRepo.findOne({ where: { id: ownerId } });

    if (!user) {
      throw new NotFoundException(`User with id ${ownerId} not found`);
    }

    const bike = this.bikeRepo.create({
      brand,
      size,
      owner: user,
    });

    return this.bikeRepo.save(bike);
  }

  findAll() {
    return this.bikeRepo.find({ relations: ['owner'] });
  }
}
