import { Module } from '@nestjs/common';
import { OrderToppingsService } from './order_toppings/order_toppings.service';
import { OrderToppingsController } from './order_toppings/order_toppings.controller';
import { OrderToppingsModule } from './order_toppings/order_toppings.module';

@Module({
  providers: [OrderToppingsService],
  controllers: [OrderToppingsController],
  imports: [OrderToppingsModule]
})
export class OrderToppingsModule {}
