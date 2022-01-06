import 'winston-daily-rotate-file';

import path from 'path';
import { createLogger, transports } from 'winston';

import { Enviroment, Winston } from 'const';

import { colorFormat, noColorFormat } from './format';

/**
 * Winston logger
 */

const DATE_PATTERN = process.env.DATE_PATTERN || 'DD-MM-YYYY';
const ENVIRONMENT = process.env.NODE_ENV || Enviroment.DEVELOPMENT;

const isDevelopment = ENVIRONMENT === Enviroment.DEVELOPMENT;
const isProduction = ENVIRONMENT === Enviroment.PRODUCTION;
const isTest = ENVIRONMENT === Enviroment.TEST;

const dailyLogError = !isProduction
  ? [
      new transports.DailyRotateFile({
        filename: path.join(__dirname, '../../../log', 'errors.%DATE%.log'),
        datePattern: DATE_PATTERN,
        format: noColorFormat,
        silent: isTest,
        level: Winston.ERROR,
      }),
    ]
  : [];

const dailyLogException = !isProduction
  ? [
      new transports.DailyRotateFile({
        filename: path.join(__dirname, '../../../log', 'exceptions.%DATE%.log'),
        datePattern: DATE_PATTERN,
        format: noColorFormat,
        silent: isTest,
      }),
    ]
  : [];

const logger = createLogger({
  transports: [
    new transports.Console({
      format: isDevelopment ? colorFormat : noColorFormat,
      silent: isTest,
    }),
    ...dailyLogError,
  ],
  exceptionHandlers: [
    new transports.Console({
      format: isDevelopment ? colorFormat : noColorFormat,
      silent: isTest,
    }),
    ...dailyLogException,
  ],
  exitOnError: false,
});

/**
 * Handling unhandled rejection by throw it to exception and from there winston would pick up an exception and log it.
 */

process.on('unhandledRejection', (exception) => {
  throw exception;
});

export default logger;
