import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { RoleList, Roles } from 'src/roles/entity/roles.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Roles) private rolesRepository: Repository<Roles>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      const users = await this.usersRepository.find({
        relations: { role: true },
      });
      if (users.length === 0) {
        throw new NotFoundException('Milks not founded');
      }
      return users;
    } catch (error) {
      console.error('Error fetching users', error);
      throw new InternalServerErrorException('Error at retrieving Users');
    }
  }
  async findOne(id: number): Promise<User | null> {
    try {
      return this.usersRepository.findOne({
        where: { id },
        relations: { role: true },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        `Unexpected error finding user with ID: ${id}`,
      );
    }
  }
  async createUser(userDto: CreateUserDto): Promise<User> {
    try {
      const role = await this.rolesRepository.findOne({
        where: { id: userDto.roleId },
      });
      if (!role) {
        throw new NotFoundException(`Role with ID ${userDto.roleId} not found`);
      }
      const { roleId, ...userData } = userDto;

      const newUser = this.usersRepository.create({ ...userData, role });
      if (!newUser) {
        throw new BadRequestException(
          `Couldnt create new User with name ${userDto.name}`,
        );
      }
      return this.usersRepository.save(newUser);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Unexpected error creating user');
    }
  }
  async updateUser(
    id: number,
    updateUser: CreateUserDto,
  ): Promise<User | null> {
    try {
      const role = await this.rolesRepository.findOne({
        where: { id: updateUser.roleId },
      });
      if (!role) {
        throw new NotFoundException(
          `Role with ID ${updateUser.roleId} not found`,
        );
      }
      const { roleId, ...newUserData } = updateUser;
      const user = { ...newUserData, role };

      const result = await this.usersRepository.update(id, user);
      if (result.affected === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return this.usersRepository.findOne({ where: { id } });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        `Unexpected error updating user with name: ${updateUser.name}`,
      );
    }
  }
  async deleteUser(id: number): Promise<{ message: string }> {
    try {
      const result = await this.usersRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Couldnt delete user with ID ${id}`);
      }
      return { message: `Succesfully deleted user with ID: ${id}` };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        `Unexpected error deleting user with ID: ${id}`,
      );
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({
        where: { email },
      });
      if (!user) {
        throw new NotFoundException(`Email for not found`);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Unexpected error at finding email',
      );
    }
  }
}
