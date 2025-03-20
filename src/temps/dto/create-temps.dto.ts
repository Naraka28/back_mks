import { IsInt, IsPositive, IsString } from "class-validator";

export class CreateTempsDto {
    @IsString()
    name: string;
    @IsInt()
    @IsPositive()
    price: number;
}