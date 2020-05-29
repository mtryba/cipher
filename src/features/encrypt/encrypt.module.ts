import { Module } from '@nestjs/common';

import { EncryptService } from './encrypt.service';
import { EncryptController } from './encrypt.controller';
import { ServicesModule } from '../../shared/services/services.module';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [EncryptService],
  controllers: [EncryptController],
  imports: [UsersModule, ServicesModule],
})
export class EncryptModule {}
