import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import CleanCSS from 'clean-css';
import { minify } from 'terser';

const root = process.cwd();
const out = path.join(root, 'dist');

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

const entries = [
  'index.html', '404.html', 'robots.txt', 'sitemap.xml', 'llms.txt',
  'informacoes.md', 'assets'
];

for (const entry of entries) {
  await cp(path.join(root, entry), path.join(out, entry), { recursive: true });
}

await mkdir(path.join(out, 'css'), { recursive: true });
await mkdir(path.join(out, 'js'), { recursive: true });

// Keep the source stylesheet readable while shipping the production-only
// performance rules together with it in one minified request.
const css = await readFile(path.join(root, 'css/style.css'), 'utf8');
const performanceCss = await readFile(path.join(root, 'css/performance.css'), 'utf8');
const cssResult = new CleanCSS({ level: 2 }).minify(`${css}\n${performanceCss}`);
if (cssResult.errors.length) throw new Error(cssResult.errors.join('\n'));
await writeFile(path.join(out, 'css/style.css'), cssResult.styles);

const js = await readFile(path.join(root, 'js/main.js'), 'utf8');
const jsResult = await minify(js, { compress: true, mangle: true, format: { comments: false } });
if (!jsResult.code) throw new Error('Terser did not generate JavaScript output.');
await writeFile(path.join(out, 'js/main.js'), jsResult.code);

// The repository keeps the original team photos as masters. In production,
// let the browser choose an already-generated responsive WebP variant. This
// changes only the number of pixels transferred for the rendered size; it does
// not lower encoder quality or recompress the photos during the build.
let html = await readFile(path.join(out, 'index.html'), 'utf8');
const teamImages = ['equipe-passeio', 'equipe-por-do-sol', 'equipe-buggy'];
for (const name of teamImages) {
  html = html.replace(
    `src="assets/${name}-original.webp"`,
    `src="assets/${name}-800.webp" srcset="assets/${name}-400.webp 400w, assets/${name}-800.webp 800w, assets/${name}-960.webp 960w" sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 1160px) calc((100vw - 96px) / 3), 353px"`
  );
}
await writeFile(path.join(out, 'index.html'), html);

console.log('Production build generated with minified assets and quality-preserving responsive image delivery.');
