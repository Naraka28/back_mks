import { Flavours } from 'src/flavours/entity/flavours.entity';
import { Milks } from 'src/milks/entity/milks.entity';
import { OrderToppings } from 'src/order_toppings/entity/order_toppings.entity';
import { Products } from 'src/products/entity/products.entity';
import { Sizes } from 'src/sizes/entity/sizes.entity';
import { Temps } from 'src/temps/entity/temps.entity';
import { Tickets } from 'src/tickets/entity/tickets.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Products, (product) => product.order, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: Products;

  @Column()
  price: number;

  @OneToMany(() => OrderToppings, (orderTopping) => orderTopping.order, {
    cascade: true,
  })
  orderToppings: OrderToppings[];

  @ManyToOne(() => Tickets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ticketId' })
  ticket: Tickets;

  @ManyToOne(() => Flavours, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  flavour: Flavours;

  @ManyToOne(() => Sizes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  size: Sizes;

  @ManyToOne(() => Milks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  milk: Milks;

  @ManyToOne(() => Temps, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  temp: Temps;
}
