import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderToppingsService } from './order_toppings.service';
import { OrderToppings } from './entity/order_toppings.entity';

@Controller('order-toppings')
export class OrderToppingsController {
  constructor(private readonly orderToppingsService: OrderToppingsService) {}

  @Get()
  async findAll(): Promise<OrderToppings[]> {
    return this.orderToppingsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<OrderToppings | null> {
    return this.orderToppingsService.findOne(id);
  }

  @Get('order/:orderId')
  async findByOrderId(
    @Param('orderId') orderId: number,
  ): Promise<OrderToppings[]> {
    return this.orderToppingsService.findByOrderId(orderId);
  }

  @Post()
  async create(
    @Body() orderTopping: Partial<OrderToppings>,
  ): Promise<OrderToppings> {
    return this.orderToppingsService.create(orderTopping);
  }
}
