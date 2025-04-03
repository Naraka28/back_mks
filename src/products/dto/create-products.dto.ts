import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsArray,
  IsPositive,
  isNumber,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  base_price: number;

  @ApiProperty()
  @IsNumber()
  type: number;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsArray()
  flavours: number[];

  @ApiProperty()
  @IsArray()
  sizes: number[];

  @ApiProperty()
  @IsArray()
  temp: number[];

  @ApiProperty()
  @IsArray()
  toppings: number[];

  @ApiProperty()
  @IsArray()
  milks: number[];

  @ApiProperty()
  @IsNumber()
  order: number;
}
