import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FlavoursService } from './flavours.service';

@Controller('flavours')
export class FlavoursController {
  constructor(private flavourService: FlavoursService) {}
  @Get()
  async findAllFlavours() {
    const flavours = await this.flavourService.findAll();
    return { data: flavours };
  }
  @Get(':id')
  async findFlavourById(@Param('id', ParseIntPipe) id: number) {
    return this.flavourService.findOne(id);
  }
}
