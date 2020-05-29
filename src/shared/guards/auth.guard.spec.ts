import { UnauthorizedException } from '@nestjs/common';

import { Errors } from '../../config';
import { UsersService } from '../../features/users/users.service';
import { JwtService } from '../services/jwt/jwt.service';
import { HashService } from '../services/hash-service/hash.service';
import { SignInService } from '../../features/sign-in/sign-in.service';
import { CustomLoggerService } from '../custom-logger/custom-logger.service';
import { AuthGuard } from './auth.guard';

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
      }
    },
    get Environments() {
      return {
        DEV: 'DEV',
      }
    }
  };
});

const getRequestMock = jest.fn();
const contextMock = {
  switchToHttp: jest.fn(() => ({ getRequest: getRequestMock })),
  getHandler: jest.fn(),
} as any;

const signInReqDto = {
  email: 'jan@leocode.com',
  password: 'leojan',
} ;

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let usersService: UsersService;
  let jwtService: JwtService;
  let customLoggerService: CustomLoggerService;
  let signInService: SignInService;
  let hashService: HashService;

  beforeEach(() => {
    usersService = new UsersService();
    customLoggerService = new CustomLoggerService();
    jwtService = new JwtService();
    authGuard = new AuthGuard(jwtService, usersService);
    hashService = new HashService(customLoggerService);
    signInService = new SignInService(jwtService, usersService, hashService);
    contextMock.switchToHttp.mockClear();
    getRequestMock.mockClear();
  });

  describe('canActivate', () => {
    it('should return true if token is correct', async () => {
      const signInResult = await signInService.signIn(signInReqDto);
      getRequestMock.mockReturnValueOnce({ headers: { authorization: signInResult.authToken } });
      const result = await authGuard.canActivate(contextMock);
      expect(result).toBeTruthy();
    });

    it('should throw UnauthorizedException if missing token', async () => {
      getRequestMock.mockResolvedValue(({ headers: {} }));

      try {
        await authGuard.canActivate(contextMock);
      } catch (err) {
        expect(err).toBeInstanceOf(UnauthorizedException);
        expect(err.response.message).toBe(Errors.MISSING_AUTH_TOKEN);
      }
    });
  });
});
