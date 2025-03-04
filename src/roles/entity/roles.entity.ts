import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum RoleList {
  ADMIN = 'admin',
  CASHIER = 'cashier',
  CLIENT = 'client',
}

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'enum', enum: RoleList })
  role: RoleList;
}
