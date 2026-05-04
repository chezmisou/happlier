# bestspot

Your geolocated wishlist. Paste a TikTok, Instagram or Google Maps link and the
place lands on a map with its address, Google rating and a short review excerpt.

Lives at `/bestspot` — served by its own Vercel project (Root Directory =
`bestspot/`) and exposed under the main happlier domain via a path-preserving
rewrite in the root `next.config.js`.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui primitives
- Prisma ORM (SQLite for local, Postgres-compatible schema for Vercel)
- Google Maps JS API via `@vis.gl/react-google-maps`
- `@googlemaps/markerclusterer`
- Anthropic Claude (`claude-sonnet-4-5`) for structured extraction
- Google Places API (New) for canonical place data

## Architecture

```
bestspot/
├── prisma/
│   └── schema.prisma            # Place model with userId default-user
├── src/
│   ├── app/
│   │   ├── bestspot/page.tsx    # Main app (map + sidebar + add form)
│   │   ├── api/
│   │   │   ├── places/route.ts          # GET list, POST extract+create
│   │   │   ├── places/[id]/route.ts     # PATCH, DELETE
│   │   │   ├── places/manual/route.ts   # POST manual create
│   │   │   └── photo/route.ts           # Server-side photo proxy
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/              # UI components (map, sidebar, forms…)
│   └── lib/
│       ├── prisma.ts            # Prisma client singleton
│       ├── anthropic.ts         # Claude extractor (structured JSON)
│       ├── google-places.ts     # Places API (New) wrapper
│       ├── extractors/          # google-maps, tiktok, instagram pipelines
│       ├── validators.ts        # Zod schemas
│       └── types.ts
└── .env.example
```

All paid calls (Anthropic, Google Places) happen server-side only. The browser
only sees the public Maps JS key (which you should restrict to your domain in
Google Cloud).

## Setup

### 1. Install dependencies

```bash
cd bestspot
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

You need three providers:

#### Anthropic API key
Sign up at <https://console.anthropic.com/>, create a key and paste it as
`ANTHROPIC_API_KEY`.

#### Google Cloud (Maps + Places)
1. Open <https://console.cloud.google.com/> and create (or pick) a project.
2. Enable these APIs:
   - **Maps JavaScript API** (client)
   - **Places API (New)** (server) — note: NOT the legacy Places API.
3. Create **two** API keys under *APIs & Services → Credentials*:
   - **Browser key**: restrict by HTTP referrer (your domain + `localhost:3000/*`).
     This becomes `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.
   - **Server key**: restrict by IP address (or no restriction for local dev).
     This becomes `GOOGLE_PLACES_API_KEY`.
4. (Optional) Create a Map ID at *Google Maps Platform → Map Management*.
   Set `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID` to it for vector maps + AdvancedMarker
   styling.

#### Database (local)
SQLite by default, no setup needed:
```
DATABASE_URL="file:./dev.db"
```

### 3. Initialize the database

```bash
npx prisma migrate dev --name init
```

This creates `prisma/dev.db` and applies the migration.

### 4. Run the dev server

```bash
npm run dev
```

Open <http://localhost:3000/bestspot>. The root `/` redirects there
automatically.

## Test plan

After setup, paste these three links in turn to verify each pipeline:

1. **Google Maps short link** — share any place from the Maps app, e.g.
   `https://maps.app.goo.gl/...`. Expected: full place details (name,
   address, rating, photo) appear without calling Claude.
2. **TikTok food video** — any public TikTok video of a restaurant, e.g.
   `https://www.tiktok.com/@user/video/123…`. Expected: Claude extracts
   `{ placeName, city, … }`, Google Places resolves it, marker appears.
3. **Instagram reel** — `https://www.instagram.com/reel/...`. Expected:
   either a clean extraction (rare, since Instagram blocks most fetches) or
   a graceful fallback to the manual form pre-filled with whatever could be
   read from `og:description`.

Failure modes you should also try:
- An invalid URL → `400`.
- A non-supported domain → manual form opens with `sourceUrl` pre-filled.
- A second add of the same Google Maps link → server returns `duplicate: true`
  and the existing place is not duplicated.

## Deploying to Vercel

bestspot is meant to live behind the main happlier domain. There are two
projects on Vercel:

**1. The bestspot project** (this folder)

1. Import the `chezmisou/happlier` repo as a **new** Vercel project.
2. In *Project Settings → General*, set **Root Directory** to `bestspot`.
3. Switch the database. In `prisma/schema.prisma` change:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
   Provision **Vercel Postgres** (or Neon / Supabase) and set
   `DATABASE_URL` in the project's env vars.
4. Add the rest of the env vars from `.env.example`.
5. Deploy. Vercel will run `prisma generate` (via `postinstall`) and `next build`.
6. Verify it works at `https://<bestspot-project>.vercel.app/bestspot`. The
   `basePath: '/bestspot'` in `next.config.mjs` means everything (pages, API
   routes, `_next/*` assets) is served under that prefix — that is what makes
   the rewrite below transparent.

**2. The root happlier project** (already exists)

1. Set the env var `BESTSPOT_URL` in *Settings → Environment Variables* to the
   bestspot deployment URL (without trailing slash), e.g.
   `https://bestspot-xxxxx.vercel.app`.
2. Redeploy. The root `next.config.js` already contains rewrites that forward
   `/bestspot` and `/bestspot/:path*` to that target, so the app becomes
   reachable at `https://<happlier-domain>/bestspot`.

Because the rewrite is path-preserving and bestspot uses `basePath`, no other
configuration is needed — Maps JS, the photo proxy, and all `/_next/*` chunks
load through the same prefix.

The included `build` script runs `prisma generate` before `next build`, so the
client is always in sync.

## API

All routes live under `/api/places`. Request bodies are validated with Zod.

| Method | Path                  | Body                                      | Returns |
| ------ | --------------------- | ----------------------------------------- | ------- |
| `POST` | `/api/places`         | `{ url: string }`                         | `{ place }` on `201`, or `{ error, partial }` on `422` so the UI can pre-fill the manual form |
| `GET`  | `/api/places`         | query: `?type=&source=&search=&sort=&order=` | `{ places: Place[] }` |
| `POST` | `/api/places/manual`  | full place fields (see `manualPlaceSchema`) | `{ place }` |
| `PATCH`| `/api/places/:id`     | partial place fields                      | `{ place }` |
| `DELETE`| `/api/places/:id`    | —                                         | `{ ok: true }` |

## Multi-user later

Every row already has a `userId` column (default `"default-user"`). To add
NextAuth:

1. Add the Auth.js Prisma adapter and the standard `User`, `Account`, `Session`
   models to `schema.prisma`.
2. Replace the `DEFAULT_USER_ID` constant in the API routes with the session
   user id.
3. Add a unique constraint `@@unique([userId, googlePlaceId])` if you want
   per-user duplicate detection.

## Notes

- **Instagram**: we only read the public `og:` meta tags. If Meta returns
  HTML without them (anti-scrape), the user gets the manual form. We do **not**
  attempt logged-in scraping.
- **Photo proxying**: Place photo URLs from Google require the API key. The
  `/api/photo` route streams the photo so the key never reaches the client.
- **Claude prompt**: see `src/lib/anthropic.ts`. The model is asked to return
  pure JSON; we prefill `{` to keep it on track and parse defensively.
