import { IsInt, IsPositive, IsString } from "class-validator";

export class CreateProductsDto {
    @IsString()
    name: string;
    
    @IsInt()
    @IsPositive()
    base_price: number;

    @IsString()
    @IsPositive()
    type: number;

    
    
}