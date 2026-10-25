'use strict';

const crypto = require('crypto');

function stripcomments(source) {
  let out = '';
  let at = 0;
  let quote = '';
  let long = false;
  while (at < source.length) {
    const ch = source[at];
    const next = source[at + 1];
    if (quote) {
      out += ch;
      if (ch === '\\' && at + 1 < source.length) {
        out += source[at + 1];
        at += 2;
        continue;
      }
      if (ch === quote) quote = '';
      at += 1;
      continue;
    }
    if (long) {
      if (source.startsWith(']]', at)) {
        out += ']]';
        at += 2;
        long = false;
      } else {
        out += ch;
        at += 1;
      }
      continue;
    }
    if ((ch === '"' || ch === "'") && !long) {
      quote = ch;
      out += ch;
      at += 1;
      continue;
    }
    if (ch === '[' && next === '[') {
      long = true;
      out += '[[';
      at += 2;
      continue;
    }
    if (ch === '-' && next === '-') {
      if (source[at + 2] === '[' && source[at + 3] === '[') {
        const end = source.indexOf(']]', at + 4);
        at = end < 0 ? source.length : end + 2;
      } else {
        const end = source.indexOf('\n', at + 2);
        at = end < 0 ? source.length : end;
      }
      if (out && !out.endsWith('\n')) out += '\n';
      continue;
    }
    out += ch;
    at += 1;
  }
  return out;
}

function key(source) {
  return crypto.createHash('sha256').update(source).digest('hex');
}

function simple(source) {
  const clean = stripcomments(source).trim();
  if (!clean) return '';
  if (/return\s*\(\s*function/.test(clean)) return null;
  if (/["'](?:\\.|.){2,}["']/.test(clean) && /while\s+|repeat\s+|for\s+/.test(clean)) return null;
  if (/\b(?:string\.char|string\.sub|table\.concat|setmetatable|getmetatable)\b/.test(clean) && clean.length > 160) return null;
  const rows = clean.split(';').map(item => item.trim()).filter(Boolean);
  return rows.join(';\n') + '\n';
}

module.exports = { stripcomments, key, simple };
