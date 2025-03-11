import { Orders } from 'src/orders/entity/orders.entity';
import { User } from 'src/users/entity/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Tickets {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  ticket_date: Date;
  @Column()
  total: number;
  @ManyToOne(() => User, (user) => user.tickets)
  cashier: User;
  @OneToMany(() => Orders, (order) => order.ticket)
  order: Orders[];
}
