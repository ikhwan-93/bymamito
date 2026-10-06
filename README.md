# Bymamito 🍰

A classy single-app website for **Bymamito**, a homemade bakery in Wakaf Siku,
Kota Bharu. Customers browse the menu and order entirely through WhatsApp; the
owner manages all content through a password-protected admin.

- **Public:** home, categorized menu with filter, cart → single WhatsApp order,
  about, notes/news
- **Admin (`/admin`):** CRUD for categories, products (with image upload),
  posts, and site settings (WhatsApp number, hero image, about text, …)

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Prisma ·
Vercel Postgres (prod) / SQLite-style dev fallback · Vercel Blob (uploads)

## Quick start

```bash
npm install
copy .env.example .env      # then fill in values
npm run db:push             # create tables (needs DATABASE_URL)
npm run db:seed             # seed the real menu
npm run dev
```

Log in at `/admin` with `ADMIN_PASSWORD` from `.env`.

## Documentation

| File | What it is |
|---|---|
| [`setup.md`](setup.md) | Dev environment, install/run/build commands |
| [`DEPLOY.md`](DEPLOY.md) | Hosting on Vercel (Postgres + Blob), step by step |
| [`PRD.md`](PRD.md) | Purpose, users, goals, success criteria |
| [`Architecture.md`](Architecture.md) | Components, data flow, project structure |
| [`design.md`](design.md) | Visual identity — colors, fonts, motifs |
| [`Phases.md`](Phases.md) | Roadmap + implementation checklist |
| [`memory.md`](memory.md) | Persistent decisions & gotchas (read before changes) |
| [`agents.md`](agents.md) | Conventions for AI agents working on this repo |
| [`skills.md`](skills.md) | Which skills to invoke for which task |

Spec & implementation plan live under `docs/superpowers/`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` / `npm run start` | Production build / serve |
| `npm run lint` | ESLint |
| `npm run db:push` | Apply the Prisma schema to the database |
| `npm run db:seed` | Seed categories, products, settings, ordering post |
