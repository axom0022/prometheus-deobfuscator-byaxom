'use strict';

function print(tree) {
  if (!tree || !Array.isArray(tree.body)) return '';
  return tree.body.map(item => item.text).join('\n') + (tree.body.length ? '\n' : '');
}

module.exports = { print };
