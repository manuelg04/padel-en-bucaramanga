# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run build:cf     # Build for Cloudflare Workers
npm run deploy       # Deploy to Cloudflare Workers
npm run preview      # Local preview of CF Worker build
npm run lint         # Run ESLint
npm test             # Run Vitest once
npm run test:watch   # Run Vitest in watch mode
```

## Architecture

**Next.js 15 App Router + TypeScript** SEO-optimized directory for padel clubs in Bucaramanga. All data is static JSON files — no database, no CMS, no API.

### Data Flow

Content lives in `/data/clubs/*.json` and `/data/guides/*.json`. `lib/data.ts` loads and validates these files using Zod schemas defined in `lib/schemas.ts`, wrapped with React's `cache()` to avoid redundant reads. Pages consume this data as server components.

**Club schema:** `slug, name, city, address, tags[], instagramHandle, instagramPostUrls[], whatsapp, website, googleMapsUrl, bookingNotes, lastUpdated`

**Guide schema:** `slug, title, description, publishedAt, content (Markdown), relatedClubSlugs[]`

### Routes

- `/` → redirects to `/padel-bucaramanga`
- `/padel-bucaramanga` → SEO hub with clubs, guides, FAQ
- `/clubes` → filterable clubs directory (client-side filters via `ClubFilters`)
- `/clubes/[slug]` → club detail with Instagram embeds
- `/guias` → guides list
- `/guias/[slug]` → guide with react-markdown rendering

### SEO

Every page has: unique `<title>` + meta description, one H1, canonical URL, JSON-LD structured data (via `components/seo/`), dynamic sitemap (`app/sitemap.ts`), and robots.txt (`app/robots.ts`). Site config (URL, name) lives in `lib/site.ts`. SEO metadata builders in `lib/seo.ts`.

### Adding Content

- New club: create `/data/clubs/<slug>.json` matching the club schema
- New guide: create `/data/guides/<slug>.json` with Markdown in the `content` field

### Styling

Tailwind CSS with shadcn/ui components. Dark mode via CSS custom properties (HSL). Fonts: Merriweather (headings), Source Sans 3 (body) via `--font-heading` / `--font-body` CSS variables. Path alias `@/*` maps to project root.

### Tests

Vitest with Node environment. Test files in `tests/**/*.test.ts`. Coverage via V8.

## Deployment

This site runs on **Cloudflare Workers** via `@opennextjs/cloudflare`. Config lives in `open-next.config.ts` and `wrangler.jsonc` (worker name: `padel-en-bucaramanga`).

- Build for CF: `npm run build:cf` → outputs to `.open-next/`
- Deploy: `npm run deploy`
- Local preview: `npm run preview`

Set `NEXT_PUBLIC_SITE_URL` to the production URL; defaults to the workers.dev subdomain.

## Gotchas

- **Data files are bundled, not read at runtime.** Cloudflare Workers have no filesystem access, so all JSON in `/data/` must be imported statically (not via `fs`). If you add new data files, ensure they are imported in `lib/data.ts` rather than loaded with `fs.readFileSync`.
