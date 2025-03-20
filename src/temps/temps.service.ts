import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Temps } from './entity/temps.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTempsDto } from './dto/create-temps.dto';

@Injectable()
export class TempsService {
    constructor(
        @InjectRepository(Temps) private TempsRepository: Repository<Temps>,
    ){}
    async findAll():Promise<Temps[]> {
        try {
            const result = await this.TempsRepository.find();
            if (result.length === 0) {
                throw new NotFoundException('Temps not founded');
            }
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Unexpected error fetching Temps');
        }
    }

    async findOne(id: number): Promise<Temps | null> {
        try {
            return await this.TempsRepository.findOne({
                where: { id },
                relations: { products: true },
            });
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(
                `Failed to retrieve Topping with ID ${id}`,
            );
        }
    }

    async createTopping(createTopping: CreateTempsDto): Promise<Temps> {
     try {
           const newTopping = this.TempsRepository.create(createTopping);
           if (!newTopping) {
             throw new BadRequestException('Couldnt create new topping');
           }
           return this.TempsRepository.save(newTopping);
         } catch (error) {
           console.error(error);
           if (error.code === '23505') {
             throw new ConflictException(`Topping with name ${createTopping.name}`);
           }
           throw new InternalServerErrorException(
             `Unexpected error at creating new topping ${createTopping.name}`,
           );
         }
       }
    
    //Pendiente update y delete Temps

      async updateTopping(
        id: number,
        updateTopping: CreateTempsDto,
      ): Promise<Temps | null> {
        try {
          const result = await this.TempsRepository.update(id, updateTopping);
          if (result.affected === 0) {
            throw new NotFoundException(`Topping with ID ${id} not found`);
          }
          return this.TempsRepository.findOne({
            where: { id },
            relations: { products: true },
          });
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException();
        }
      }

      async deleteTopping(id: number): Promise<{ message: string }> {
        try {
          const result = await this.TempsRepository.delete(id);
          if (result.affected === 0) {
            throw new NotFoundException(`Couldnt delete topping with id ${id}`);
          }
          return { message: 'Successfully deleted Topping' };
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException('Unexpected error deleting Topping');
        }
      }
}