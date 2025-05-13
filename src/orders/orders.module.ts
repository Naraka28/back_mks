import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entity/orders.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { User } from 'src/users/entity/user.entity';
import { OrderToppingsModule } from 'src/order_toppings/order_toppings.module';
import { OrderToppings } from 'src/order_toppings/entity/order_toppings.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, User, OrderToppings]),
    OrderToppingsModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
