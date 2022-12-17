/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  const config = new DocumentBuilder()
    .setTitle('Records api')
    .setDescription('The records API description')
    .setVersion('1.0')
    .addTag('records')
    .build();
  const document = SwaggerModule.createDocument(
    app,
    config,
    {
      operationIdFactory: (_controllerKey: string, methodKey: string) => methodKey
    }
  );
  SwaggerModule.setup('swagger', app, document, { explorer: true });

  app.enableCors();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
