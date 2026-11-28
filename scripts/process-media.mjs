#!/usr/bin/env node
/**
 * Turns phone photos/videos dropped into `incoming/<category>/` into
 * web-ready gallery media, then removes the originals.
 *
 *   incoming/kids/IMG_1234.HEIC  ->  src/assets/gallery/kids-<id>.jpg
 *                                    + entry in src/data/gallery.json
 *   incoming/videos/clip.MOV     ->  public/video/<id>.mp4 + <id>.webp poster
 *                                    + entry in src/data/videos.json
 *
 * Images: HEIC decoded, auto-rotated, long edge capped at 2000px, and ALL
 * metadata (EXIF, GPS location, camera info) removed.
 * Videos: muted, 720px wide max, H.264, max 15s, poster frame.
 *
 * Run: npm run media
 */
import sharp from 'sharp';
import { readFile, readdir, mkdir, rm, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, basename, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

export const CATEGORIES = ['kids', 'adults', 'glitter-bar', 'glitter-tattoos', 'corporate', 'seasonal'];

const DEFAULT_ALT = {
  kids: "Children's face painting design by Simona's Face Painting, London",
  adults: "Adult face painting design by Simona's Face Painting, London",
  'glitter-bar': 'Cosmetic glitter look from the glitter bar, London',
  'glitter-tattoos': 'Glitter tattoo design, London',
  corporate: "Simona's Face Painting at a London event",
  seasonal: 'Themed face painting design, London',
};

const IMAGE_EXT = new Set(['.heic', '.heif', '.jpg', '.jpeg', '.png', '.webp']);
const VIDEO_EXT = new Set(['.mov', '.mp4', '.m4v']);

/** Short, stable, anonymous name — never reuses the uploaded filename. */
export function slugFor(category, originalName, salt = Date.now()) {
  const id = createHash('sha1').update(`${originalName}:${salt}`).digest('hex').slice(0, 8);
  return `${category}-${id}`;
}

async function decode(inputPath) {
  const ext = extname(inputPath).toLowerCase();
  const buf = await readFile(inputPath);
  if (ext === '.heic' || ext === '.heif') {
    const { default: heicConvert } = await import('heic-convert');
    return Buffer.from(await heicConvert({ buffer: buf, format: 'JPEG', quality: 0.95 }));
  }
  return buf;
}

/**
 * @returns {Promise<{path:string,width:number,height:number}>}
 */
export async function processImage(inputPath, outDir, baseName) {
  await mkdir(outDir, { recursive: true });
  const out = join(outDir, `${baseName}.jpg`);
  // sharp drops all metadata unless .withMetadata() is called — intentional.
  const info = await sharp(await decode(inputPath))
    .rotate()
    .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
  return { path: out, width: info.width, height: info.height };
}

export function processVideo(inputPath, outDir, baseName) {
  const mp4 = join(outDir, `${baseName}.mp4`);
  const poster = join(outDir, `${baseName}.webp`);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', inputPath, '-t', '15', '-an',
    '-vf', "scale='min(720,iw)':-2", '-c:v', 'libx264', '-crf', '27', '-preset', 'slow',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4]);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', '0.5', '-i', mp4, '-frames:v', '1', '-c:v', 'libwebp', '-q:v', '75', poster]);
  const [width, height] = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', mp4])
    .toString().trim().split(',').map(Number);
  return { mp4, poster, width, height };
}

async function readJson(p) { return existsSync(p) ? JSON.parse(await readFile(p, 'utf8')) : []; }

async function main(root) {
  const incoming = join(root, 'incoming');
  const galleryDir = join(root, 'src/assets/gallery');
  const videoDir = join(root, 'public/video');
  const galleryJson = join(root, 'src/data/gallery.json');
  const videosJson = join(root, 'src/data/videos.json');
  const gallery = await readJson(galleryJson);
  const videos = await readJson(videosJson);
  let added = 0;

  for (const folder of existsSync(incoming) ? await readdir(incoming) : []) {
    const dir = join(incoming, folder);
    if (!(await stat(dir)).isDirectory()) continue;
    for (const name of await readdir(dir)) {
      const file = join(dir, name);
      const ext = extname(name).toLowerCase();
      if (IMAGE_EXT.has(ext) && CATEGORIES.includes(folder)) {
        const slug = slugFor(folder, name);
        await processImage(file, galleryDir, slug);
        gallery.push({ file: `${slug}.jpg`, category: folder, alt: DEFAULT_ALT[folder] });
      } else if (VIDEO_EXT.has(ext)) {
        const slug = slugFor('video', name);
        await mkdir(videoDir, { recursive: true });
        const { width, height } = processVideo(file, videoDir, slug);
        videos.push({ id: slug, src: `/video/${slug}.mp4`, poster: `/video/${slug}.webp`, title: 'Simona at work', category: CATEGORIES.includes(folder) ? folder : 'kids', width, height });
      } else continue;
      await rm(file);
      added++;
      console.log(`processed ${folder}/${name}`);
    }
  }
  await mkdir(dirname(galleryJson), { recursive: true });
  await writeFile(galleryJson, JSON.stringify(gallery, null, 2) + '\n');
  await writeFile(videosJson, JSON.stringify(videos, null, 2) + '\n');
  console.log(`${added} file(s) processed`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main(process.argv[2] ?? process.cwd()).catch((e) => { console.error(e); process.exit(1); });
}
