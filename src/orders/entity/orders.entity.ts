import { Flavours } from 'src/flavours/entity/flavours.entity';
import { Milks } from 'src/milks/entity/milks.entity';
import { Products } from 'src/products/entity/products.entity';
import { Sizes } from 'src/sizes/entity/sizes.entity';
import { Temps } from 'src/temps/entity/temps.entity';
import { Tickets } from 'src/tickets/entity/tickets.entity';
import { Toppings } from 'src/toppings/entity/toppings.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Products, (product) => product.order)
  product: Products;
  @Column()
  price: number;
  @ManyToMany(() => Toppings, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'order_toppings' })
  toppings: Toppings[];
  @ManyToOne(() => Tickets, (ticket) => ticket.order)
  ticket: Tickets;
  @ManyToOne(() => Flavours)
  flavour: Flavours;

  @ManyToOne(() => Sizes)
  size: Sizes;

  @ManyToOne(() => Milks)
  milk: Milks;

  @ManyToOne(() => Temps)
  temperature: Temps;
}
