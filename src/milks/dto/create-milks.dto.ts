import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateMilkDto {
  @IsString()
  name: string;
  @IsInt()
  @IsPositive()
  price: number;
}
