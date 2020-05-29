import * as jwt from 'jsonwebtoken';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { Errors } from '../../../config';

@Injectable()
export class JwtService {
  public async sign<T>(payload: T, secret: string, options: any = {}): Promise<string> {
    try {
      return await new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (error: Error, token: string) => {
          if (error) { reject(error) }

          resolve(token);
        });
      });
    } catch (err) {
      throw new BadRequestException(Errors.UNABLE_TO_GENERATE_TOKEN);
    }
  }

  public async verify<T>(token: string, secret: string): Promise<T> {
    try {
      return await new Promise((resolve, reject) => {
        jwt.verify(token, secret, (error: Error, data) => {
          if (error) { reject(error) }

          resolve(data);
        })
      });
    } catch (err) {
      throw new UnauthorizedException(Errors.INCORRECT_AUTH_TOKEN_OR_EXPIRED)
    }
  }
}
