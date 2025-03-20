import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TempsService } from './temps.service';
import { Temps } from './entity/temps.entity';
import { CreateTempsDto } from './dto/create-temps.dto';

@Controller('temps')
export class TempsController {
  constructor(private tempsService: TempsService) {}
   @Get()
    async getTemps(): Promise<Temps[]> {
      return this.tempsService.findAll();
    }
  
    @Post('create')
    async createTopping(@Body() createToppingDto: CreateTempsDto): Promise<Temps> {
      return this.tempsService.createTopping(createToppingDto);
    }
    
    @Get(':id')
    async getTopping(@Param('id', ParseIntPipe) id: number): Promise<Temps | null> {
      return this.tempsService.findOne(id);
    }
  
    @Put('update/:id')
    async updateTopping(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateToppingDto: CreateTempsDto,
    ): Promise<Temps | null> {
      return this.tempsService.updateTopping(id, updateToppingDto);
    }
  
    @Delete('delete/:id')
    async deleteTopping(
      @Param('id', ParseIntPipe) id: number,
    ): Promise<{ message: string }> {
      return this.tempsService.deleteTopping(id);
    }
}