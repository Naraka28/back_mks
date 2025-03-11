import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Milks {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  price: number;
 
}
