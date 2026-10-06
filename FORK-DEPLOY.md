# Deploy this site to a new Vercel account

Follow these steps in order. Takes ~10 minutes. The repo is public, so you don't
need any access from the original owner.

## 1. Fork the code (so you own it)

1. Go to **https://github.com/ikhwan-93/bymamito**
2. Click **Fork** → choose your own GitHub account.

*(If you skip forking and import the original repo directly, redeploys depend on
that repo staying public — forking is safer.)*

## 2. Import into Vercel

1. Go to **https://vercel.com/new** and log in.
2. Import your fork (`<you>/bymamito`). Framework preset auto-detects as **Next.js**.
3. Don't deploy yet.

## 3. Add environment variables

On the configure screen, under **Environment Variables**, add:

| Key | Value |
|---|---|
| `ADMIN_PASSWORD` | pick your own admin password |
| `SESSION_SECRET` | a random string, at least 32 characters |

Generate a random secret quickly (PowerShell):
```powershell
-join ((48..57)+(97..122) | Get-Random -Count 40 | ForEach-Object { [char]$_ })
```

## 4. Create the database

1. In your Vercel project → **Storage → Create Database**.
2. Pick **Postgres** (Vercel Postgres / Neon) — or **Prisma Postgres** from the
   marketplace if you prefer. Free plan is fine.
3. When asked to connect, connect it to this project. This sets `DATABASE_URL`
   (and `PRISMA_DATABASE_URL` / `POSTGRES_URL`) automatically.

## 5. Create Blob storage (for image uploads)

1. **Storage → Create Database → Blob**.
2. Connect it to the same project. This sets `BLOB_STORE_ID` automatically.
   Uploads authenticate via OIDC — no extra token needed.

## 6. Deploy

Click **Deploy**. The build runs `prisma generate` + `next build` and should go
green in 1–2 minutes. (The site shows an error until the database is set up —
that's expected, continue.)

## 7. Create tables + seed the menu (one-time, from your machine)

Clone your fork, then:

```powershell
npm install
# copy DATABASE_URL from Vercel: Storage → your Postgres → ".env.local" tab
$env:DATABASE_URL="postgresql://...your-connection-string..."
npm run db:push     # creates the tables
npm run db:seed     # loads the real menu: 6 categories, 58 products, settings, ordering post
```

## 8. Log in

Go to `https://<your-project>.vercel.app/admin` and log in with your `ADMIN_PASSWORD`.

Then, in **Settings**, update the bakery's WhatsApp number, about text, and upload
a hero image — each Vercel deployment is fully independent (its own database and
storage), so this copy starts with the seeded defaults.

---

If `db:push` fails with an SSL error, append `?sslmode=require` to the connection string.
