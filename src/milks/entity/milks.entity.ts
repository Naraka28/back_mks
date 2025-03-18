import { Products } from 'src/products/entity/products.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Milks {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  price: number;
  
  @ManyToMany(() => Products, (product) => product.milks)
  @JoinTable({ name: 'allowedMilks' }) // Esto crea automáticamente la tabla intermedia `products_flavours`
  products: Products[];
 
}
