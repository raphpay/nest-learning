import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';
import { CreateBikeDto } from './create-bike.dto';

export class UpdateBikeDto extends PartialType(CreateBikeDto) {
  @IsUUID()
  ownerId?: string;
}
