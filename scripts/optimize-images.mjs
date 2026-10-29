// Run from the repository root. Assets are prepared once, never on a visitor's request.
import { createRequire } from 'node:module';
import { readdir, readFile, writeFile, mkdir, realpath, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const require = createRequire(import.meta.url);
const sharp = require(require.resolve('sharp', { paths: [await realpath('node_modules/vinext')] }));
const directory = 'public/media/optimized';
await rm(directory, { recursive: true, force: true });
await mkdir(directory, { recursive: true });
const manifest = {};
for (const name of (await readdir('public/media')).sort()) {
  if (!/\.(webp|png)$/.test(name) || /tyler/i.test(name)) continue;
  const original = await readFile(`public/media/${name}`);
  const metadata = await sharp(original).metadata();
  const logo = /logo|napit-red-tick/.test(name);
  const widths = [...new Set((logo ? [160, 320, 480] : [320, 480, 640, 960, 1440]).map(w => Math.min(w, metadata.width)))];
  const variants = [];
  for (const width of widths) {
    const buffer = await sharp(original).resize({ width, withoutEnlargement: true }).webp({ quality: logo ? 85 : 76, effort: 4 }).toBuffer();
    const hash = createHash('sha256').update(buffer).digest('hex').slice(0, 12);
    const filename = `${name.replace(/\.(webp|png)$/, '')}-${width}-${hash}.webp`;
    await writeFile(`${directory}/${filename}`, buffer);
    variants.push({ src: `/media/optimized/${filename}`, width, bytes: buffer.length });
  }
  manifest[`/media/${name}`] = { width: metadata.width, height: metadata.height, originalBytes: original.length, variants };
}
await writeFile('app/lib/image-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
await writeFile('app/lib/header-logo.json', JSON.stringify(manifest['/media/tb-logo.webp'], null, 2) + '\n');
console.log(`Prepared responsive variants for ${Object.keys(manifest).length} images.`);
