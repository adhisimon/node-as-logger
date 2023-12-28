# adhisimon-logger

[![Version npm](https://img.shields.io/npm/v/adhisimon-logger.svg)](https://www.npmjs.com/package/adhisimon-logger)
[![Npm package total downloads](https://img.shields.io/npm/dt/adhisimon-logger)](https://npmjs.com/package/adhisimon-logger)
[![node.js version](https://img.shields.io/node/v/adhisimon-logger)](https://www.npmjs.com/package/adhisimon-logger)
[![Module type: CJS](https://img.shields.io/badge/module%20type-cjs-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/standard/semistandard)
[![jsDocs.io](https://img.shields.io/badge/jsDocs.io-reference-blue)](https://www.jsdocs.io/package/jsdoc)
[![License](https://img.shields.io/github/license/adhisimon/node-as-logger)](https://github.com/adhisimon/node-as-logger/blob/main/LICENSE)

My simple logger (based on winston).

It just init [winston](https://github.com/winstonjs/winston) to display fancy colored logs on console
with metadata that I think was important.
Also put logs on rotating files if it's not running on
unit test.

- [adhisimon-logger](#adhisimon-logger)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Use on multiple module](#use-on-multiple-module)
      - [Main module](#main-module)
    - [Other modules](#other-modules)
  - [Unit test detection](#unit-test-detection)
  - [Changelog](#changelog)
  - [Planned transports](#planned-transports)
  - [License](#license)

## Installation
```shell
npm i adisimon-logger
```

## Usage
```javascript
const { create: createLogger } = require('adhisimon-logger');

const logger = createLogger({
  // all options are optional, here are default values
  level: 'verbose', // or process.env.LOG_LEVEL
  disableFileTransport: false, // it would always ignored if running on unit test
  dir: 'logs', // or process.env.LOG_DIR
  fileLevel: 'verbose', // will use "level" options if not specified
  baseFilename: 'app', // or process.env.LOG_BASE_FILENAME
  keepFiles: 31, // or process.env.LOG_KEEP_FILES
});
```

### Use on multiple module
You might create logger on main module and set it as global
so you can use it again on other modules.

#### Main module
```javascript
const logger = require('adhisimon.logger').create();
global.logger = logger;
```

### Other modules
```javascript
const logger = global.logger;
```

Or you can pass created logger instance as a parameter.

## Unit test detection
It detect unit test by detecting global "describe" function does exists.

## Changelog
See [CHANGELOG.md](CHANGELOG.md) file.

## Planned transports
I have plan to implement these transports too:
- http transport
- mysql transport
- amqp transport
- redis transport

## License
This package based on [winston](https://github.com/winstonjs/winston) which
has MIT License, so this package too.

See it on [LICENSE](LICENSE) file.
