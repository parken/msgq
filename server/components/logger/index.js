import winston from 'winston';
import config from '../../config/environment';
import DailyRotateFile from 'winston-daily-rotate-file';

const logger = new winston.Logger({
  transports: [
    new DailyRotateFile({
      name: 'error-file',
      datePattern: '.yyyy-MM-dd.log',
      filename: `${config.root}/logs/error`,
    }),
  ],
});

export default logger;
