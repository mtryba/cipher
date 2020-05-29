import { NotFoundException } from '@nestjs/common';

import { Errors } from '../../config';
import { UsersService } from './users.service';

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

const correctUserEmail = 'jan@leocode.com';
const wrongUserEmail = 'jankowalski@leocode.com';
const mockedPubKey = 'pubKey';
const password = '$2b$12$eu2ucmdsQrY6J8H2grUdaO0lhzDsjk7erbg.tPgmesx0Al5aJKbsy';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(() => {
    usersService = new UsersService();
  });

  describe('getUserByEmail', () => {
    it('should return correct user if exists', () => {
      const result = usersService.getUserByEmail(correctUserEmail);

      expect(result).toStrictEqual({ email: correctUserEmail, password });
    });

    it('should throw error - USER_NOT_FOUND', () => {
      try {
        usersService.getUserByEmail(wrongUserEmail);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.response.message).toBe(Errors.USER_NOT_FOUND);
      }
    });
  });

  describe('updateUserByEmail', () => {
    it('should update user', () => {
      const result = usersService.updateUserByEmail(correctUserEmail, { pubKey: mockedPubKey });
      expect(result).toStrictEqual({ email: correctUserEmail, password, pubKey: mockedPubKey });
    });

    it('should throw error if user not exists', () => {
      try {
        usersService.updateUserByEmail(wrongUserEmail, { pubKey: mockedPubKey });
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.response.message).toBe(Errors.USER_NOT_FOUND);
      }
    });
  });
});
