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

const css = await readFile(path.join(root, 'css/style.css'), 'utf8');
const cssResult = new CleanCSS({ level: 2 }).minify(css);
if (cssResult.errors.length) throw new Error(cssResult.errors.join('\n'));
await writeFile(path.join(out, 'css/style.css'), cssResult.styles);

const js = await readFile(path.join(root, 'js/main.js'), 'utf8');
const jsResult = await minify(js, { compress: true, mangle: true, format: { comments: false } });
if (!jsResult.code) throw new Error('Terser did not generate JavaScript output.');
await writeFile(path.join(out, 'js/main.js'), jsResult.code);

console.log('Production build generated in dist/ with minified CSS and JavaScript.');
