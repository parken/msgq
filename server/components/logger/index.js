import fs from 'fs-promise';
import path from 'path';
import winston from 'winston';
import config, { NODE_ENV } from '../../config/environment';
import DailyRotateFile from 'winston-daily-rotate-file';

const dir = path.join(config.root, 'logs');
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const logger = new winston.Logger({
  transports: [
    new DailyRotateFile({
      name: 'error-file',
      datePattern: '.yyyy-MM-dd.log',
      filename: `${config.root}/logs/error`,
    }),
  ],
});

if (['development', 'test'].includes(NODE_ENV)) logger.add(winston.transports.Console);

export default logger;
