import { IsInt, IsPositive, IsString } from "class-validator";

export class CreateFlavourDto {
    @IsString()
    name: string;
    @IsInt()
    @IsPositive()
    price: number;
}