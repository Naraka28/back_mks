import { Roles } from 'src/roles/entity/roles.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  @ManyToOne(() => Roles, (role) => role.users, { nullable: false })
    role: Roles;
}
