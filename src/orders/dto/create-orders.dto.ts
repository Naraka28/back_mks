import { Type } from 'class-transformer';
import { IsArray, IsInt, ValidateNested } from 'class-validator';
import { ToppingOrderDto } from 'src/toppings/dto/create-toppings-orders.dto';

export class CreateOrderDto {
  @IsInt()
  productId: number;

  @IsInt()
  flavoursId: number;

  @IsInt()
  sizesId: number;

  @IsInt()
  tempId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ToppingOrderDto)
  toppings: ToppingOrderDto[];
  @IsInt()
  milksId: number;

  @IsInt()
  cashierId: number;
}
