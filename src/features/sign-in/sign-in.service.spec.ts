import {  UnauthorizedException } from '@nestjs/common';

import { JwtService } from '../../shared/services/jwt/jwt.service';
import { UsersService } from '../users/users.service';
import { HashService } from '../../shared/services/hash-service/hash.service';
import { CustomLoggerService } from '../../shared/custom-logger/custom-logger.service';
import { SignInService } from './sign-in.service';
import { Errors } from '../../constants';

jest.mock('../../config/env', () => {
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

const signInReqDto = {
  email: 'jan@leocode.com',
  password: 'leojan',
};

describe('SignInService', () => {
  let customLoggerService: CustomLoggerService;
  let jwtService: JwtService;
  let usersService: UsersService;
  let hashService: HashService;
  let signInService: SignInService;

  beforeEach(() => {
    customLoggerService = new CustomLoggerService();
    jwtService = new JwtService()
    hashService = new HashService(customLoggerService);
    usersService = new UsersService();
    signInService = new SignInService(jwtService, usersService, hashService);
  });

  describe('signIn', () => {
    it('should return authToken if credentials are correct', async () => {
      const result = await signInService.signIn(signInReqDto);
      expect(result.authToken).toBeDefined();
    });

    it('should throw error if user does not exist - UnauthorizedException', async () => {
      try {
        await signInService.signIn(signInReqDto);
      } catch (err) {
        expect(err).toBeInstanceOf(UnauthorizedException);
        expect(err.response.message).toBe(Errors.INVALID_CREDENTIALS);
      }
    });

    it('should throw error if password is incorrect', async () => {
      try {
        await signInService.signIn(signInReqDto);
      } catch (err) {
        expect(err).toBeInstanceOf(UnauthorizedException);
        expect(err.response.message).toBe(Errors.INVALID_CREDENTIALS);
      }
    });
  });
});
