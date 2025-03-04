import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersService) {}
  @Get()
  async findAllUsers() {
    const users = await this.usersServices.findAll();
    return { data: users, message: 'All good' };
  }
  @Post()
  createUser() {
    return 1;
  }
  @Get(':id')
  findByOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersServices.findOne(id);
  }
}
