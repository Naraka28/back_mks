import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Flavours } from './entity/flavours.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FlavoursService {
  constructor(
    @InjectRepository(Flavours)
    private FlavoursRepository: Repository<Flavours>,
  ) {}
  async findAll(): Promise<Flavours[]> {
    try {
      return await this.FlavoursRepository.find();
    } catch (error) {
      console.error('Error fetching Flavours', error);
      throw new HttpException('message', HttpStatus.BAD_REQUEST);
    }
  }
  async findOne(id: number): Promise<Flavours | null> {
    try {
      return await this.FlavoursRepository.findOneBy({ id });
    } catch (error) {
      console.error('Error fetching a ', error);
      throw new InternalServerErrorException('Error ');
    }
  }
}
