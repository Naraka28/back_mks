import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderToppings } from './entity/order_toppings.entity';
import { OrderToppingsController } from './order_toppings.controller';
import { OrderToppingsService } from './order_toppings.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderToppings])],
  controllers: [OrderToppingsController],
  providers: [OrderToppingsService],
  exports: [OrderToppingsService],
})
export class OrderToppingsModule {}
