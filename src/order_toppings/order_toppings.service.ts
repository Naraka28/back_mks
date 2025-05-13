import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderToppings } from './entity/order_toppings.entity';

@Injectable()
export class OrderToppingsService {
  constructor(
    @InjectRepository(OrderToppings)
    private readonly orderToppingsRepository: Repository<OrderToppings>,
  ) {}

  async findAll(): Promise<OrderToppings[]> {
    return this.orderToppingsRepository.find({ relations: ['topping'] });
  }

  async findOne(id: number): Promise<OrderToppings | null> {
    return this.orderToppingsRepository.findOne({
      where: { id },
      relations: ['topping'],
    });
  }

  async findByOrderId(orderId: number): Promise<OrderToppings[]> {
    return this.orderToppingsRepository.find({
      where: { order: { id: orderId } },
      relations: ['topping'],
    });
  }

  async create(orderTopping: Partial<OrderToppings>): Promise<OrderToppings> {
    return this.orderToppingsRepository.save(orderTopping);
  }

  // async update(id: number, orderTopping: Partial<OrderToppings>): Promise<OrderToppings> {
  //     await this.orderToppingsRepository.update(id, orderTopping);
  //     return this.findOne(id);
  // }
  // async remove(id: number): Promise<void> {
  //     await this.orderToppingsRepository.delete(id);
  // }
}
