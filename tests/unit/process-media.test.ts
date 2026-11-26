import { describe, it, expect, beforeAll } from 'vitest';
import sharp from 'sharp';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { processImage, slugFor, CATEGORIES } from '../../scripts/process-media.mjs';

let dir: string; let input: string;
beforeAll(async () => {
  dir = mkdtempSync(join(tmpdir(), 'pm-'));
  input = join(dir, 'IMG_0001.jpg');
  // 400x200 landscape, EXIF says "rotate 90" (orientation 6) and carries GPS
  const buf = await sharp({ create: { width: 400, height: 200, channels: 3, background: '#e934e8' } })
    .jpeg()
    .withExif({ IFD0: { Make: 'Apple', Model: 'iPhone' }, IFD3: { GPSLatitudeRef: 'N', GPSLatitude: '51/1 30/1 0/1' } })
    .withMetadata({ orientation: 6 })
    .toBuffer();
  writeFileSync(input, buf);
});

describe('processImage', () => {
  it('rotates upright and strips all metadata (incl. GPS)', async () => {
    const out = await processImage(input, dir, 'kids-test');
    expect(out.width).toBe(200);
    expect(out.height).toBe(400);
    const meta = await sharp(out.path).metadata();
    expect(meta.exif).toBeUndefined();
    expect(meta.orientation === undefined || meta.orientation === 1).toBe(true);
    expect(out.path.endsWith('kids-test.jpg')).toBe(true);
  });
  it('caps the long edge at 2000px', async () => {
    const big = join(dir, 'big.jpg');
    writeFileSync(big, await sharp({ create: { width: 4000, height: 3000, channels: 3, background: '#000' } }).jpeg().toBuffer());
    const out = await processImage(big, dir, 'big-out');
    expect(Math.max(out.width, out.height)).toBe(2000);
  });
});

describe('slugFor', () => {
  it('never keeps the original (possibly personal) filename', () => {
    const s = slugFor('kids', 'Emily_birthday.HEIC', 3);
    expect(s).not.toMatch(/emily/i);
    expect(s).toMatch(/^kids-[a-z0-9]+$/);
  });
  it('knows the six categories', () => {
    expect(CATEGORIES).toEqual(['kids', 'adults', 'glitter-bar', 'glitter-tattoos', 'corporate', 'seasonal']);
  });
});
