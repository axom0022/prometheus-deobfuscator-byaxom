'use strict';

const { key, simple } = require('./base');
const { deobfuscate } = require('./flow');
const { normalize } = require('./name');

function roles(source) {
  let output = '';
  let at = 0;
  while (at < source.length) {
    const ch = source[at];
    const next = source[at + 1];
    if (ch === '-' && next === '-') {
      const end = source.indexOf('\n', at + 2);
      const stop = end < 0 ? source.length : end;
      output += source.slice(at, stop);
      at = stop;
      continue;
    }
    if (ch === '"' || ch === "'") {
      const quote = ch;
      let end = at + 1;
      while (end < source.length) {
        if (source[end] === '\\') {
          end += 2;
          continue;
        }
        if (source[end] === quote) {
          end += 1;
          break;
        }
        end += 1;
      }
      output += source.slice(at, end);
      at = end;
      continue;
    }
    if (ch === '[' && next === '[') {
      const end = source.indexOf(']]', at + 2);
      const stop = end < 0 ? source.length : end + 2;
      output += source.slice(at, stop);
      at = stop;
      continue;
    }
    if (/[A-Za-z_]/.test(ch)) {
      let end = at + 1;
      while (end < source.length && /[A-Za-z0-9_]/.test(source[end])) end += 1;
      const word = source.slice(at, end);
      output += /^p\d+$/.test(word) ? `fp${word.slice(1)}` : word;
      at = end;
      continue;
    }
    output += ch;
    at += 1;
  }
  return output;
}

class bridge {
  constructor() {
    this.cache = new Map();
  }

  ask(source, options) {
    const hash = key(source + JSON.stringify(options || {}));
    if (this.cache.has(hash)) return Promise.resolve(this.cache.get(hash));
    const fast = simple(source);
    let output = fast;
    let recovered = false;
    try {
      output = deobfuscate(source, { detect: true, name: 'chunk', x: 2000000 }).code;
      recovered = true;
    } catch (error) {
      if (fast === null) {
        try {
          output = deobfuscate(source, { detect: false, name: 'chunk', x: 2000000 }).code;
          recovered = true;
        } catch (fallbackError) {
          output = source;
        }
      }
    }
    output = normalize(recovered ? roles(output) : output);
    this.cache.set(hash, output);
    return Promise.resolve(output);
  }

  close() {
    this.cache.clear();
  }
}

module.exports = { bridge, roles };
