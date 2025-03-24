import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersService) {}
  @Get()
  async findAllUsers() {
    const users = await this.usersServices.findAll();
    return { data: users, message: 'All good' };
  }
  @Post('create')
  createUser(@Body() newUser: CreateUserDto): Promise<User> {
    return this.usersServices.createUser(newUser);
  }
  @Put('update/:id')
  async updateUser(
    @Body() updateUser: CreateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User | null> {
    return this.usersServices.updateUser(id, updateUser);
  }
  @Get(':id')
  findByOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersServices.findOne(id);
  }
  @Delete('delete/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this, this.usersServices.deleteUser(id);
  }
}
