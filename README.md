# adhisimon-logger

[![Version npm](https://img.shields.io/npm/v/adhisimon-logger.svg)](https://www.npmjs.com/package/adhisimon-logger)
[![Npm package total downloads](https://img.shields.io/npm/dt/adhisimon-logger)](https://npmjs.com/package/adhisimon-logger)
[![Module type: CJS](https://img.shields.io/badge/module%20type-cjs-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/standard/semistandard)
[![jsDocs.io](https://img.shields.io/badge/jsDocs.io-reference-blue)](https://www.jsdocs.io/package/jsdoc)
[![License](https://img.shields.io/github/license/adhisimon/node-as-logger)](https://github.com/adhisimon/node-as-logger/blob/main/LICENSE)

My simple logger (based on winston).

**WORK IN PROGRESS**
It'll be ready soon.

It just init winston to display fancy colored logs on console.
Also put logs on rotating files if it's not running on
unit test.

## Unit test detection
It detect unit test by detecting global "describe" function does exists.
