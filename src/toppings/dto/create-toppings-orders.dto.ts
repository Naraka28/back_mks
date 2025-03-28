import { IsInt, IsPositive, Min, Max } from 'class-validator';

export class ToppingOrderDto {
  @IsInt()
  @IsPositive()
  id: number;

  @IsInt()
  @Min(1)
  @Max(5)
  quantity: number;
}
