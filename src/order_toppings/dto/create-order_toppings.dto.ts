import { ApiProperty } from '@nestjs/swagger';
import { IsInt,  IsPositive } from 'class-validator';

export class CreateOrderToppingDto {
    @ApiProperty()
    @IsInt()
    @IsPositive()
    order: number;

    @ApiProperty()
    @IsInt()
    @IsPositive()
    topping: number;

    @ApiProperty()
    @IsInt()
    @IsPositive()
    quantity: number; 



}
