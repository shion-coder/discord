import 'winston-daily-rotate-file';

import { format } from 'winston';

import { timeFormat } from 'utils';

/**
 * Log format with color
 */

export const colorFormat = format.combine(
  format.printf((info) => {
    const timestamp = `\x1b[34m${timeFormat}\x1B[39m`;

    let level: string;
    let message: string;

    if (info.level === 'error') {
      level = `\x1B[31m${info.level.toUpperCase()}\x1B[0m`;
      message = `\x1B[31m${info.message}\x1B[0m`;
    } else if (info.level === 'info') {
      level = `\x1B[32m${info.level.toUpperCase()}\x1B[0m`;
      message = `\x1B[32m${info.message}\x1B[0m`;
    } else if (info.level === 'warn') {
      level = `\x1B[33m${info.level.toUpperCase()}\x1B[0m`;
      message = `\x1B[33m${info.message}\x1B[0m`;
    } else {
      level = info.level.toUpperCase();
      message = info.message;
    }

    const result = `${timestamp} | ${level} | ${message}`;

    return result;
  }),
);

/**
 * Log format with no color
 */

export const noColorFormat = format.combine(
  format.printf((info) => {
    const { message } = info;

    const level = info.level.toUpperCase();

    const result = `${timeFormat} | ${level} | ${message}`;

    return result;
  }),
);
