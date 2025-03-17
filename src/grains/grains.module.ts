import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grains } from './entity/grains.entity';
import { GrainsService } from './grains.service';
import { GrainsController } from './grains.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Grains])],
  providers: [GrainsService],
  controllers: [GrainsController],
})
export class GrainsModule {}
