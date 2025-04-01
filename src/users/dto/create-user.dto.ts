import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsInt()
  roleId: number;
}
