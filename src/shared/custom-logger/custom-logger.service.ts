import { Injectable, LoggerService } from '@nestjs/common';
import * as pino from 'pino';

import { env, Environments } from '../../config';

@Injectable()
export class CustomLoggerService implements LoggerService {
  private formatters = {
    level (level, number) {
      return { level: number };
    },
  };

  private logger = pino({
    formatters: this.formatters,
    level: env.LOGGER_LOG_LEVEL,
    prettyPrint: env.NODE_ENV === Environments.DEV,
  });

  public log(message: string, payload = {}): void {
    this.logger.info(payload, message);
  }

  public error(message: string, payload = {}): void {
    this.logger.error(payload, message);
  }

  public debug(message: string, payload = {}): void {
    this.logger.debug(payload, message);
  }

  public warn(message: string, payload = {}): void {
    this.logger.warn(payload, message);
  }
}
