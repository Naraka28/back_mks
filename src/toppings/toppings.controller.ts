import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ToppingsService } from './toppings.service';
import { Toppings } from './entity/toppings.entity';
import { CreateToppingsDto } from './dto/create-toppings.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';


@Controller('toppings')
export class ToppingsController {
  constructor(private toppingsService: ToppingsService) {}
   @Get()
    async gettoppings(): Promise<Toppings[]> {
      return this.toppingsService.findAll();
    }


  
    @Post('create')
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './uploads/toppings', // carpeta donde se guarda
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const name = file.originalname.split('.').slice(0, -1).join('.'); // nombre sin extension
            // console.log('original',file.originalname);
            // console.log('ext',ext);
            // console.log('suffix',uniqueSuffix);
            // console.log('fieldname',file.fieldname);
            cb(null, `${file.fieldname}-${name}-${uniqueSuffix}${ext}`);
          },
        }),
      }),
    )
    async createTopping(
      @UploadedFile() image: Express.Multer.File,
      @Body() toppingNew: Toppings): Promise<Toppings> {
        const imageUrl = `/uploads/toppings/${image.filename}`;
        const ToppingNewData= {...toppingNew, image: imageUrl };
        //console.log('ToppingNewData:',ToppingNewData);
        return await this.toppingsService.createTopping(ToppingNewData);
      }
    
    @Get(':id')
    async getTopping(@Param('id', ParseIntPipe) id: number): Promise<Toppings | null> {
      return this.toppingsService.findOne(id);
    }
    
    // @Get('upload/toppings/:filename')
    // // async getToppingImage(@Param('filename') filename: string): Promise<string> {
    // //   //return `http://localhost:3000/uploads/toppings/${filename}`;
    // // }

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
