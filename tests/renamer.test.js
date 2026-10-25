'use strict';

const assert = require('assert');
const { renameCode } = require('../src/renamer');

const source = [
  'local v1 = game:GetService("Players")',
  'game:GetService("Players").PlayerAdded:Connect(function(v2)',
  '  local v3 = {value = v2.UserId}',
  '  print(v3.value)',
  'end)',
  'for v4, v5 in ipairs(v1:GetPlayers()) do print(v4, v5) end',
].join('\n');
const output = renameCode(source);
assert.match(output, /local players = game:GetService\("Players"\)/);
assert.match(output, /function\(player\)/);
assert.match(output, /local tbl = \{value = player\.UserId\}/);
assert.match(output, /for index, player in ipairs\(players:GetPlayers\(\)\)/);
assert.match(output, /print\(index, player\)/);
assert.doesNotMatch(output, /\bv[1-5]\b/);

const urlOutput = renameCode('local v1 = loadstring(game:HttpGet("https://github.com/axom0022/MyScript/blob/main/init.lua"))()\nprint(v1)');
assert.match(urlOutput, /local myScript =/);
assert.match(urlOutput, /print\(myScript\)/);

process.stdout.write('renamer.test.js: OK\n');
