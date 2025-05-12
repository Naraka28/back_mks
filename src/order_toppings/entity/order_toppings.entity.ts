import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Toppings } from 'src/toppings/entity/toppings.entity';
import { Orders } from 'src/orders/entity/orders.entity';

@Entity('order_toppings')
export class OrderToppings {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Orders, (order) => order.orderToppings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Orders;

  @ManyToOne(() => Toppings, { eager: true })
  @JoinColumn({ name: 'topping_id' })
  topping: Toppings;

  @Column()
  quantity: number; 
}
