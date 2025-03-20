import { Products } from 'src/products/entity/products.entity';
import { Column, DeleteDateColumn, Entity,  JoinTable,  ManyToMany,  PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Flavours {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @Column()
  price: number;

  @ManyToMany(() => Products, (product) => product.flavours)
  @JoinTable({ name: 'allowedFlavours' }) // Esto crea automáticamente la tabla intermedia `products_flavours`
  products: Products[];

  @DeleteDateColumn()
  deletedAt: Date;
}
