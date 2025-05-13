import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString, ValidateNested } from 'class-validator';
import { ToppingOrderDto } from 'src/toppings/dto/create-toppings-orders.dto';

export class CreateOrderDto {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  productId: number;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  flavoursId: number;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  sizesId: number;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  tempId: number;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ToppingOrderDto)
  toppings: ToppingOrderDto[];

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  milksId: number;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  cashierId: number;

  @ApiProperty()
  @IsString()
  payment_method: string;
}
