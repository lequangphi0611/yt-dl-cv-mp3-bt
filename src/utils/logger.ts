import { createLogger, format, transports } from 'winston';

const { combine, label, timestamp, printf } = format;

const formater = printf(({ level, message, label: title, timestamp: time }) => {
  return `[${level.toUpperCase()}] ${title} ${time} : ${message}`;
});

const logger = createLogger({
  defaultMeta: { service: 'user-service' },
  format: combine(label({ label: 'YT-DL-CV-mp3' }), timestamp(), formater),
  level: 'info',
  transports: [
    new transports.Console(),
    new transports.File({ level: 'debug', filename: `logs/log-${new Date().toDateString()}.log` }),
  ],
});

export default logger;
