# Fast Video Saver

A modern, mobile-friendly video downloader website with a premium dark glassmorphism UI. Users can paste a video URL and get download options. The site is SEO-optimized and AdSense-ready.

## Run & Operate

- `pnpm --filter @workspace/fast-video-saver run dev` — run the web app
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS v4
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/fast-video-saver/src/` — React frontend (pages, components)
- `artifacts/fast-video-saver/src/pages/` — Home, PrivacyPolicy, Terms, not-found
- `artifacts/fast-video-saver/src/components/` — Navbar, Footer, DownloadBox, TrendingCard, FAQ, etc.
- `artifacts/fast-video-saver/index.html` — SEO-optimized HTML shell with JSON-LD structured data
- `artifacts/fast-video-saver/public/robots.txt` — search engine crawler rules
- `artifacts/fast-video-saver/public/sitemap.xml` — sitemap for all 3 pages
- `lib/api-spec/openapi.yaml` — OpenAPI spec source of truth
- `lib/db/src/schema/` — Drizzle database schema

## Architecture decisions

- Frontend-only for the video downloader UI — no backend needed for the download flow (client-side demo)
- Dark-mode only site with glassmorphism design system
- SEO-first: JSON-LD structured data, full meta tags, sitemap.xml, robots.txt
- react-helmet-async for per-page dynamic meta tags
- Wouter for client-side routing (lightweight, SPA)

## Product

Three pages:
1. **Home** — URL input, format selector, trending downloads, features, FAQ
2. **Privacy Policy** — full AdSense-ready privacy policy
3. **Terms of Service** — full terms with copyright compliance notice

## User preferences

- Dark premium blue theme with glassmorphism
- No emojis in main UI content
- Mobile-first responsive design
- AdSense-ready content (original, informative, no duplicate content)

## Gotchas

- CSS variables in index.css must be real HSL values — template ships with `red` placeholders
- Google Fonts @import must be the VERY FIRST LINE of index.css
- The `html` element has `class="dark"` set in index.html for dark mode

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
