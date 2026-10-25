'use strict';

const pipeline = require('./src/pipeline');

if (require.main === module) {
  pipeline.main(process.argv.slice(2)).then(code => {
    process.exitCode = code || 0;
  }).catch(error => {
    process.stderr.write((error.stack || error.message || String(error)) + '\n');
    process.exitCode = 1;
  });
}

module.exports = pipeline;
