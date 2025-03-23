import { IsString, IsNumber, IsArray,  IsPositive, isNumber } from 'class-validator';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsNumber()
    @IsPositive()
    base_price: number;

    @IsNumber()
    type: number;

    @IsString()
    image: string;

    @IsArray()
    flavours: number[];

    @IsArray()
    sizes: number[];

    @IsArray()
    temp: number[];

    @IsArray()
    toppings: number[];

    @IsArray()
    milks: number[];

    @IsNumber()
    order: number;    
}
