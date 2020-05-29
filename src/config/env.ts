import { bool, cleanEnv, num, str } from 'envalid';

enum Environments {
  DEV = 'DEV',
  PROD = 'PROD',
  TEST = 'TEST',
}

const envValidator = {
  PORT: num(),
  AUTH_TOKEN_SECRET: str(),
  NODE_ENV: str({ choices: [Environments.DEV, Environments.PROD, Environments.TEST] }),
  TOKEN_EXPIRATION: str(),
  LOGGER_LOG_LEVEL: str(),
  SWAGGER_DOCS: bool(),
  PRIV_KEY_SECRET: str(),
}

const env = cleanEnv(process.env, envValidator);

export { Environments, env };
