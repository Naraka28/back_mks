import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product_Type } from './entity/product_types.entity';
import { ProductTypesService } from './product_types.service';
import { ProductTypesController } from './product_types.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Product_Type])],
    controllers: [ProductTypesService],
    providers: [ProductTypesController],
})
export class ProductTypesModule {}
