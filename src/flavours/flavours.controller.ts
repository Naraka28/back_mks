import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { FlavoursService } from './flavours.service';
import { CreateFlavourDto } from './dto/create-flavour.dto';

@Controller('flavours')
export class FlavoursController {
  constructor(private flavourService: FlavoursService) {}

  @Get()
  async findAllFlavours() {
    try {
      const flavours = await this.flavourService.findAll();
      if (!flavours || flavours.length === 0) {
        throw new HttpException('No flavours found', HttpStatus.NOT_FOUND);
      }
      return  flavours;
    } catch (error) {
      console.error('Error fetching Flavours', error);
      if (error instanceof HttpException) {
        throw error; // Re-throw custom HttpException
      }
      throw new HttpException(
        'Couldn`t find flavours',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findFlavourById(@Param('id', ParseIntPipe) id: number) {
    try {
      const flavour = await this.flavourService.findOne(id);
      if (!flavour) {
        throw new HttpException('Flavour not found', HttpStatus.NOT_FOUND);
      }
      return { flavour };
    } catch (error) {
      console.error('Error fetching flavour by ID:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Couldn`t find flavour',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('create')
  async createFlavour(@Body() createFlavourDto: CreateFlavourDto) {
    try {
      return await this.flavourService.createFlavour(createFlavourDto);
    } catch (error) {
      console.error('Error creating flavour:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Couldn´t create flavour',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Put('update/:id')
  async updateFlavour(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFlavourDto: CreateFlavourDto, // Cambié a UpdateFlavourDto
  ) {
    try {
      const updatedFlavour = await this.flavourService.updateFlavour(
        id,
        updateFlavourDto,
      );
      if (!updatedFlavour) {
        throw new HttpException(
          "Flavour not found or couldn't update",
          HttpStatus.NOT_FOUND,
        );
      }
      return  updatedFlavour ;
    } catch (error) {
      console.error('Error updating flavour:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Couldn’t update flavour',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Delete('delete/:id')
  async deleteFlavour(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedFlavour = await this.flavourService.deleteFlavour(id);
      // if (!deletedFlavour) {
      //   throw new HttpException('Flavour not found or couldn\'t delete', HttpStatus.NOT_FOUND);
      // }
      return { message: 'Flavour deleted successfully' };
    } catch (error) {
      console.error('Error deleting flavour:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Couldn’t delete flavour',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
