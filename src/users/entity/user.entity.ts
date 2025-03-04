import { Roles } from 'src/roles/entity/roles.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: number;
  @OneToOne(() => Roles)
  role: Roles;
}
