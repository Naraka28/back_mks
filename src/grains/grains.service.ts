import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grains } from './entity/grains.entity';
import { CreateGrainDto } from './dto/create-grains.dto';

@Injectable()
export class GrainsService {
  constructor(
    @InjectRepository(Grains) private grainsRepository: Repository<Grains>,
  ) {}
  async findAll(): Promise<Grains[]> {
    try {
      return await this.grainsRepository.find();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error fetching Grains');
    }
  }
  async findOne(id: number): Promise<Grains | null> {
    try {
      return await this.grainsRepository.findOneBy({ id });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async createGrain(createGrainDto: CreateGrainDto): Promise<Grains> {
    try {
      const newGrain = this.grainsRepository.create(createGrainDto);
      return await this.grainsRepository.save(newGrain);
    } catch (error) {
      throw new InternalServerErrorException('Error at creating grain');
    }
  }
}
