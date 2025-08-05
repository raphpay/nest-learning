import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { APiKeyGuard } from 'src/common/guards/api-key.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUIDValidatorPipe } from './pipes/uuid-validator.pipe';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('by-id/:id')
  findOne(@Param('id', UUIDValidatorPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Get('bike/:id')
  findBike(@Param('id', UUIDValidatorPipe) id: string) {
    return this.userService.findBike(id);
  }

  @UseGuards(APiKeyGuard)
  @Get('secure')
  getSecureData() {
    return { message: 'Access granted' };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @Req() req: Request,
  ) {
    console.log('raw body:', req.body);
    return this.userService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
