import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { BikeController } from './bike.controller';
import { Bike } from './bike.entity';
import { BikeService } from './bike.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bike, User])],
  controllers: [BikeController],
  providers: [BikeService],
})
export class BikeModule {}
