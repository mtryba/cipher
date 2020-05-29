import { Module } from '@nestjs/common';

import { ServicesModule } from '../../shared/services/services.module';

import { KeyPairController } from './key-pair.controller';
import { KeyPairService } from './key-pair.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, ServicesModule],
  controllers: [KeyPairController],
  providers: [KeyPairService],
})
export class KeyPairModule {}
