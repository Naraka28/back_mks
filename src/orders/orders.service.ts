import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './entity/orders.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
  ) {}
  async findAll(): Promise<Orders[]> {
    try {
      const result = await this.ordersRepository.find({
        relations: [
          'product',
          'toppings',
          'ticket',
          'flavour',
          'size',
          'milk',
          'temperature',
        ],
      });
      if (result.length === 0) {
        throw new NotFoundException('Orders not found');
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Unexpected error fetching Products',
      );
    }
  }
  async findOne(id: number): Promise<Orders | null> {
    try {
      const result = await this.ordersRepository.findOne({
        where: { id },
        relations: [
          'product',
          'toppings',
          'ticket',
          'flavour',
          'size',
          'milk',
          'temperature',
        ],
      });
      if (!result) {
        throw new NotFoundException(`Order with ID: ${id} not found`);
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        `Unexpected error retrieving order with ID: ${id}`,
      );
    }
  }
}
