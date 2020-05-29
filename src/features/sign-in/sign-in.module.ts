import { Module } from '@nestjs/common';

import { SignInController } from './sign-in.controller';
import { SignInService } from './sign-in.service';
import { UsersModule } from '../users/users.module';
import { ServicesModule } from '../../shared/services/services.module';

@Module({
  controllers: [SignInController],
  imports: [UsersModule, ServicesModule],
  providers: [SignInService]
})
export class SignInModule {}
