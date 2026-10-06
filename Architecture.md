# Bymamito — Architecture

## Overview

Single Next.js 16 App Router app (TypeScript), Prisma + SQLite for persistence, Tailwind v4 for styling. Public pages read data server-side; the cart is client-side (localStorage) and checkout opens `wa.me`. Admin is a password-protected area using server actions for CRUD.

## Components

- **Public site** (`src/app/`): Home, `/menu`, `/about`, `/posts`, plus a client cart (drawer) and WhatsApp checkout.
- **Admin** (`src/app/admin/(dashboard)/`): guarded by a `layout.tsx` that redirects unauthenticated users; `/admin/login` is unguarded. Sections: Dashboard, Products, Categories, Posts, Settings.
- **Shared helpers** (`src/lib/`): `prisma.ts` (client singleton), `settings.ts` (setting getters), `format.ts` (`formatRM`), `wa.ts` (`whatsappLink`), `auth.ts` (JWT session).

## Data model (Prisma / SQLite)

- `Category` — `id, name, slug (unique), sortOrder`; has many `Product`.
- `Product` — `id, name, description, priceCents (int), imageUrl, available, sortOrder, categoryId` (FK → Category, `onDelete: Cascade`).
- `Post` — `id, title, body, imageUrl, published, publishedAt`.
- `Setting` — `key (unique), value`; keys include `whatsapp_number`, `business_hours`, `about_text`, `instagram_url`.

## Data flow

- Reads: server components call the `prisma` singleton or `getSettings()` directly.
- Cart: client `CartProvider` context, persisted to `localStorage` under `bymamito-cart`, hydrated safely after mount (SSR guard + `hydrated` flag).
- Checkout: builds `https://wa.me/<whatsapp_number>?text=<message>` via `whatsappLink`; the number is read in the root layout and passed down as a prop (client never touches Prisma).
- Admin mutations: server actions (`"use server"`) validate with `zod`, mutate via Prisma, then `revalidatePath(...)`.

## Auth

- Single-owner password from `ADMIN_PASSWORD` env, compared timing-safely.
- On success, a JWT (signed with `SESSION_SECRET` via `jose`, 24h) is stored in an httpOnly cookie `admin_session` (`secure` in prod, `sameSite: lax`).
- `getSession()` verifies the JWT on every guarded route.

## Error handling

- Server actions return `{ error?: string }` and surface it inline.
- Unique-slug conflicts (P2002) handled as user-facing errors.
- Empty states on menu/home/posts and admin lists.
- Image fallback for products with no photo.

## Project structure

```
src/
  app/
    page.tsx  about/page.tsx  menu/page.tsx  posts/page.tsx
    admin/
      actions.ts            # login/logout
      login/page.tsx
      (dashboard)/
        layout.tsx          # auth guard + sidebar
        page.tsx            # dashboard stats
        categories/{actions.ts,page.tsx,...}
        products/{actions.ts,page.tsx,ProductForm.tsx}
        posts/{actions.ts,page.tsx,...}
        settings/{actions.ts,page.tsx,...}
  components/   # SiteHeader, SiteFooter, ProductCard, CartProvider, CartDrawer, ...
  lib/          # prisma, settings, format, wa, auth
prisma/
  schema.prisma  seed.ts  migrations/
public/uploads/  # uploaded product images
```
