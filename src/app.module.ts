import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entity/user.entity';
import { UsersController } from './users/users.controller';
import 'dotenv/config';
import { UsersService } from './users/users.service';
import { TicketsModule } from './tickets/tickets.module';
import { OrdersService } from './orders/orders.service';
import { OrdersController } from './orders/orders.controller';
import { OrdersModule } from './orders/orders.module';
import { MenuItemsService } from './menu_items/menu_items.service';
import { MenuItemsController } from './menu_items/menu_items.controller';
import { MenuItemsModule } from './menu_items/menu_items.module';
import { RolesService } from './roles/roles.service';
import { RolesController } from './roles/roles.controller';
import { RolesModule } from './roles/roles.module';
import { OrderToppingsService } from './order_toppings/order_toppings.service';
import { OrderToppingsController } from './order_toppings/order_toppings.controller';
import { OrderToppingsModule } from './order_toppings/order_toppings.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PASSWORD),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TicketsModule,
    OrdersModule,
    MenuItemsModule,
    RolesModule,
    OrderToppingsModule,
  ],
  controllers: [AppController, OrdersController, MenuItemsController, RolesController, OrderToppingsController],
  providers: [AppService, OrdersService, MenuItemsService, RolesService, OrderToppingsService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
