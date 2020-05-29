import { Global, Module } from '@nestjs/common';
import { CustomLoggerService } from './custom-logger.service';

const services = [CustomLoggerService];

@Global()
@Module({
  providers: services,
  exports: services,
})
export class CustomLoggerModule {}
