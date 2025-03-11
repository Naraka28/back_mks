import { Flavours } from 'src/flavours/entity/flavours.entity';
import { Grains } from 'src/grains/entity/grains.entity';
import { Milks } from 'src/milks/entity/milks.entity';
import { Product_Type } from 'src/product_types/entity/product_types.entity';
import { Sizes } from 'src/sizes/entity/sizes.entity';
import { Temps } from 'src/temps/entity/temps.entity';
import { Toppings } from 'src/toppings/entity/toppings.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne,  OneToMany,  PrimaryGeneratedColumn } from 'typeorm';

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

    @ManyToMany(() => Flavours)
    @JoinTable({name:"allowedFlavours"})  // Esto crea automáticamente la tabla intermedia `products_flavours`
    flavours: Flavours[];

    @ManyToMany(() => Sizes)
    @JoinTable({name:"allowedSizes"})  // Esto crea automáticamente la tabla intermedia `products_sizes`
    sizes: Sizes[];
    
    @ManyToMany(() => Temps)
    @JoinTable({name:"allowedTemps"})  // Esto crea automáticamente la tabla intermedia `products_sizes`
    temp: Temps[];
    
    @ManyToMany(() => Toppings)
    @JoinTable({name:"allowedToppings"})  // Esto crea automáticamente la tabla intermedia `products_sizes`
    toppings: Toppings[];

    @ManyToMany(() => Milks)
    @JoinTable({name:"allowedMilks"})  // Esto crea automáticamente la tabla intermedia `products_sizes`
    milks: Milks[];
    
    // @ManyToMany(() => Grains)
    // @JoinTable()  // Esto crea automáticamente la tabla intermedia `products_sizes`
    // grains: Grains[];
    
    
    
}
