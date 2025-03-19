import { Flavours } from 'src/flavours/entity/flavours.entity';
import { Milks } from 'src/milks/entity/milks.entity';
import { Orders } from 'src/orders/entity/orders.entity';
import { Product_Type } from 'src/product_types/entity/product_types.entity';
import { Sizes } from 'src/sizes/entity/sizes.entity';
import { Temps } from 'src/temps/entity/temps.entity';
import { Toppings } from 'src/toppings/entity/toppings.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  base_price: number;

  @ManyToOne(() => Product_Type)
  type: Product_Type;

  @Column()
  image: string;

  @ManyToMany(() => Flavours)
  flavours: Flavours[];

  @ManyToMany(() => Sizes)
  sizes: Sizes[];

  @ManyToMany(() => Temps)
  temp: Temps[];

  @ManyToMany(() => Toppings)
  toppings: Toppings[];

  @ManyToMany(() => Milks)
  milks: Milks[];

  @OneToMany(() => Orders, (order) => order.product)
  order: Orders;
}
