import { IsString, IsUUID } from 'class-validator';

export class CreateBikeDto {
  @IsString()
  brand: string;

  @IsString()
  size: string;

  @IsUUID()
  ownerId: string;
}
