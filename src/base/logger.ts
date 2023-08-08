import { Express } from 'express';
import * as winstonExpress from 'express-winston';
import * as winston from 'winston';

// =================== [Default Configuration] ===================
let logMiddleware = winstonExpress.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
  meta: false,
  msg: '{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}',
});
let logErrorMiddleware = winstonExpress.errorLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
});

// ===============================================================

function initLogging(app: Express, config?: winstonExpress.LoggerOptions) {
  if (config) logMiddleware = winstonExpress.logger(config);
  app.use(logMiddleware);
}

function initLoggingError(
  app: Express,
  config?: winstonExpress.ErrorLoggerOptions,
) {
  if (config) logErrorMiddleware = winstonExpress.errorLogger(config);
  app.use(logErrorMiddleware);
}

export { initLogging, initLoggingError };
