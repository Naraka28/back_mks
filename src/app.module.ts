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
import { SizesService } from './sizes/sizes.service';
import { SizesController } from './sizes/sizes.controller';
import { SizesModule } from './sizes/sizes.module';
import { MilksService } from './milks/milks.service';
import { MilksController } from './milks/milks.controller';
import { MilksModule } from './milks/milks.module';
import { ItemFlavoursService } from './item_flavours/item_flavours.service';
import { ItemFlavoursController } from './item_flavours/item_flavours.controller';
import { ItemFlavoursModule } from './item_flavours/item_flavours.module';
import { ToppingsService } from './toppings/toppings.service';
import { ToppingsController } from './toppings/toppings.controller';
import { ToppingsModule } from './toppings/toppings.module';
import { FlavoursService } from './flavours/flavours.service';
import { FlavoursController } from './flavours/flavours.controller';
import { FlavoursModule } from './flavours/flavours.module';
import { InventoryService } from './inventory/inventory.service';
import { InventoryController } from './inventory/inventory.controller';
import { InventoryModule } from './inventory/inventory.module';
import { ItemToppingsService } from './item_toppings/item_toppings.service';
import { ItemToppingsController } from './item_toppings/item_toppings.controller';
import { ItemToppingsModule } from './item_toppings/item_toppings.module';

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
    SizesModule,
    MilksModule,
    ItemFlavoursModule,
    ToppingsModule,
    FlavoursModule,
    InventoryModule,
    ItemToppingsModule,
  ],
  controllers: [AppController, OrdersController, MenuItemsController, RolesController, OrderToppingsController, SizesController, MilksController, ItemFlavoursController, ToppingsController, FlavoursController, InventoryController, ItemToppingsController],
  providers: [AppService, OrdersService, MenuItemsService, RolesService, OrderToppingsService, SizesService, MilksService, ItemFlavoursService, ToppingsService, FlavoursService, InventoryService, ItemToppingsService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
