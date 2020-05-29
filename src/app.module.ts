import { Module } from '@nestjs/common';

import { CustomLoggerModule } from './shared/custom-logger/custom-logger.module';
import { SignInModule } from './features/sign-in/sign-in.module';
import { KeyPairModule } from './features/key-pair/key-pair.module';
import { EncryptModule } from './features/encrypt/encrypt.module';

@Module({
  imports: [CustomLoggerModule, SignInModule, KeyPairModule, EncryptModule],
})
export class AppModule {}
