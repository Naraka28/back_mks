import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      console.error('Error fetching users', error);
      throw new InternalServerErrorException('Error at retrieving Users');
    }
  }
  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }
}
