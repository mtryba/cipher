import * as jwt from 'jsonwebtoken';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { Errors } from '../../../constants';
import { AuthPayload } from '../../interfaces';

@Injectable()
export class JwtService {
  public async sign(payload: AuthPayload, secret: jwt.Secret, options: jwt.SignOptions = {}): Promise<string> {
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

  public async verify(token: string, secret: jwt.Secret): Promise<AuthPayload> {
    try {
      return await new Promise((resolve, reject) => {
        jwt.verify(token, secret, (error: Error, data: AuthPayload) => {
          if (error) { reject(error) }

          resolve(data);
        })
      });
    } catch (err) {
      throw new UnauthorizedException(Errors.INCORRECT_AUTH_TOKEN_OR_EXPIRED)
    }
  }
}
