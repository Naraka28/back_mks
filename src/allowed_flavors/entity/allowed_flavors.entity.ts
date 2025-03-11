import { Flavours } from 'src/flavours/entity/flavours.entity';
import { Products } from 'src/products/entity/products.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Allowed_Flavors {
    
    @PrimaryGeneratedColumn()
    id: number;
   
}
