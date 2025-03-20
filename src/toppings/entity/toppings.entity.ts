import { Orders } from 'src/orders/entity/orders.entity';
import { Products } from 'src/products/entity/products.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Toppings {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @Column()
  price: number;
  @ManyToMany(() => Products, (product) => product.toppings)
  @JoinTable({ name: 'allowedToppings' }) // Esto crea automáticamente la tabla intermedia `products_flavours`
  products: Products[];

  @ManyToMany(() => Orders)
  orders: Orders[];
}
