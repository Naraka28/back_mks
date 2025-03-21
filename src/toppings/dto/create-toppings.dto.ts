import { IsInt, IsPositive, IsString } from "class-validator";

export class CreateToppingsDto {
    @IsString()
    name: string;
    @IsInt()
    @IsPositive()
    base_price: number;
    @IsInt()
    @IsPositive()
    max_quantity: number;
    @IsInt()
    @IsPositive()
    free_quantity: number;
    @IsInt()
    @IsPositive()
    price: number;
    
}