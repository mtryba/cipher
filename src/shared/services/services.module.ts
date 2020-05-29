import { Module } from '@nestjs/common';

import { JwtService } from './jwt/jwt.service';
import { HashService } from './hash-service/hash.service';

const services = [JwtService, HashService];

@Module({
  providers: services,
  exports: services,
})
export class ServicesModule {}
