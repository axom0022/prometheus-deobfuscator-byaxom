'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');
const { performance } = require('perf_hooks');
const { bridge } = require('./bridge');
const { renameCode } = require('./renamer');

const engine = new bridge();
const attribution = '-- [[ deobfuscated by Axomic Prometheus Deobfuscator | our discord server : [https://discord.gg/axomx](https://discord.gg/axomx) / https://discord.gg/Sps39CydcZ | Our YouTube channel : [https://youtube.com/@axos0022](https://youtube.com/@axos0022) ]]';
const pasteAgent = 'Axomic-Prometheus-Deobfuscator/1.0';

function page() {
  const items = [
    path.resolve(__dirname, '../web/index.html'),
    path.resolve(process.cwd(), 'web/index.html'),
    path.resolve(process.cwd(), 'index.html'),
  ];
  for (const item of items) {
    try { return fs.readFileSync(item, 'utf8'); } catch (error) {}
  }
  return '<!doctype html><html><head><meta charset="utf-8"><title>Axomic Prometheus-Deobfuscator</title></head><body><h1>Axomic Prometheus-Deobfuscator</h1><p>Web interface file not found.</p></body></html>';
}

function send(response, code, type, body) {
  const value = Buffer.from(body);
  response.writeHead(code, {
    'Content-Type': type,
    'Content-Length': value.length,
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
  });
  response.end(value);
}

function optionValue(value) {
  return value === true || value === 1 || value === 'true' || value === '1';
}

function formatOutput(source, options, elapsed) {
  const body = String(source || '').trim();
  const rows = [attribution];
  if (options.ms) rows.push(`-- Deobfuscation time: ${elapsed.toFixed(2)} ms`);
  if (body) rows.push(body);
  return rows.join('\n') + '\n';
}

function requestOptions(body) {
  const options = body && body.options && typeof body.options === 'object' ? { ...body.options } : {};
  if (Object.prototype.hasOwnProperty.call(body, 'ms')) options.ms = optionValue(body.ms);
  if (Object.prototype.hasOwnProperty.call(body, 'rename')) options.rename = optionValue(body.rename);
  options.ms = optionValue(options.ms);
  options.rename = optionValue(options.rename);
  return options;
}

function readRequest(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    request.on('data', chunk => {
      size += chunk.length;
      if (size <= 8000000) chunks.push(chunk);
    });
    request.on('error', reject);
    request.on('end', () => resolve({ size, data: Buffer.concat(chunks).toString('utf8') }));
  });
}

function absoluteUrl(value, base) {
  const text = String(value || '').trim();
  if (!text) throw new Error('paste service returned no URL');
  const parsed = new URL(text, base);
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') throw new Error('paste service returned an unsafe URL');
  return parsed.href;
}

function responseOkay(response) {
  return response.ok === true || (response.ok === undefined && response.status >= 200 && response.status < 300);
}

async function fetchTimed(url, options) {
  if (typeof fetch !== 'function') throw new Error('Node fetch is unavailable');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function pasteRs(content) {
  const response = await fetchTimed('https://paste.rs/', {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'User-Agent': pasteAgent },
    body: content,
  });
  const text = await response.text();
  if (!responseOkay(response)) throw new Error(`HTTP ${response.status}`);
  return absoluteUrl(text, 'https://paste.rs/');
}

async function dpaste(content) {
  const form = new URLSearchParams({ format: 'url', content });
  const response = await fetchTimed('https://dpaste.org/api/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'User-Agent': pasteAgent },
    body: form,
  });
  const text = await response.text();
  if (!responseOkay(response)) throw new Error(`HTTP ${response.status}`);
  try {
    const data = JSON.parse(text);
    return absoluteUrl(data.url, 'https://dpaste.org/');
  } catch (error) {
    return absoluteUrl(text, 'https://dpaste.org/');
  }
}

async function codeSolutionsPaste(content) {
  const response = await fetchTimed('https://paste.code-solutions.dev/documents', {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'User-Agent': pasteAgent },
    body: content,
  });
  const text = await response.text();
  if (!responseOkay(response)) throw new Error(`HTTP ${response.status}`);
  let data;
  try { data = JSON.parse(text); } catch (error) { throw new Error('invalid response'); }
  const value = data.url || (data.key ? `https://paste.code-solutions.dev/${data.key}` : '');
  return absoluteUrl(value, 'https://paste.code-solutions.dev/');
}

async function pastesDev(content) {
  const response = await fetchTimed('https://api.pastes.dev/post', {
    method: 'POST',
    headers: { 'Content-Type': 'text/x-lua; charset=utf-8', 'User-Agent': pasteAgent },
    body: content,
  });
  const text = await response.text();
  if (!responseOkay(response)) throw new Error(`HTTP ${response.status}`);
  const location = response.headers && typeof response.headers.get === 'function' ? response.headers.get('location') : null;
  if (location) return absoluteUrl(location, 'https://api.pastes.dev/');
  try {
    const data = JSON.parse(text);
    return absoluteUrl(data.url || data.key, 'https://api.pastes.dev/');
  } catch (error) {
    return absoluteUrl(text, 'https://api.pastes.dev/');
  }
}

async function nullPointer(content) {
  const form = new FormData();
  form.append('file', new Blob([content], { type: 'text/plain' }), 'deobfuscated.luau');
  const response = await fetchTimed('https://0x0.st', {
    method: 'POST',
    headers: { 'User-Agent': pasteAgent },
    body: form,
  });
  const text = await response.text();
  if (!responseOkay(response)) throw new Error(`HTTP ${response.status}`);
  return absoluteUrl(text, 'https://0x0.st/');
}

async function pasteOutput(content) {
  if (typeof content !== 'string' || !content.trim()) throw new Error('output is empty');
  const services = [
    ['paste.rs', pasteRs],
    ['dpaste.org', dpaste],
    ['paste.code-solutions.dev', codeSolutionsPaste],
    ['pastes.dev', pastesDev],
    ['0x0.st', nullPointer],
  ];
  const failures = [];
  for (const [name, publish] of services) {
    try {
      return { url: await publish(content), service: name };
    } catch (error) {
      failures.push(`${name}: ${error.message || 'failed'}`);
    }
  }
  throw new Error(`All paste services failed. ${failures.join('; ')}`);
}

function server(host, port) {
  const app = http.createServer(async (request, response) => {
    const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
    if (request.method === 'OPTIONS') {
      response.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS' });
      response.end();
      return;
    }
    if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
      send(response, 200, 'text/html; charset=utf-8', page());
      return;
    }
    if (request.method === 'GET' && url.pathname === '/health') {
      send(response, 200, 'application/json; charset=utf-8', JSON.stringify({ ok: true, runtime: 'node' }));
      return;
    }
    if (request.method === 'POST' && (url.pathname === '/api/deobfuscate' || url.pathname === '/api/paste')) {
      try {
        const requestBody = await readRequest(request);
        if (requestBody.size > 8000000) {
          send(response, 413, 'application/json; charset=utf-8', JSON.stringify({ error: 'Input is too large' }));
          return;
        }
        const body = JSON.parse(requestBody.data);
        if (url.pathname === '/api/paste') {
          if (typeof body.content !== 'string') throw new Error('content must be text');
          const result = await pasteOutput(body.content);
          send(response, 200, 'application/json; charset=utf-8', JSON.stringify(result));
          return;
        }
        if (typeof body.source !== 'string') throw new Error('source must be text');
        const output = await deobfuscate(body.source, requestOptions(body));
        send(response, 200, 'application/json; charset=utf-8', JSON.stringify({ output }));
      } catch (error) {
        send(response, 400, 'application/json; charset=utf-8', JSON.stringify({ error: error.message || 'Request failed' }));
      }
      return;
    }
    send(response, 404, 'text/plain; charset=utf-8', 'Not found');
  });
  app.listen(port, host, () => process.stdout.write(`Axomic Prometheus-Deobfuscator listening on http://${host}:${port}/\n`));
  return app;
}

async function deobfuscate(source, options) {
  if (typeof source !== 'string') throw new TypeError('source must be text');
  const settings = { ...(options || {}) };
  settings.ms = optionValue(settings.ms);
  settings.rename = optionValue(settings.rename);
  const start = performance.now();
  let output = await engine.ask(source, settings);
  if (settings.rename) output = renameCode(output);
  return formatOutput(output, settings, performance.now() - start);
}

function findarg(args, name) {
  const at = args.indexOf(name);
  return at < 0 ? null : args[at + 1];
}

function hasSwitch(values, name) {
  return values.includes(`--${name}`) || values.includes(name);
}

function inputArgument(values) {
  const skipNext = new Set(['-o', '--out', '--host', '--port']);
  const result = [];
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (skipNext.has(value)) {
      index += 1;
      continue;
    }
    if (value.startsWith('-') || value === 'web' || value === 'ms' || value === 'rename') continue;
    result.push(value);
  }
  return result[0] || null;
}

async function main(args) {
  const values = args || process.argv.slice(2);
  if (values.includes('--web') || values[0] === 'web') {
    const host = findarg(values, '--host') || '0.0.0.0';
    const port = Number(findarg(values, '--port') || 8765);
    server(host, port);
    return 0;
  }
  if (values.includes('--test')) {
    const roots = [path.resolve(process.cwd(), 'tests/fixtures'), path.resolve(__dirname, '../tests/fixtures')];
    const root = roots.find(item => fs.existsSync(item));
    if (!root) return 0;
    let failed = 0;
    for (const name of fs.readdirSync(root).filter(item => item.endsWith('.txt'))) {
      try {
        const source = fs.readFileSync(path.join(root, name), 'latin1');
        const output = await deobfuscate(source, {});
        if (!output.trim()) throw new Error('empty output');
        if (/\bp\d+\b/.test(output)) throw new Error('unscoped generated parameter name');
        if (!output.startsWith(attribution)) throw new Error('missing attribution');
        process.stdout.write(`${name}: OK\n`);
      } catch (error) {
        failed += 1;
        process.stdout.write(`${name}: FAIL ${error.message}\n`);
      }
    }
    engine.close();
    return failed ? 1 : 0;
  }
  const sourcefile = inputArgument(values);
  if (!sourcefile) throw new Error('input source is required unless web or --test is used');
  const source = fs.readFileSync(sourcefile, 'utf8');
  const output = await deobfuscate(source, { ms: hasSwitch(values, 'ms'), rename: hasSwitch(values, 'rename') });
  const target = findarg(values, '-o') || findarg(values, '--out');
  if (target) fs.writeFileSync(target, output, 'utf8');
  else process.stdout.write(output.endsWith('\n') ? output : output + '\n');
  engine.close();
  return 0;
}

module.exports = { deobfuscate, server, main, attribution, pasteOutput };
