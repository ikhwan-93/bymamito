# Bymamito — Product Requirements Document (PRD)

## Purpose

A classy website for **Bymamito**, a homemade bakery, where customers browse the full menu with prices and order entirely through WhatsApp, plus an admin site for the owner to manage content.

## Users

- **Customers** — browse the menu, see prices, add items to a cart, and send the combined order via WhatsApp.
- **Owner (admin)** — logs in to manage categories, products, posts, and site settings via CRUD.

## Goals

- Public storefront with a categorized menu (product photo, name, description, RM price).
- Cart that composes a single WhatsApp message listing line items and a total.
- Password-protected admin with CRUD for categories, products (incl. image upload), posts, and settings.
- A distinctive, warm bakery visual identity (not templated).

## Non-goals

- No online payment / checkout — orders complete on WhatsApp.
- No multi-user auth, roles, or signup.
- No inventory tracking, order management, or status updates in the system.
- No hosted image CDN — local uploads to `public/uploads/`.

## Success criteria

- `/menu` renders categories and available products from the database with prices.
- Adding/removing items and opening WhatsApp with a pre-filled message works.
- Admin can log in and create/read/update/delete all content types.
- Product photo upload works and images render on the public site.
- `next build` succeeds and the app runs locally.

## Reference / source content

- Instagram: https://www.instagram.com/bymamito/
- WhatsApp business line: `194712426295357`
