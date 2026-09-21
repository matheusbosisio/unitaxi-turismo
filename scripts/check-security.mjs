import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
const headers = config.headers.find(rule => rule.source === '/(.*)').headers;
const csp = headers.find(header => header.key === 'Content-Security-Policy').value;
const scripts = csp.split(';').find(directive => directive.trim().startsWith('script-src '));
assert.ok(!scripts.includes("'unsafe-inline'"));
assert.ok(!scripts.includes("'unsafe-eval'"));
assert.ok(csp.includes("frame-ancestors 'none'"));
for (const filename of ['index.html', '404.html']) {
  const html = (await readFile(new URL('../' + filename, import.meta.url), 'utf8')).replace(/\r\n?/g, '\n');
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (/\bsrc\s*=/.test(match[1])) continue;
    const hash = createHash('sha256').update(match[2]).digest('base64');
    assert.ok(scripts.includes("'sha256-" + hash + "'"), filename + ': update CSP hash when changing inline scripts');
  }
}
console.log('Security headers and inline script hashes verified.');
