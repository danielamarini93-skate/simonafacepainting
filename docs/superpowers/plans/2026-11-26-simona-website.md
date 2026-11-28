# Simona Face Painting Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the WordPress site with a fast, mobile-first Astro portfolio site that keeps the same URL structure, converts visitors to WhatsApp, and is set up for Google.

**Architecture:** Static Astro site. Content (services, reviews, areas, FAQs, gallery metadata) lives in typed data files under `src/data/` and `src/content/`; pages are thin templates over shared components. Media is pre-processed by `scripts/process-media.mjs` (run locally and by a GitHub Action on `incoming/`), and Astro's image pipeline makes responsive AVIF/WebP.

**Tech Stack:** Astro 5, TypeScript, plain CSS (custom properties), sharp, heic-convert, ffmpeg (videos), Vitest (unit), Playwright (smoke), Netlify.

**Spec:** `docs/superpowers/specs/2026-11-26-simona-website-design.md`

## Global Constraints

- URL structure identical to the live sitemap (user instruction): `/`, `/about/`, `/services/`, `/services/face-painting-children-adults/`, `/services/childrens-face-painting/`, `/services/glitter-bar-kids-adults/`, `/services/glitter-tattoos-children-adults/`, `/services/seasonal-themed-events/`, `/pricing/`, `/areas-we-cover/`, `/gallery/`, `/faqs/`, `/contact/`, `/privacy-policy/`, `/terms-conditions/`. Trailing slashes. `/landing-1/`, `/landing-2/`, `/landing-3/`, `/amen/` → 301 to `/`.
- WhatsApp: `https://wa.me/447459889053?text=<urlencoded>`; phone display `07459 889053`; email `simonafacepaintinguk@gmail.com`.
- Brand kept from current site, modernised: black / near-black surfaces, magenta accent `#E934E8`, mint-white `#F3FAF3`, steel blue `#4B6E91` secondary; display font Cinzel Decorative (brand/H1 only), Cinzel for headings, Raleway body.
- Hero uses a looping muted video (with poster); at least one more video section elsewhere (home "see Simona at work" + gallery + service pages).
- No children's names in filenames, alt text or captions. EXIF/GPS stripped from all published images.
- Targets: Lighthouse mobile Performance ≥ 90, SEO 100, Accessibility ≥ 95.
- Analytics: Cloudflare Web Analytics snippet, token from env `PUBLIC_CF_BEACON_TOKEN`, omitted when unset.

## Review Focus

- Visitor on a phone with autoplay blocked / data saver → hero shows the poster image, text and WhatsApp button still fully usable. (Test: smoke test asserts poster attribute + CTA visible.)
- WhatsApp link with special characters in prefilled text → must be URL-encoded. (Test: `whatsappUrl` unit test.)
- Photo uploaded sideways or as HEIC with GPS → published image upright, JPEG/WebP, no GPS. (Test: process-media unit test with fixture.)
- Gallery with JS disabled → all images still visible (filter is progressive enhancement). (Test: smoke test with `javaScriptEnabled:false`.)
- Old WordPress URLs / staging links → no 404s. (Test: smoke test iterates the sitemap URL list; `netlify.toml` redirects checked.)

---

### Task 1: Scaffold + design system + layout

**Files:** `package.json`, `astro.config.mjs` (site `https://simonafacepainting.co.uk`, `trailingSlash: 'always'`, sitemap integration), `src/styles/global.css`, `src/layouts/Base.astro`, `src/components/{Header,Footer,WhatsAppButton,Seo}.astro`, `src/lib/site.ts`, `tests/unit/site.test.ts`, `netlify.toml`.

**Interfaces — Produces:**
- `site` object in `src/lib/site.ts`: `{ name, phoneDisplay, phoneE164: '447459889053', email, instagram, facebook, url }`.
- `whatsappUrl(text?: string): string` — default text `"Hi Simona! I'd like a quote for an event. Date: … Area: … Guests: …"`.
- `Base.astro` props: `{ title: string; description: string; image?: string; schema?: object[] }`.

- [ ] Test `whatsappUrl` returns `https://wa.me/447459889053?text=` + encodeURIComponent(text), and default text non-empty.
- [ ] Implement; `npm test` passes.
- [ ] Header: logo, nav (Home, About, Services▾, Pricing, Areas, Gallery, FAQs, Contact), mobile menu (`<details>`-based, no JS required). Sticky WhatsApp FAB on mobile.
- [ ] `npm run build` succeeds. Commit.

### Task 2: Media pipeline + curated media

**Files:** `scripts/process-media.mjs`, `tests/unit/process-media.test.ts`, `src/content/gallery/*.jpg` + `src/data/gallery.ts`, `public/video/*.mp4` + posters, `.github/workflows/process-media.yml`, `incoming/README.md`.

**Interfaces — Produces:** `processImage(inPath, outDir): Promise<{file, width, height}>` (HEIC→JPEG, rotate, strip metadata, max 2400px, q82); `galleryItems: {src: ImageMetadata; alt: string; category: Category; caption?: string; featured?: boolean}[]`; `type Category = 'kids'|'adults'|'glitter-bar'|'glitter-tattoos'|'corporate'|'seasonal'`.

- [ ] Test: fixture JPEG with EXIF GPS + orientation 6 → output has no GPS/EXIF, width/height swapped.
- [ ] Implement; tests pass.
- [ ] Curate ~50 photos + 4–6 videos from Drive; videos encoded `ffmpeg -an -vf scale=-2:720 -c:v libx264 -crf 28 -preset slow -movflags +faststart`, ≤ 15s, plus WebP poster.
- [ ] Action: on push touching `incoming/**`, run script, commit results, remove originals. Commit.

### Task 3: Home page

Hero video (`autoplay muted loop playsinline preload=metadata poster`), H1 "Face Painting & Glitter Art in London", WhatsApp + "See the gallery" CTAs, trust strip (DBS checked · Fully insured · Skin-safe paints · Eco glitter), services cards, gallery highlights, "Simona at work" video, why choose us, reviews, client logos, areas teaser, final CTA. JSON-LD LocalBusiness.

- [ ] Build; smoke test asserts hero video has poster, H1 present, WhatsApp link present. Commit.

### Task 4: Service pages + /services/

`src/data/services.ts` (slug, title, metaTitle, metaDescription, intro, sections, images, videos, faqs). One `ServicePage.astro` template. Rewritten copy (fix "uadds"). Service JSON-LD + FAQPage where FAQs shown.

- [ ] Build; smoke test checks each slug returns 200 with unique `<title>`. Commit.

### Task 5: Gallery, Pricing, Areas, About, FAQs, Contact, legal

Gallery: CSS grid, category filter buttons (JS enhancement, `data-category`), lightbox via `<dialog>`, videos section. Pricing: three cards (£160/2h/15–20, £190/2h/30–35, £320/3h/45–50) + application time + what's included. Areas: boroughs + towns lists (fix "Walton on theme" → "Walton-on-Thames"). FAQs: `<details>` accordion + FAQPage schema. Contact: WhatsApp primary, phone, email, socials, Netlify form (name, email, date, area, guests, message). Legal pages ported from live HTML.

- [ ] Build; smoke test JS-disabled gallery shows all images. Commit.

### Task 6: SEO + verification + deploy prep

`robots.txt`, sitemap, canonical, OG image, 301s in `netlify.toml`, Lighthouse run on preview.

- [ ] Smoke test all sitemap URLs 200; Lighthouse mobile meets targets; deploy preview; commit + PR.
