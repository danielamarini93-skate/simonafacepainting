import type { ImageMetadata } from 'astro';
import data from '../data/gallery.json';

export type Category = 'kids' | 'adults' | 'glitter-bar' | 'glitter-tattoos' | 'corporate' | 'seasonal';
export const CATEGORY_LABELS: Record<Category, string> = {
  kids: 'Kids',
  adults: 'Adults',
  'glitter-bar': 'Glitter bar',
  'glitter-tattoos': 'Glitter tattoos',
  corporate: 'At events',
  seasonal: 'Seasonal',
};

export interface GalleryItem { src: ImageMetadata; alt: string; category: Category; featured?: boolean; file: string; }

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/gallery/*.{jpg,jpeg,png,webp}', { eager: true });
const byName = new Map(Object.entries(files).map(([p, m]) => [p.split('/').pop()!, m.default]));

export const gallery: GalleryItem[] = (data as Omit<GalleryItem, 'src'>[])
  .filter((d) => byName.has(d.file))
  .map((d) => ({ ...d, src: byName.get(d.file)! }));

export function pick(opts: { categories?: Category[]; featured?: boolean; limit?: number } = {}): GalleryItem[] {
  let items = gallery.filter((g) => (!opts.categories || opts.categories.includes(g.category)));
  if (opts.featured) items = [...items.filter((g) => g.featured), ...items.filter((g) => !g.featured)];
  return opts.limit ? items.slice(0, opts.limit) : items;
}
export const byFile = (file: string) => gallery.find((g) => g.file === file);

/** Interleave categories (featured first within each) so neighbouring photos differ. */
export function mix(limit?: number): GalleryItem[] {
  const cats: Category[] = ['kids', 'adults', 'glitter-bar', 'glitter-tattoos', 'seasonal', 'corporate'];
  const lists = cats.map((c) => pick({ categories: [c], featured: true }));
  const out: GalleryItem[] = [];
  for (let i = 0; out.length < (limit ?? gallery.length) && lists.some((l) => l.length > i); i++)
    for (const l of lists) if (l[i]) out.push(l[i]);
  return out.slice(0, limit);
}
