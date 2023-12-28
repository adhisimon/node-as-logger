const MODULE_NAME = 'LOGGER.CREATE';

const fs = require('node:fs');
const winston = require('winston');
require('winston-daily-rotate-file');
const isOnUnitTest = require('./is-on-unit-test');

/**
 * Create custom logger.
 *
 * @param {object} [options]
 *
 * @param {string} [options.level="verbose"] - minimun log level to dump, default to "verbose" or process.env.LOG_LEVEL value.
 * @param {string[]} [options.stderrLevels] - Array of strings containing the levels to log to stderr instead of stdout, for example ['error', 'debug', 'info']. Default to [].
 * @param {boolean} [options.disableFileTransport=false] - disable file transport. Default to false . File transport is always disabled if running on unit test.
 * @param {string} [options.dir="logs"] - log directory when using file transport. Default to "logs" or process.env.LOG_DIR value.
 * @param {string} [options.fileLevel] - log level on file transport. Default to the same value of other log level ("verbose").
 * @param {string} [options.baseFilename="app"] - base log filename when using file transport. Default to "app" or process.env.LOG_BASE_FILENAME value.
 * @param {number} [options.keepFiles=31] - number of rotated logs to keep. Default to 31 or process.env.LOG_KEEP_FILES value.
 *
 * @returns {winston.Logger}
 */
module.exports = (options) => {
  const logLevel = (options && options.level) ||
      process.env.LOG_LEVEL ||
      'verbose';

  const consoleTransport = new winston.transports.Console({
    stderrLevels: (options && Array.isArray(options.stderrLevels) && options.stderrLevels) || [],
    format: winston.format.combine(
      winston.format.metadata(),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      winston.format.colorize(),
      winston.format.printf(
        (info) => [
          process.stdout.isTTY ? info.timestamp : '',
          // info.timestamp,
          info.label ? `${info.label}:` : '',
          `${info.level}:`,
          info.message || '',
          info.metadata && Object.keys(info.metadata).length ? JSON.stringify(info.metadata) : ''
        ].filter((item) => item).join(' ').trim()
      )
    )
  });

  const logger = winston.createLogger({
    level: logLevel,
    format: winston.format.json(),
    defaultMeta: {
      pid: process.pid
    },
    transports: [
      consoleTransport
    ]
  });

  const disableFileTransport = isOnUnitTest ||
    (options && options.disableFileTransport);

  if (!disableFileTransport) {
    const logDir = (options && options.dir) ||
      process.env.LOG_DIR ||
      'logs';

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
      logger.debug(`${MODULE_NAME} 81BB0678: Log directory created`, { logDir });
    }

    const logBaseFilename = (options && options.baseFilename) ||
      process.env.LOG_BASE_FILENAME ||
      'app';

    const logKeepFiles = (options && options.keepFiles) ||
      Number(process.env.LOG_KEEP_FILES) ||
      31;

    const logFileLevel = (options && options.logFileLevel) ||
      logLevel;

    logger.add(new winston.transports.DailyRotateFile({
      level: logFileLevel,
      dirname: logDir,
      datePattern: 'YYYY-MM-DD',
      filename: `${logBaseFilename}.%DATE%.log`,
      createSymlink: true,
      symlinkName: `${logBaseFilename}.log`,
      maxFiles: logKeepFiles,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        winston.format.json()
      )
    }));
  }

  return logger;
};
