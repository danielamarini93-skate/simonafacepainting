# Simona's Face Painting — new website design

Date: 2026-11-26
Status: draft for approval

## Intent and the why

Simona runs a face painting and glitter business based in London
(face painting for children and adults, glitter bar, glitter tattoos,
seasonal/themed events; private parties, corporate events, weddings,
school fairs, festivals). Her current site (WordPress, built by an agency)
is slow-feeling, has an empty gallery, no video, broken links to an old
staging domain, typos, and weak Google setup.

The new site has three jobs, in this order:

1. **Portfolio** — show the quality of her work with beautiful photos and
   short video. This is the centrepiece.
2. **Be found online** — rank for searches like "face painter London",
   "glitter bar hire", "corporate face painting London", "face painter
   Croydon", and support her Google Business Profile.
3. **Build credibility** — reviews, client logos, DBS + insurance,
   skin-safe / eco glitter, real event photos.

Bookings today come through **WhatsApp**. The site's conversion action is
therefore "Message Simona on WhatsApp", not a booking engine.

## Goals

- A "WhatsApp" call to action reachable from every page (sticky on mobile),
  opening a chat with a pre-filled message, e.g.
  `Hi Simona, I'd like a quote for an event on [date] in [area].`
- Mobile-first, fast: target Lighthouse mobile Performance ≥ 90, SEO 100,
  Accessibility ≥ 95, LCP < 2.5s on 4G.
- A large, filterable gallery sorted by service/occasion, plus short
  looping video clips.
- Each service and key area has its own crawlable page with unique title,
  meta description, H1 and copy.
- Structured data (schema.org LocalBusiness/ProfessionalService with
  service area, Service, FAQPage, Review/AggregateRating only where the
  reviews are visible on the page).
- Easy to add new photos after a busy weekend: drop files into a folder,
  commit, and the gallery + image optimisation update automatically.

## Non-goals

- Online booking/calendar or payments.
- A blog at launch (structure should allow adding one later).
- A visual CMS at launch (a simple editor like Decap CMS may be added
  later; don't block it).
- Multilingual.

## Anti-goals (failure even if it "works")

- A pretty site that's slow on phones (heavy uncompressed photos/video).
- Visitors who can't find how to contact her within one screen.
- Thin, duplicated "area pages" that look like spam to Google.
- Losing existing Google rankings during the switch (old URLs 404ing).
- Children's names or identifying details in file names, alt text or captions.

## Constraints

- Repo: `danielamarini93-skate/simonafacepainting` (currently empty).
- Hosting: Netlify free tier, auto-deploy from GitHub.
- Domain `simonafacepainting.co.uk` currently points to agency WordPress
  hosting. Switching DNS needs access to the domain registrar account
  (who holds it is unknown — likely Simona or the agency). Build and launch
  on a Netlify preview URL first; DNS switch is a separate, final step.
- Media source: Google Drive folder `1vHrXL05lkJpw26HeqTJaYrwzX67biC0j`
  (~269 files: ~155 phone photos HEIC/JPG, ~100 Canva PNG graphics with
  text overlays, 13 videos 2–43 MB). Accessible via the Google Drive
  connector only (not public).
- Simona has confirmed parental permission to publish the photos of
  children.
- Contact: phone/WhatsApp 07459 889053 (assumed same number for WhatsApp),
  email simonafacepaintinguk@gmail.com, Instagram + Facebook (links from
  current site).

## Approaches considered

1. **New static site in this repo, free hosting (chosen).** Full control
   over design, speed and SEO; no hosting fees; edits go via the repo.
   Needs registrar access to switch the domain.
2. Improve the existing WordPress site. Familiar editor, but no access
   from here and the agency theme limits speed.
3. Squarespace/Wix rebuild. Easy self-editing, but ~£15–20/month and less
   control over speed and SEO.

Chosen: **1**, because speed and SEO are the main goals and it removes
the dependency on the agency.

## Decided how

- **Stack:** Astro (static output), plain CSS (no heavy UI framework),
  minimal JS (gallery filter + lightbox only). Astro's image pipeline
  (`astro:assets` / sharp) generates responsive AVIF/WebP + JPEG fallback,
  with width/height set to avoid layout shift.
- **Hosting:** Netlify, deploys on push to the main branch; PR previews.
- **Media pipeline:** a repeatable script that converts HEIC → JPEG,
  strips EXIF/GPS location data (privacy), auto-rotates, and caps the
  long edge (~2400px) before committing to `src/content/gallery/`.
  Videos: trimmed to the best 6–15s, re-encoded H.264 MP4 (+ WebM
  optional), ~720p, muted, no audio track, target < 2–3 MB each,
  with a poster image; played `autoplay muted loop playsinline` and
  lazy-loaded (only when scrolled into view). Large originals are not
  committed.
- **Gallery data:** each image has a small metadata entry (category,
  descriptive alt text, optional caption e.g. "Pret corporate event").
  Categories: Kids face painting · Adult face painting · Glitter bar ·
  Glitter tattoos · Corporate & events · Seasonal (Halloween, Pride,
  Day of the Dead, Christmas).
- **Curation:** builder shortlists the strongest ~40–60 photos and
  4–6 video clips, prefers clean photos over Canva text graphics, and
  shows the shortlist to Daniela before launch.
- **Content:** reuse the current site's copy, prices, area list,
  testimonials and client logos, with typos fixed; rewrite for clarity.

## Site map

| URL | Purpose |
|-----|---------|
| `/` | Hero (best photo or video loop) + WhatsApp CTA, services, gallery highlights, why choose us (DBS, insured, skin-safe, eco glitter), reviews, client logos, areas, FAQ teaser |
| `/gallery/` | Full filterable portfolio + video clips |
| `/services/face-painting/` | Children & adults |
| `/services/glitter-bar/` | Kids 7+ & adults |
| `/services/glitter-tattoos/` | |
| `/services/seasonal-themed-events/` | Halloween, Pride, Day of the Dead, etc. |
| `/events/` (sections or sub-pages) | Private parties, corporate, weddings, school fairs & festivals — corporate gets its own page (`/corporate-events/`) given the client logos |
| `/pricing/` | Starting prices (parties £160/2h, corporate £190/2h, weddings £320/3h), what's included, travel note |
| `/areas-we-cover/` | London + surrounding areas; a small number of genuinely distinct area pages may come later, not at launch |
| `/about/` | Simona's story, photo, credentials |
| `/faqs/` | Real FAQs, with FAQPage schema |
| `/contact/` | WhatsApp (primary), phone, email, Instagram, optional simple form via Netlify Forms |
| `/privacy-policy/`, `/terms-conditions/` | Carried over |

Old WordPress URLs are kept where identical; any that change get 301
redirects in `netlify.toml` (crawl the live site's sitemap to list them
before switching DNS).

## SEO and Google

- Unique `<title>` / meta description per page, one H1, logical headings.
- Descriptive alt text on every image (what the design is, never a
  child's name).
- `sitemap.xml`, `robots.txt`, canonical URLs, Open Graph/Twitter images.
- JSON-LD: LocalBusiness/ProfessionalService with `areaServed` (London +
  listed areas), phone, sameAs (Instagram, Facebook, Google Maps);
  Service entries; FAQPage.
- NAP (name, phone) identical to the Google Business Profile.
- Launch checklist for Daniela/Simona (outside the codebase): verify the
  site in Google Search Console and submit the sitemap; Google Business
  Profile fixes — add hidden base address to stop the pin showing in
  Germany, change website from instagram.com to the domain, review the
  category, add photos.

## Visual direction

Joyful but polished — her work is colourful, so the site frame stays
calm (warm white background, one deep accent colour, a playful-but-readable
display font for headings) so the photos carry the colour. Big imagery,
generous spacing, rounded corners, subtle sparkle accents used sparingly.
Builder proposes 1–2 mockups of the home page for Daniela to react to
before building all pages.

## Left to the builder

- Exact colour palette, fonts, component design (within the direction above).
- Which photos/videos make the shortlist (subject to Daniela's review).
- Copy wording.
- Lightbox/filter implementation details.
- Netlify Forms on the contact page: include if trivial.
