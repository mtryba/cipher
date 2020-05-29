import { compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { CustomLoggerService } from '../../custom-logger/custom-logger.service';

@Injectable()
export class HashService {
  constructor(
    private readonly customLoggerService: CustomLoggerService,
  ) {}

  public async compareHash(text: string, hash: string) {
    try {
      return await compare(text, hash);
    } catch (err) {
      this.customLoggerService.error(err);
      return false;
    }
  }
}
