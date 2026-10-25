'use strict';

function limit(value, amount) {
  return Math.min(Math.max(0, value), amount || 200000);
}

module.exports = { limit };
