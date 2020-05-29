import { CustomLoggerService } from '../../shared/custom-logger/custom-logger.service';
import { KeyPairService } from './key-pair.service';

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

describe('KeyPairService', () => {
  let customLoggerService: CustomLoggerService;
  let keyPairService: KeyPairService;

  beforeEach(() => {
    customLoggerService = new CustomLoggerService();
    keyPairService = new KeyPairService(customLoggerService);
  });

  describe('generateKeyPair', () => {
    it('should generate pubKey and privKey', async () => {
      const result = await keyPairService.generateKeyPair();

      expect(result.pubKey).toBeTruthy();
      expect(result.privKey).toBeTruthy();
    });
  });
});
