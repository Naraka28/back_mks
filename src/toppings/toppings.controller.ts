import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ToppingsService } from './toppings.service';
import { Toppings } from './entity/toppings.entity';
import { CreateToppingsDto } from './dto/create-toppings.dto';

@Controller('toppings')
export class ToppingsController {
  constructor(private toppingsService: ToppingsService) {}
   @Get()
    async gettoppings(): Promise<Toppings[]> {
      return this.toppingsService.findAll();
    }
  
    @Post('create')
    async createTopping(@Body() createToppingDto: CreateToppingsDto): Promise<Toppings> {
      return this.toppingsService.createTopping(createToppingDto);
    }
    
    @Get(':id')
    async getTopping(@Param('id', ParseIntPipe) id: number): Promise<Toppings | null> {
      return this.toppingsService.findOne(id);
    }
  
    @Put('update/:id')
    async updateTopping(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateToppingDto: CreateToppingsDto,
    ): Promise<Toppings | null> {
      return this.toppingsService.updateTopping(id, updateToppingDto);
    }
  
    @Delete('delete/:id')
    async deleteTopping(
      @Param('id', ParseIntPipe) id: number,
    ): Promise<{ message: string }> {
      return this.toppingsService.deleteTopping(id);
    }
}
