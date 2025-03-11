import { Allowed_Flavors } from 'src/allowed_flavors/entity/allowed_flavors.entity';
import { Product_Type } from 'src/product_types/entity/product_types.entity';
import { Column, Entity, ManyToOne,  OneToMany,  PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    base_price: number;
    @ManyToOne(() => Product_Type)
    type: Product_Type;
    @Column()
    image: string;
}
