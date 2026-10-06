# Bymamito — Setup

## Prerequisites

- Node >= 20, npm.
- (Windows is the primary dev environment; PowerShell shell.)

## Install

```bash
npm install
```

> Note: `package.json` includes an `allowScripts` field required to satisfy npm 12's script gating (permits Prisma/esbuild/workerd postinstall scripts).

## Environment

Copy `.env.example` to `.env` and set real values:

```bash
DATABASE_URL="file:./dev.db"
ADMIN_PASSWORD="changeme"          # admin login password
SESSION_SECRET="change-me-to-a-long-random-string"   # JWT signing secret
```

## Database

```bash
npx prisma migrate dev      # apply migrations
npx prisma db seed          # seed categories, sample product, post, settings
```

## Run / build / test

```bash
npm run dev      # start dev server (http://localhost:3000)
npm run build    # production build
npm run start    # run production build
npm run lint     # ESLint
```

## Admin

- URL: `/admin`
- Log in with the `ADMIN_PASSWORD` value from `.env`.

## Verifying the core flows

1. `npm run dev`, open `/menu` — seeded "Chocolate Fudge Cake" (RM 45.00) should appear.
2. Add an item, open the cart — "Order via WhatsApp" should open `wa.me/194712426295357` with a pre-filled message.
3. Open `/admin`, log in, exercise Products/Categories/Posts/Settings CRUD.
