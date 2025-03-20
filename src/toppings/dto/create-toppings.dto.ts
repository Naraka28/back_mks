import { IsInt, IsPositive, IsString } from "class-validator";

export class CreateToppingsDto {
    @IsString()
    name: string;
    @IsInt()
    @IsPositive()
    price: number;
}