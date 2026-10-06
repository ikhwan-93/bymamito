# Deploying to Vercel

The site runs on Vercel with **Prisma Postgres** (database) and **Vercel Blob** (image uploads).
Local dev keeps working exactly as before — uploads silently fall back to `public/uploads/`
when `BLOB_STORE_ID` is not set.

## One-time setup

### 1. Push the code to GitHub

```bash
git remote add origin https://github.com/<you>/bymamito.git
git push -u origin main
```

### 2. Create the Vercel project

1. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repo.
2. Framework preset is detected automatically (Next.js). Do not deploy yet — add env vars first.

### 3. Create the database (Vercel Postgres)

1. In your Vercel project: **Storage → Create Database → Postgres**.
2. When prompted "Connect to project", connect it — this adds `DATABASE_URL` and
   `POSTGRES_URL` etc. to the project automatically.

### 4. Create Blob storage (image uploads)

1. **Storage → Create Database → Blob**.
2. Connect it to the same project — this adds `BLOB_STORE_ID` (and `BLOB_WEBHOOK_PUBLIC_KEY`).
   Uploads authenticate automatically via Vercel's OIDC token (`VERCEL_OIDC_TOKEN`,
   injected at runtime) — no static token or extra env var is needed.

### 5. Add the remaining environment variables

In **Settings → Environment Variables**, add:

| Key | Value |
|---|---|
| `ADMIN_PASSWORD` | your admin login password |
| `SESSION_SECRET` | random string, 32+ characters |

### 6. Deploy

Click **Deploy**. The build runs `prisma generate` (via `postinstall`) then `next build`.
No database connection is needed at build time.

### 7. Create the tables + seed

After the first deploy, from your machine (one-time):

```bash
# copy the DATABASE_URL from Vercel (Storage → your Postgres → .env.local tab)
$env:DATABASE_URL="postgresql://...vercel-postgres-connection-string..."
npm run db:push     # creates the tables
npm run db:seed     # seeds categories, products, settings, the ordering post
```

The seed includes your real menu. Re-running it replaces all products/categories
(`deleteMany` first) and upserts settings/posts.

### 8. Log in

Go to `https://<your-project>.vercel.app/admin` and log in with `ADMIN_PASSWORD`.

## How it works on Vercel

- **Database:** Prisma talks to Vercel Postgres over `DATABASE_URL`. All routes are
  dynamic (`force-dynamic`), so data is always fresh and builds never touch the DB.
- **Images:** uploads go to Vercel Blob (served from `*.public.blob.vercel-storage.com`)
  and the stored URL is absolute — product/hero images work everywhere. The Blob client
  authenticates via `BLOB_STORE_ID` + Vercel's injected `VERCEL_OIDC_TOKEN`.
- **Bundled illustrations** (`/menu-illustrations/*.svg`) are static files deployed with the app.

## Notes

- SQLite (`prisma/dev.db`) is no longer used; keep it for reference or delete it.
- The old `prisma/migrations/` folder was removed — the schema is applied with
  `prisma db push` (fine for this project size; add `migrate dev` later if you
  want an audited migration history).
- Changing `SESSION_SECRET` in Vercel env vars logs out all admin sessions.
