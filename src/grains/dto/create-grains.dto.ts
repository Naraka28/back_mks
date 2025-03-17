import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateGrainDto {
  @IsString()
  name: string;
  @IsInt()
  @IsPositive()
  price: number;
}
