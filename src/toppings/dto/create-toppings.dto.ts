import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateToppingsDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  base_price: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  max_quantity: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  free_quantity: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  price: number;
}
