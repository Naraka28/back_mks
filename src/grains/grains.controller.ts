import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
} from '@nestjs/common';
import { GrainsService } from './grains.service';
@Controller('grains')
export class GrainsController {
  constructor(private grainsService: GrainsService) {}

  @Get()
  async findAllGrains() {
    try {
      const grains = await this.grainsService.findAll();
      return { data: grains };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
