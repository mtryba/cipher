import { BadRequestException, UnauthorizedException } from '@nestjs/common';

import { Errors, env } from '../../../config';
import { JwtService } from './jwt.service';

jest.mock('../../../config/env', () => {
  return {
    get env() {
      return {
        PORT: 9000,
        NODE_ENV: 'DEV',
        AUTH_TOKEN_SECRET: 'test',
        LOGGER_LOG_LEVEL: 'debug',
        TOKEN_EXPIRATION: 5,
        SWAGGER_DOCS: false,
        PRIV_KEY_SECRET: 'secret',
      }
    },
    get Environments() {
      return {
        DEV: 'DEV',
      }
    }
  };
});

const secret = env.AUTH_TOKEN_SECRET;
const payload = { email: 'jan@leocode.com' };

describe('JwtService', () => {
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService();
  });

  describe('sign', () => {
    it('should return generated token', async () => {
      const token = await jwtService.sign(payload, secret);
      expect(token).toBeDefined()
    });

    it('should throw error with unexpected token payload', async () => {
      try {
        await jwtService.sign({}, secret);
      } catch (err) {
        expect(err).toBeDefined();
        expect(err).toBeInstanceOf(BadRequestException);
        expect(err.response.message).toBe(Errors.UNABLE_TO_GENERATE_TOKEN);
      }
    });
  });

  describe('verify', () => {
    it ('should return correct payload from token', async () => {
      const token = await jwtService.sign(payload, secret);
      const decodedData = await jwtService.verify(token, secret) as { email: string };
      expect(decodedData.email).toEqual('jan@leocode.com');
    });

    it ('should throw error - incorrect secret', async () => {
      try {
        const token = await jwtService.sign(payload, secret);
        await jwtService.verify(token, 'wrongSecret');
      } catch (err) {
        expect(err).toBeDefined();
        expect(err).toBeInstanceOf(UnauthorizedException);
        expect(err.response.message).toBe(Errors.INCORRECT_AUTH_TOKEN_OR_EXPIRED);
      }
    });
  });
});
