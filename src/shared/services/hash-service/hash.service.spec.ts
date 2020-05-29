import { HashService } from './hash.service';
import { CustomLoggerService } from '../../custom-logger/custom-logger.service';

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

const correctUserPassword = 'leojan';
const incorrectUserPassword = 'leo';
const correctUserPasswordHash = '$2b$12$eu2ucmdsQrY6J8H2grUdaO0lhzDsjk7erbg.tPgmesx0Al5aJKbsy';

describe('HashService', () => {
  let hashService: HashService;
  let customLoggerService: CustomLoggerService;

  beforeEach(() => {
    customLoggerService = new CustomLoggerService();
    hashService = new HashService(customLoggerService);
  });

  describe('compare', () => {
    it('comparison should be return correct result', () => {
      const result = hashService.compareHash(correctUserPassword, correctUserPasswordHash);
      expect(result).toBeTruthy();
    });

    it ('comparison should be return incorrect result', async () => {
      const result = await hashService.compareHash(incorrectUserPassword, correctUserPasswordHash);
      expect(result).toBeFalsy();
    });
  });
});
