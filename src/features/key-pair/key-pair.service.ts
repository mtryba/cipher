import { generateKeyPair } from 'crypto';
import { BadRequestException, Injectable } from '@nestjs/common';

import { GenerateKeyPairResDto } from './dtos';
import { CustomLoggerService } from '../../shared/custom-logger/custom-logger.service';
import { env, Errors } from '../../config';


@Injectable()
export class KeyPairService {
  constructor(
    private readonly customLoggerService: CustomLoggerService,
  ) {}

  public generateKeyPair(): Promise<GenerateKeyPairResDto> {
    try {
      return new Promise((resolve, reject) => {
        generateKeyPair('rsa', {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
          },
          privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: env.PRIV_KEY_SECRET,
          }
        }, (err, pubKey, privKey) => {
          if (err) { reject(err) }

          resolve({ pubKey, privKey });
        });
      });
    } catch (err) {
      this.customLoggerService.error(err);
      throw new BadRequestException(Errors.UNABLE_TO_GENERATE_KEY_PAIR);
    }
  }
}
