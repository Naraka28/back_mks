import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entity/user.entity';
import { TicketsModule } from './tickets/tickets.module';
import { OrdersModule } from './orders/orders.module';
import { RolesModule } from './roles/roles.module';
import { OrderToppingsModule } from './order_toppings/order_toppings.module';
import { SizesModule } from './sizes/sizes.module';
import { MilksModule } from './milks/milks.module';
import { ToppingsModule } from './toppings/toppings.module';
import { FlavoursModule } from './flavours/flavours.module';
import { Roles } from './roles/entity/roles.entity';

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
      entities: [User, Roles],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TicketsModule,
    OrdersModule,
    RolesModule,
    OrderToppingsModule,
    SizesModule,
    MilksModule,
    ToppingsModule,
    FlavoursModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
