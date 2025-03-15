import { Column, DeleteDateColumn, Entity,  PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Flavours {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  price: number;
  
  @DeleteDateColumn()
  deletedAt: Date;
}
