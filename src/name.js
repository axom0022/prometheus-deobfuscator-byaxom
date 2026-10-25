'use strict';

function normalize(source) {
  const value = String(source || '').replace(/\r\n/g, '\n').trim();
  return value ? value + '\n' : '\n';
}

module.exports = { normalize };
