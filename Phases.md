# Bymamito — Phases (roadmap + checklist)

## Phase 0 — Foundation
- [x] Scaffold Next.js 16 + TypeScript + Tailwind v4 + Prisma + SQLite
- [x] Prisma singleton + seed data (categories, sample product, post, settings)
- [x] Helpers: settings getters, `formatRM`, `whatsappLink`

## Phase 1 — Public storefront
- [x] Theme + layout (Fraunces/Inter, color tokens, `.price-tag`, header/footer)
- [x] `/menu` categorized products
- [x] Cart (context + drawer) + WhatsApp checkout
- [x] Home, About, Posts pages

## Phase 2 — Admin
- [x] Auth (login, JWT session, guarded layout)
- [x] Categories CRUD
- [x] Products CRUD + image upload
- [x] Posts CRUD
- [x] Settings

## Phase 3 — Documentation
- [x] memory.md, skills.md, design.md, agents.md, PRD.md, Architecture.md, Phases.md, setup.md

## Phase 4 — Hardening (backlog, non-blocking)
- [ ] Cart drawer a11y: `inert`/focus-trap/escape when closed
- [ ] Guard delete actions against missing ids (P2025)
- [ ] Wrap upload disk I/O in try/catch
- [ ] Validate `SESSION_SECRET` presence/length at startup
- [ ] URL-validate post `imageUrl`
- [ ] Replace home hero monogram with real product photo once imagery exists

## Phase 5 — Deploy (not yet started)
- [ ] Configure hosting (Vercel or similar) with `DATABASE_URL`, `ADMIN_PASSWORD`, `SESSION_SECRET`
- [ ] Replace seeded `ADMIN_PASSWORD`/`SESSION_SECRET` with strong production values
- [ ] Seed real menu content + product photos
