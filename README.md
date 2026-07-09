# Water Werkz LI

Marketing website for **Water Werkz LI** — a premium auto detailing and vehicle protection shop in Lynbrook, NY. Built with [Remix](https://remix.run/) and [Sanity CMS](https://www.sanity.io/), based on the [Remix + Sanity Clean template](https://www.sanity.io/templates/remix-sanity-clean).

- **Live frontend:** deploy the `remix-app` workspace (e.g. Vercel)
- **Content editing:** Sanity Studio (`studio` workspace)
- **Sanity project:** `tvycoatb` / dataset `production`

---

## Table of contents

1. [Architecture overview](#architecture-overview)
2. [Tech stack](#tech-stack)
3. [Project structure](#project-structure)
4. [How content flows to the site](#how-content-flows-to-the-site)
5. [Sanity content model](#sanity-content-model)
6. [Frontend pages and routes](#frontend-pages-and-routes)
7. [Track map images](#track-map-images)
8. [Environment variables](#environment-variables)
9. [Local development](#local-development)
10. [Deployment](#deployment)
11. [Editing content in Studio](#editing-content-in-studio)
12. [Common maintenance tasks](#common-maintenance-tasks)
13. [Troubleshooting](#troubleshooting)

---

## Architecture overview

This repo is an **npm workspaces monorepo** with two apps that share one Sanity project:

```
┌─────────────────────┐         GROQ queries          ┌──────────────────────┐
│   remix-app         │ ◄────────────────────────── │   Sanity Content     │
│   (public website)  │                             │   Lake (hosted)      │
│   localhost:3000    │                             │                      │
└─────────────────────┘                             └──────────▲───────────┘
                                                                 │
                                                      read/write │
                                                                 │
                                                    ┌────────────┴───────────┐
                                                    │   studio               │
                                                    │   (Sanity Studio CMS)    │
                                                    │   localhost:3333       │
                                                    └────────────────────────┘
```

- **Remix** renders pages server-side, fetches content from Sanity with GROQ, and hydrates on the client.
- **Sanity Studio** is where editors manage site copy, services, and detailing packages.
- **Static assets** (logos, track map PNGs) live in `remix-app/public/` and are served directly by Remix/Vercel — they are not stored in Sanity.

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend framework | Remix 2.x (React 18) |
| CMS | Sanity Studio 3.x |
| Query language | GROQ |
| Live preview | `@sanity/react-loader`, `@sanity/visual-editing`, Stega encoding |
| Styling | Plain CSS (`remix-app/app/styles/index.css`) |
| Monorepo | npm workspaces |
| Deployment | Vercel (frontend), `sanity deploy` (Studio) |

---

## Project structure

```
Sanjays_website/
├── remix-app/                  # Public website (Remix)
│   ├── app/
│   │   ├── components/         # UI components (Hero, Footer, TrackMap, etc.)
│   │   ├── data/
│   │   │   └── tracks.ts       # Track map filename → URL mapping
│   │   ├── routes/
│   │   │   ├── _index.tsx      # Homepage
│   │   │   ├── detailing.tsx   # Detailing packages page
│   │   │   └── post.$slug.tsx  # Blog post pages (template legacy)
│   │   ├── sanity/
│   │   │   ├── client.ts       # Sanity client (with Stega for visual editing)
│   │   │   ├── queries.ts      # GROQ queries
│   │   │   ├── loader.server.ts
│   │   │   └── types.ts
│   │   ├── styles/
│   │   │   └── index.css       # Global styles + Water Werkz theme
│   │   └── root.tsx            # App shell (header, outlet)
│   └── public/
│       └── images/
│           ├── logo-dark.png
│           ├── logo-light.png
│           └── track_maps/       # Served track circuit PNGs
│
├── studio/                     # Sanity Studio CMS
│   ├── schemas/                # Content type definitions
│   │   ├── siteSettings.ts
│   │   ├── detailingPage.ts
│   │   ├── detailingPackage.ts
│   │   ├── service.ts
│   │   └── post.ts
│   ├── structure.ts            # Studio sidebar navigation
│   └── sanity.config.ts        # Studio + Presentation tool config
│
├── track_maps/                 # Source folder for circuit map PNGs
│   ├── silver_stone.png
│   ├── laguna_seca.png
│   ├── Monza.png
│   ├── le_mans.png
│   └── circuit_de_spa.png
│
└── package.json                # Root scripts (`npm run dev` runs both apps)
```

---

## How content flows to the site

1. **Editor publishes** content in Sanity Studio (e.g. a detailing package or site settings change).
2. **Remix loader** runs on the server and calls `loadQuery()` with a GROQ query from `remix-app/app/sanity/queries.ts`.
3. **Sanity returns** JSON from the Content Lake (CDN-backed in production).
4. **Remix renders** HTML with that data and sends it to the browser.
5. **Client hydration** uses `useQuery()` from `@sanity/react-loader` so live preview and Stega overlays work when Studio Presentation mode is open.

For **visual editing** (optional, enabled when `SANITY_STUDIO_STEGA_ENABLED=true`):

- Sanity embeds invisible metadata in string fields (Stega encoding).
- The Presentation tool in Studio opens `http://localhost:3000` in a preview iframe.
- Click-to-edit overlays connect page content back to the corresponding Studio document.

String fields that drive logic (like `trackKey`) are cleaned with `stegaClean()` before use — see `remix-app/app/data/tracks.ts`.

---

## Sanity content model

### Site Settings (`siteSettings`) — singleton

One document controls global site info. ID is fixed: `siteSettings`.

| Field | Purpose |
|-------|---------|
| `businessName` | Brand name |
| `heroHeadline` | Homepage hero text |
| `heroImage` | Optional hero background |
| `missionTitle` / `missionStatement` | About section |
| `contactIntro` | Footer/CTA intro copy |
| `phone`, `email`, `address` | Contact details |
| `instagramUrl` | Social link |
| `hours` | Business hours (array of day/open/close/closed) |

### Services (`service`)

Homepage service cards (e.g. Detailing Packages, Window Tint).

| Field | Purpose |
|-------|---------|
| `title`, `slug`, `description`, `image` | Card content |
| `order` | Display sort order |

The **Detailing Packages** service links to `/detailing` when its slug is `detailing-packages`.

### Detailing Page (`detailingPage`) — singleton

| Field | Purpose |
|-------|---------|
| `title` | Page heading (e.g. "Auto Detailing Package Options") |
| `intro` | Subtitle/intro paragraph |

### Detailing Packages (`detailingPackage`)

Race-track-themed service tiers on `/detailing`.

| Field | Purpose |
|-------|---------|
| `title` | Package name (Silverstone, Monza, Le Mans, etc.) |
| `slug` | URL hash anchor (`#monza`, `#le-mans`, …) |
| `trackKey` | Which circuit map image to show |
| `priceLabel` | e.g. "Starting at $100" |
| `exteriorServices` / `interiorServices` | Bullet lists |
| `order` | Display sort order |

**Track key options:** `silverstone`, `laguna-seca`, `monza`, `le-mans`, `spa`, `brand`

### Blog Posts (`post`) — template legacy

Optional blog posts at `/post/:slug`. Included from the original template; not used on the main marketing pages today.

---

## Frontend pages and routes

| Route | File | Description |
|-------|------|-------------|
| `/` | `routes/_index.tsx` | Homepage: hero, services grid, mission, contact CTA, footer |
| `/detailing` | `routes/detailing.tsx` | Detailing packages with circuit map visuals |
| `/post/:slug` | `routes/post.$slug.tsx` | Individual blog post (if used) |

### Key components

| Component | Role |
|-----------|------|
| `Header` | Fixed nav with logo + mobile menu |
| `Hero` | Full-width hero with headline and CTAs |
| `Services` | Service card grid from Sanity |
| `Mission` | Mission statement section |
| `ContactCTA` | Call-to-action block |
| `Footer` | Contact info, hours, quick links |
| `DetailingPackageCard` | Single package on `/detailing` |
| `TrackMap` | Static circuit map image for a package |
| `BrandVisual` | Logo display for brand-tier packages |

### Branding

- **Colors:** blue `#007BFF`, yellow `#F1C40F`, cyan `#00E5FF`, dark background `#0A0A0A`
- **Logos:** `remix-app/public/images/logo-dark.png` (dark backgrounds), `logo-light.png` (light backgrounds)

---

## Track map images

Circuit maps are **static PNG files**, not Sanity assets. They live in two places:

1. **`track_maps/`** (repo root) — source files you edit/replace
2. **`remix-app/public/images/track_maps/`** — files actually served by the website

### Filename → package mapping

Defined in `remix-app/app/data/tracks.ts`:

| Package slug | File |
|--------------|------|
| `silverstone` | `silver_stone.png` |
| `laguna-seca` | `laguna_seca.png` |
| `monza` | `Monza.png` |
| `le-mans` | `le_mans.png` |
| `circuit-de-spa-francorchamps` | `circuit_de_spa.png` |

Images are resolved by **package slug first**, then by `trackKey` as a fallback.

### Updating a track map

1. Replace or add the PNG in `track_maps/`.
2. Copy to the public folder:

   ```powershell
   Copy-Item track_maps\* remix-app\public\images\track_maps\ -Force
   ```

3. Bump `TRACK_MAPS_VERSION` in `remix-app/app/data/tracks.ts` to bust browser/CDN cache.
4. Hard refresh the browser (Ctrl+Shift+R).

---

## Environment variables

### Remix app (`remix-app/.env`)

Create from `remix-app/.env.example`:

```env
SANITY_STUDIO_PROJECT_ID="tvycoatb"
SANITY_STUDIO_DATASET="production"
SANITY_STUDIO_URL="http://localhost:3333"
SANITY_STUDIO_STEGA_ENABLED="true"
```

| Variable | Description |
|----------|-------------|
| `SANITY_STUDIO_PROJECT_ID` | Sanity project ID |
| `SANITY_STUDIO_DATASET` | Dataset name (usually `production`) |
| `SANITY_STUDIO_URL` | Studio URL for visual editing (local or deployed) |
| `SANITY_STUDIO_STEGA_ENABLED` | `"true"` for live preview overlays; `"false"` for simpler production |

### Studio (`studio/.env`)

Create from `studio/.env.example`:

```env
SANITY_STUDIO_PROJECT_ID="tvycoatb"
SANITY_STUDIO_DATASET="production"
SANITY_STUDIO_PREVIEW_URL="http://localhost:3000"
SANITY_STUDIO_STUDIO_HOST=""
```

| Variable | Description |
|----------|-------------|
| `SANITY_STUDIO_PREVIEW_URL` | Remix app URL for Presentation tool preview |
| `SANITY_STUDIO_STUDIO_HOST` | Hostname after `sanity deploy` (optional until deployed) |

> `.env` files are gitignored. Never commit secrets or API tokens.

---

## Local development

### Prerequisites

- Node.js 18+
- npm
- A Sanity account with access to project `tvycoatb`

### Install

```bash
npm install
```

### Configure environment

Copy and fill in both env files:

```bash
cp remix-app/.env.example remix-app/.env
cp studio/.env.example studio/.env
```

### Run both apps

From the repo root:

```bash
npm run dev
```

| App | URL |
|-----|-----|
| Website | http://localhost:3000 |
| Sanity Studio | http://localhost:3333 |

Sign in to Studio with the same account used for the Sanity project.

### Run individually

```bash
npm run dev --workspace=remix-app
npm run dev --workspace=studio
```

### Production build (Remix)

```bash
npm run build --workspace=remix-app
npm run start --workspace=remix-app
```

---

## Deployment

### Remix frontend → Vercel

1. Push the repo to GitHub.
2. Create a Vercel project connected to the repo.
3. Set **Root Directory** to `remix-app`.
4. Add environment variables (same as `remix-app/.env`):
   - `SANITY_STUDIO_PROJECT_ID`
   - `SANITY_STUDIO_DATASET`
   - `SANITY_STUDIO_URL` → your deployed Studio URL
   - `SANITY_STUDIO_STEGA_ENABLED` → `false` recommended for production unless using Presentation
5. Deploy.

If the monorepo install fails, try enabling **Include source files outside of the Root Directory** in Vercel project settings, or set Install Command to `cd .. && npm install`.

### Sanity Studio → Sanity hosting

```bash
cd studio
npx sanity deploy
```

Choose a hostname (e.g. `water-werkz-li`). Update `SANITY_STUDIO_URL` in the Remix Vercel env vars to the deployed Studio URL.

### Invite editors

In [Sanity Manage](https://www.sanity.io/manage) → project → **Invite project members**.

---

## Editing content in Studio

Open http://localhost:3333 (or your deployed Studio URL). The sidebar is organized as:

1. **Site Settings** — global copy, contact info, hours
2. **Detailing Page** — page title and intro for `/detailing`
3. **Detailing Packages** — individual race-track packages
4. **Services** — homepage service cards
5. **Blog Posts** — optional blog content

**Always click Publish** after editing — drafts are not visible on the public site unless preview mode is active.

### Presentation (live preview)

1. Open the **Presentation** tab in Studio.
2. Studio loads the Remix site in an iframe.
3. Navigate to the page you are editing; overlays highlight editable fields.

Requires `SANITY_STUDIO_STEGA_ENABLED=true` on the Remix app and matching `SANITY_STUDIO_PREVIEW_URL` in Studio.

---

## Common maintenance tasks

### Add a new detailing package

1. In Studio → **Detailing Packages** → Create.
2. Set title, slug, track key, price, and service lists.
3. Publish.
4. If using a new circuit map, add the PNG to `track_maps/`, copy to `public/images/track_maps/`, and add a slug entry in `tracks.ts`.

### Change homepage copy or contact info

Studio → **Site Settings** → edit → Publish.

### Add or reorder homepage services

Studio → **Services** → edit documents and `order` field → Publish.

### Update logos

Replace files in `remix-app/public/images/` (`logo-dark.png`, `logo-light.png`).

### Format code

```bash
npm run format
```

---

## Troubleshooting

### All detailing packages show the same track image

- Confirm each package has the correct **slug** and **track key** in Studio.
- Ensure PNGs in `track_maps/` are the correct circuits (not duplicates).
- Run the copy command to sync `track_maps/` → `public/images/track_maps/`.
- Bump `TRACK_MAPS_VERSION` in `tracks.ts` and hard refresh.

### Content changes not appearing on the site

- Verify the document was **Published** (not just saved as a draft).
- Check `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` match your Sanity project.
- Hard refresh or clear cache on Vercel preview/production.

### Studio Presentation preview not connecting

- Remix must be running at the URL set in `SANITY_STUDIO_PREVIEW_URL`.
- Set `SANITY_STUDIO_STEGA_ENABLED=true` in `remix-app/.env`.
- Sign in to Studio with a project member account.

### Vercel build fails in monorepo

- Set root directory to `remix-app`.
- Enable including files outside root directory, or install from repo root.

---

## Resources

- [Sanity documentation](https://www.sanity.io/docs)
- [Remix documentation](https://remix.run/docs)
- [GROQ query reference](https://www.sanity.io/docs/groq)
- [Sanity Presentation tool](https://www.sanity.io/docs/presentation)
- [Original template](https://www.sanity.io/templates/remix-sanity-clean)
