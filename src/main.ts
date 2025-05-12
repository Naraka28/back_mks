import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: ['http://localhost:5123'], // your Vite frontend dev server
  });

  app.setGlobalPrefix('mks/');
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // URL: http://localhost:3000/uploads/archivo.jpg
  });

  const config = new DocumentBuilder()
    .setTitle('MokkaSoft Endpoints')
    .setDescription('MokkaSoft API Endpoints')
    .setVersion('1.0')
    .addTag('mks')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
