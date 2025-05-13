import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive, Min, Max } from 'class-validator';

export class ToppingOrderDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  quantity: number;
}
