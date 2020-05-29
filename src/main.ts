import 'reflect-metadata';
import * as expressPinoLogger from 'express-pino-logger';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { Routes } from './constants';
import { config, env } from './config';
import { CustomLoggerService } from './shared/custom-logger/custom-logger.service';
import { swaggerSetup } from './shared/services/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(Routes.GLOBAL_PREFIX);
  const logger = app.get(CustomLoggerService);

  app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
  app.useLogger(logger);
  app.use(expressPinoLogger());
  app.use(helmet());
  app.enableCors({ credentials: true })
  app.use(rateLimit(config.rateLimit));

  if (env.SWAGGER_DOCS) {
    swaggerSetup(app);
  }

  const port = env.PORT;
  await app.listen(port);
  logger.log(`Api server is listening on port ${port}`);
}

bootstrap();
