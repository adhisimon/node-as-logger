/* global describe, it */

require('should');

const logger = require('../lib').create({
  level: 'debug'
});

describe('#adhisimon-logger', () => {
  it('should not throw error', () => {
    logger.silly('TEST').should.not.throw();
  });
});
