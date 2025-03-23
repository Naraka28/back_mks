import { Products } from 'src/products/entity/products.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Temps {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({unique: true})
  name: string;
  @Column()
  price: number;
  @Column()
  image: string;

  @ManyToMany(() => Products, (product) => product.temp)
  @JoinTable({ name: 'allowedTemps' }) // Esto crea automáticamente la tabla intermedia `products_flavours`
  products: Products[];
 
}
