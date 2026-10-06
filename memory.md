# Bymamito — Project Memory

Persistent decisions and gotchas for future sessions. Read this before touching anything.

## What this is

A single Next.js App Router app for **Bymamito**, a homemade bakery:
- **Public site** — menu (categorized products with prices in RM), cart that orders via WhatsApp, home/about/posts pages.
- **Admin site** — `/admin`, password-protected, full CRUD for categories, products, posts, and settings.

## Key decisions (do not casually reverse)

- **Stack:** Next.js 16.3.8 (App Router) + TypeScript + Prisma 6.19.3 + SQLite + Tailwind **v4**. No separate backend; no hosted DB.
- **Tailwind v4** — no `tailwind.config.ts`. Theme tokens are defined via `@theme` in `src/app/globals.css`. Do not create a `tailwind.config.ts`.
- **Prisma pinned to 6.19.3** deliberately. Registry `latest` resolves to an RC (7/8) that drops `prisma-client-js` and moves the datasource URL to `prisma7.config.ts`. Do NOT upgrade Prisma without migrating the schema generator + config.
- **Prices stored as integer cents** (`priceCents`). Display via `formatRM(cents)` → `"RM 45.00"`. Admin inputs RM and converts with `Math.round(parseFloat(price) * 100)`.
- **WhatsApp number** is a `Setting` key `whatsapp_number`, stored digits-only, consumed by the root layout and passed down to the client cart drawer (never fetched client-side). Default `194712426295357`.
- **Admin auth:** single-owner password from `ADMIN_PASSWORD` env, JWT (`jose`) in httpOnly cookie `admin_session`, 24h expiry. No user table.
- **Admin routes** live under a `(dashboard)` route group whose `layout.tsx` guards auth. `/admin/login` is NOT guarded. Add new admin pages under `src/app/admin/(dashboard)/`, not `/admin` directly.

## Gotchas / environment notes

- **Windows + PowerShell** dev environment. Line endings show LF→CRLF warnings on commit — harmless.
- **npm 12 script gating:** the user's global npm config has `allow-scripts` set; `package.json` carries an `allowScripts` field to permit postinstall scripts (esbuild, workerd, prisma, etc.). Don't remove it, or fresh `npm install` will break.
- **`cookies()` is async in Next.js 16** — always `await cookies()`.
- **Git identity** was set repo-locally as `Bymamito Dev <dev@bymamito.local>`.
- The `AGENTS.md` in this repo is auto-generated Next.js agent rules (points at `node_modules/next/dist/docs/`) — this Next.js version has breaking changes vs. older training data; check those docs when unsure.
- `CLAUDE.md` just re-exports `@AGENTS.md`.

## Seed data

`npx prisma db seed` (script: `tsx prisma/seed.ts`) creates 3 categories (Cakes/Cookies/Pastries), 1 product ("Chocolate Fudge Cake", RM 45.00), 1 published post, and 4 settings. Re-runnable via upserts.

## Known deferred polish (non-blocking)

- Cart drawer is focusable while closed (no `inert`/focus-trap/escape key).
- `deleteProduct`/`deleteCategory`/`deletePost` don't guard against missing ids (P2025 unhandled).
- Upload disk I/O and `deleteCategory` aren't wrapped in try/catch.
- Home hero uses a monogram placeholder (no product photos seeded).
- `SESSION_SECRET` isn't validated for presence/length at startup.
