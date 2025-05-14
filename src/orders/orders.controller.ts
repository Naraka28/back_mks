import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Orders } from './entity/orders.entity';
import { CreateOrderDto } from './dto/create-orders.dto';
import { Tickets } from 'src/tickets/entity/tickets.entity';

@Controller('orders')
export class OrdersController {
  constructor(private ordersServive: OrdersService) {}

  @Get()
  async findAll(): Promise<Orders[]> {
    return this.ordersServive.findAll();
  }

  @Post('create')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )
  async createOrder(@Body() orders: CreateOrderDto[]): Promise<Tickets | null> {
    console.log(orders);
    return this.ordersServive.createOrderWithTicket(orders);
  }

  @Delete('delete/:id')
  async deleteOrder(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.ordersServive.deleteOrder(id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Orders | null> {
    return this.ordersServive.findOne(id);
  }

  @Get('ticket/:id')
  async findByTicketId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Orders[]> {
    return this.ordersServive.getOrderByTicketId(id);
  }
}
