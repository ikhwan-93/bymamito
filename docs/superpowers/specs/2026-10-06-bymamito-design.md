# Bymamito — Bakery Website Design

Date: 2026-10-06

## Purpose

A classy website for **Bymamito**, a homemade bakery. Visitors browse the full menu
with prices and place orders entirely through WhatsApp. A separate admin site lets the
owner manage content (categories, products, posts, site settings) via full CRUD.

## Users

- **Customers** — browse the menu, see prices, add items to a cart, send their order via WhatsApp.
- **Owner (admin)** — logs in to manage categories, products, posts, and settings.

## Goals

- Public storefront with a categorized menu showing product photos, names, descriptions, prices (RM).
- Cart that composes a single WhatsApp message containing line items and total.
- Admin area with single-owner password login and CRUD for all content.
- Classy, warm bakery visual identity.

## Non-goals

- No online payment / checkout. All orders complete on WhatsApp.
- No multi-user auth, no roles, no signup.
- No real-time inventory or order tracking in the system.
- No hosted image CDN (local uploads only).

## Success criteria

- Public site loads the menu from the database and renders it correctly.
- Adding/removing items in the cart and opening WhatsApp with a pre-filled message works.
- Admin can log in and create/read/update/delete categories, products, posts, and settings.
- Product photo upload works and images render on the public site.
- `next build` succeeds and the app runs locally.

## Stack

- Next.js (App Router) + TypeScript
- SQLite via Prisma
- Tailwind CSS
- Local file uploads to `public/uploads`

## Architecture

### Components

- **Public site** (`/`): Home, Menu, About, Posts; cart drawer; WhatsApp ordering.
- **Admin** (`/admin`): login + dashboard for Categories, Products, Posts, Settings.

### Data flow

- Data read via server components / server actions backed by Prisma + SQLite.
- Cart state is client-side (localStorage).
- Checkout builds a `wa.me/<number>?text=<message>` URL with line items + total.

### Data model (Prisma)

- `Category`: id, name, slug (unique), sortOrder.
- `Product`: id, name, description, priceCents (RM, integer), imageUrl, categoryId, available, sortOrder.
- `Post`: id, title, body, imageUrl, published, publishedAt.
- `Setting`: key (unique), value (string) — WhatsApp number, business hours, about text, social links.

Prices stored as integer cents to avoid floating-point issues.

### Error handling

- Form/server-action validation with user-facing error messages.
- Graceful empty states (no products, no posts).
- Image fallback for missing product photos.

### Testing / verification

- `next build` must succeed.
- Manual smoke test: menu renders, cart → WhatsApp, admin login + CRUD.

## Visual identity

See `design.md`. Warm bakery palette (cream/ivory, deep espresso/chocolate, soft accent),
serif display + sans body, generous whitespace.
