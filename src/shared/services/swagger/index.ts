import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const swaggerSetup = (app: INestApplication) => {
  const swaggerOpts = new DocumentBuilder()
    .setTitle('Leocode')
    .setDescription('Leocode test task API')
    .addBasicAuth( { type: 'apiKey', name: 'Authorization', in: 'header' })
    .build()

  const document = SwaggerModule.createDocument(app, swaggerOpts);
  SwaggerModule.setup('/api/docs', app, document);
};
