# Verto Landscaping

A small, design-led marketing site for a landscape design & build studio.
Next.js 15 (App Router) · TypeScript · Tailwind · Framer Motion · SQLite.

## Running it

```bash
npm install
cp .env.local.example .env.local        # then edit ADMIN_USER / ADMIN_PASS
npm run dev                              # http://localhost:3000
```

Production:

```bash
npm run build && npm start
```

## Routes

| Path | What it is |
|---|---|
| `/` | Home — hero, intro, featured before/after, services teaser, selected work, testimonial |
| `/services` | Four services with full-width imagery |
| `/process` | Four-step studio process |
| `/portfolio` | Project cards interleaved with 3 before/after sliders |
| `/about` | Studio narrative + values |
| `/contact` | Quote form |
| `/api/quote` | `POST` — accepts JSON, validates, writes to SQLite |
| `/admin` | Lead viewer (Basic Auth — `ADMIN_USER` / `ADMIN_PASS`) |

## Quote form

Fields: `name`, `email`, `phone`, `projectType`, `message`, plus a honeypot.

- Client + server share the Zod schema in `lib/validation.ts`
- Submissions are stored in `data/verto.db` (gitignored)
- Honeypot returns 200 silently when triggered — no row written
- In-memory rate limit: 5 submissions per IP per 10 minutes

## Admin

`/admin` is protected by HTTP Basic Auth via `middleware.ts`. Set strong
values for `ADMIN_USER` and `ADMIN_PASS` in `.env.local` before deploying.

## Deploy

SQLite needs a host with a persistent filesystem. Recommended:

- **Railway / Render / Fly.io** with a mounted volume → keep `better-sqlite3`
- **Vercel** → swap `better-sqlite3` for **Turso** (libSQL, drop-in). The data
  layer is isolated in `lib/db.ts`, so it's a one-file change.

## Content

All page copy lives in `lib/content.ts`. Imagery (Unsplash) is in `lib/unsplash.ts`.
Every photo ID was verified live before shipping; if any 404 in future, swap
with another ID from unsplash.com — the URL pattern is `images.unsplash.com/<id>?...`.
