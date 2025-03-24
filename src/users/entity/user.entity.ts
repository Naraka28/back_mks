import { Roles } from 'src/roles/entity/roles.entity';
import { Tickets } from 'src/tickets/entity/tickets.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @ManyToOne(() => Roles, (role) => role.users, { nullable: false })
  @JoinColumn()
  role: Roles;
  @OneToMany(() => Tickets, (ticket) => ticket.cashier)
  tickets: Tickets[];
}
