import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TempsService } from './temps.service';
import { Temps } from './entity/temps.entity';
import { CreateTempsDto } from './dto/create-temps.dto';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('temps')
export class TempsController {
  constructor(private tempsService: TempsService) {}
   @Get()
    async getTemps(): Promise<Temps[]> {
      return this.tempsService.findAll();
    }
  
  @Post('create')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/temps', // Carpeta donde se guarda
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const name = file.originalname.split('.').slice(0, -1).join('.');
          cb(null, `${file.fieldname}-${name}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async createTemp(
    @UploadedFile() image: Express.Multer.File,
    @Body() createTempsDto: CreateTempsDto,
  ): Promise<Temps> {
    const imageUrl = `https://backmks-production.up.railway.app/uploads/temps/${image.filename}`;
    const tempData = { ...createTempsDto, image: imageUrl };
    return this.tempsService.createTemps(tempData);
  }

    
    @Get(':id')
    async getTemp(@Param('id', ParseIntPipe) id: number): Promise<Temps | null> {
      return this.tempsService.findOne(id);
    }



  
    @Put('update/:id')
    async updateTemp(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateTempDto: CreateTempsDto,
    ): Promise<Temps | null> {
      return this.tempsService.updateTemp(id, updateTempDto);
    }
  
    @Delete('delete/:id')
    async deleteTemp(
      @Param('id', ParseIntPipe) id: number,
    ): Promise<{ message: string }> {
      return this.tempsService.deleteTemp(id);
    }
}