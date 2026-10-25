'use strict';

const { stripcomments } = require('./base');

function parse(source) {
  const text = stripcomments(source);
  const rows = text.split(/\r?\n/);
  return { type: 'chunk', body: rows.filter(row => row.trim()).map(row => ({ type: 'line', text: row })) };
}

module.exports = { parse };
