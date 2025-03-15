import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Flavours } from './entity/flavours.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFlavourDto } from './dto/create-flavour.dto';

@Injectable()
export class FlavoursService {
  constructor(
    @InjectRepository(Flavours)
    private FlavoursRepository: Repository<Flavours>,
  ) {}

  async create(createFlavourDto:CreateFlavourDto){
    const newflavour=this.FlavoursRepository.create(createFlavourDto);
    try {
      return await this.FlavoursRepository.save(newflavour);   
    } catch (error) {
      
    }
  }

  async update(id:number, updateFlavourDto:CreateFlavourDto){
    try {
      await this.FlavoursRepository.update(id, updateFlavourDto);
      return await this.FlavoursRepository.findOne({ where: { id } });
    } catch (error) {
      console.error('Error al actualizar el sabor:', error);
      throw new HttpException('No se pudo actualizar el sabor', HttpStatus.INTERNAL_SERVER_ERROR);
    }    
  }
  


  async delete(id:number){
   // await this.FlavoursRepository.softDelete(id);
    //await this.FlavoursRepository.softRemove(id);
  }


  async findAll(): Promise<Flavours[]> {
    try {
      return await this.FlavoursRepository.find();
    } catch (error) {
      console.error('Error fetching Flavours', error);
      throw new HttpException('Couldn`t find flavours', HttpStatus.BAD_REQUEST);
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
