# Bymamito — Visual Identity

Warm patisserie aesthetic — a bakery box, not a farmhouse blog.

## Palette (Tailwind v4 tokens, defined in `src/app/globals.css`)

| Token | Hex | Use |
|---|---|---|
| `paper` | `#FBF7F2` | Base background (warm off-white) |
| `cocoa` | `#2E2016` | Primary text / structure |
| `caramel` | `#C4874B` | Primary accent (buttons, links, active nav) |
| `rose` | `#E7C4B4` | Secondary surfaces, product-card tint |
| `butter` | `#F6E7C8` | Highlight, hover, price-tag background |
| `cream-line` | `#E9DDCC` | Hairline borders / dividers |

Access via Tailwind utility classes (`bg-paper`, `text-cocoa`, `border-cream-line`, etc.).

## Typography

- **Display — Fraunces** (old-style serif, warm "wonky" quirks): headings, logo, prices. Exposed as `--font-display` and the `.font-display` class.
- **Body — Inter** (clean sans): paragraphs, nav, buttons. Exposed as `--font-body`.
- **Eyebrow / label** — uppercase, letterspaced (`tracking-[0.15em]`) Inter, in `caramel`. Used for "FRESHLY BAKED", "Staff only", admin labels.

## Layout rules

- Single-column generous measure; 6-col grid feel on desktop.
- Sections separated by hairline `cream-line` rules, not heavy cards.
- Product images soft-rounded (`rounded-2xl`, ~16px); everything else squared and structured.
- Product grid: 1 col mobile → 2-3 cols desktop.

## Signature element — the price tag

Prices render as a small hand-stamped "label" chip: short rounded rectangle, 1px dashed border, uppercase letterspaced, `caramel` on `butter`. Defined as the reusable `.price-tag` class. Recurring motif across menu cards, cart rows, and admin lists (like a price sticker on a bakery box).

## Motion

Restrained. One subtle fade-up on page sections (respecting `prefers-reduced-motion`), hover lift on product cards. No confetti or over-animation.

## Copy voice

Warm, specific, plain verbs. Sentence case. Name things by what users recognize (not "webhook config"). Avoid generic filler. Example tone: "Homemade bakes with the good butter."
