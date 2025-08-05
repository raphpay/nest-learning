import { Body, Controller, Get, Post } from '@nestjs/common';
import { BikeService } from './bike.service';
import { CreateBikeDto } from './dto/create-bike.dto';

@Controller('bikes')
export class BikeController {
  constructor(private readonly bikeService: BikeService) {}

  @Post()
  create(@Body() createBikeDto: CreateBikeDto) {
    return this.bikeService.create(createBikeDto);
  }

  @Get()
  findAll() {
    return this.bikeService.findAll();
  }
}
