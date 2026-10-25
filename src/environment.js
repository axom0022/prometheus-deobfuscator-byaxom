'use strict';

function ghost(name) {
  return { name, kind: 'ghost' };
}

function environment() {
  return { game: ghost('game'), task: ghost('task'), Enum: ghost('Enum') };
}

module.exports = { ghost, environment };
