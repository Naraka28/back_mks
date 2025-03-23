import {   Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put, } from '@nestjs/common';
import { Products } from './entity/products.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-products.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    async getProducts(): Promise<Products[]> {
        return this.productsService.findAll();
    }

    @Get(':id')
    async getProduct(@Param('id', ParseIntPipe) id: number): Promise<Products | null> {
        return this.productsService.findOne(id);
    }

    @Get('type/:typeId')
    async getProductsByType(@Param('typeId', ParseIntPipe) typeId: number): Promise<Products[]> {
        return this.productsService.getProductsByType(typeId);
    }

    @Post('create')
    async createProduct(@Body() createProductDto: CreateProductDto): Promise<Products> {
        return this.productsService.createProduct(createProductDto);
    }

    @Put(':id')
    async updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateProductDto: CreateProductDto,
    ): Promise<Products | null> {
        return this.productsService.updateProduct(id, updateProductDto);
    }

    @Delete(':id')
    async deleteProduct(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<{ message: string }> {
        return this.productsService.deleteProduct(id);
    }

    @Get('flavours/:flavourId')
    async getProductsByFlavour(@Param('flavourId', ParseIntPipe) flavourId: number): Promise<Products[]> {
        return this.productsService.getProductsByFlavour(flavourId);
    }

    @Get('size/:sizeId')
    async getProductsBySize(@Param('sizeId', ParseIntPipe) sizeId: number): Promise<Products[]> {
        return this.productsService.getProductsBySize(sizeId);
    }

    @Get('temp/:tempId')
    async getProductsByTemp(@Param('tempId', ParseIntPipe) tempId: number): Promise<Products[]> {
        return this.productsService.getProductsByTemp(tempId);
    }
    

}
