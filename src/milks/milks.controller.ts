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
import { InjectRepository } from '@nestjs/typeorm';
import { Milks } from './entity/milks.entity';
import { MilksService } from './milks.service';
import { CreateMilkDto } from './dto/create-milks.dto';

@Controller('milks')
export class MilksController {
  constructor(@InjectRepository(Milks) private milksService: MilksService) {}

  @Get()
  async getMilks(): Promise<Milks[]> {
    return this.milksService.findAll();
  }
  @Post('create')
  async createMilk(@Body() createMilkDto: CreateMilkDto): Promise<Milks> {
    return this.milksService.createMilk(createMilkDto);
  }
  @Get(':id')
  async getMilk(@Param('id', ParseIntPipe) id: number) {
    return this.milksService.findOne(id);
  }
  @Put('update/:id')
  async editMilk(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMilk: CreateMilkDto,
  ) {
    return this.milksService.updateMilk(id, updateMilk);
  }
  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.milksService.deleteMilk(id);
  }
}
