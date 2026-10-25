'use strict';

const assert = require('assert');
const { pasteOutput } = require('../src/pipeline');

async function run() {
  const originalFetch = global.fetch;
  try {
    const fallbackCalls = [];
    global.fetch = async url => {
      fallbackCalls.push(url);
      if (url === 'https://paste.code-solutions.dev/documents') {
        return { ok: true, status: 201, text: async () => JSON.stringify({ key: 'fallback-key' }) };
      }
      throw new Error('offline');
    };
    const fallback = await pasteOutput('test output');
    assert.deepStrictEqual(fallback, { url: 'https://paste.code-solutions.dev/fallback-key', service: 'paste.code-solutions.dev' });
    assert.deepStrictEqual(fallbackCalls, [
      'https://paste.rs/',
      'https://dpaste.org/api/',
      'https://paste.code-solutions.dev/documents',
    ]);

    global.fetch = async () => { throw new Error('offline'); };
    await assert.rejects(
      () => pasteOutput('private test output'),
      error => /All paste services failed/.test(error.message) && /paste\.rs/.test(error.message) && /0x0\.st/.test(error.message) && !error.message.includes('private test output'),
    );
    process.stdout.write('paste.test.js: OK\n');
  } finally {
    global.fetch = originalFetch;
  }
}

run().catch(error => {
  process.stderr.write((error.stack || error.message || String(error)) + '\n');
  process.exitCode = 1;
});
