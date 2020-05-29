import { ValidatorSpec } from 'envalid';

export interface EnvValidator {
  PORT: ValidatorSpec<number>;
  AUTH_TOKEN_SECRET: ValidatorSpec<string>;
  NODE_ENV: ValidatorSpec<string>;
  TOKEN_EXPIRATION: ValidatorSpec<string>;
  LOGGER_LOG_LEVEL: ValidatorSpec<string>;
  SWAGGER_DOCS: ValidatorSpec<boolean>;
  PRIV_KEY_SECRET: ValidatorSpec<string>;
}
