import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Sizes } from './entity/sizes.entity';
import { SizesService } from './sizes.service';
import { CreateSizeDto } from './dto/create-sizes.dto';

@Controller('sizes')
export class SizesController {
  constructor(private sizesService: SizesService) {}

  @Get()
  async getSizes(): Promise<Sizes[]> {
    return this.sizesService.findAll();
  }

  @Post('create')
  async createSize(@Body() createSizeDto: CreateSizeDto): Promise<Sizes> {
    return this.sizesService.createSize(createSizeDto);
  }
  
  @Get(':id')
  async getSize(@Param('id', ParseIntPipe) id: number): Promise<Sizes | null> {
    return this.sizesService.findOne(id);
  }

  @Put('update/:id')
  async updateSize(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSizeDto: CreateSizeDto,
  ): Promise<Sizes | null> {
    return this.sizesService.updateSize(id, updateSizeDto);
  }

  @Delete('delete/:id')
  async deleteSize(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.sizesService.deleteSize(id);
  }
}
