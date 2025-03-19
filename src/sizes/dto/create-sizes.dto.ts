import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateSizeDto {
  @IsString()
  name: string;
  @IsInt()
  @IsPositive()
  price: number;
}
