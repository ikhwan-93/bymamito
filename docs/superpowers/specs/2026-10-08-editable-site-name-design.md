# Editable Site Name (Header + Footer Wordmark) — Design

## Goal

Let the owner edit the brand wordmark "Bymamito" from the admin settings page.
A single shared value controls both the header (top-left) and footer brand
wordmark. The footer copyright line is out of scope.

## Approach

Reuse the existing settings pattern (Tasks 9–12): a `Setting` row keyed
`site_name`, a text field on the admin settings form, and pass-through props
to the two components that render the wordmark.

## Changes

1. **`src/app/admin/(dashboard)/settings/actions.ts`**
   - Add `"site_name"` to `SETTING_KEYS`.
   - Add `site_name: String(formData.get("site_name") ?? "").trim()` to `entries`.

2. **`src/app/admin/(dashboard)/settings/settings-form.tsx`**
   - Add `siteName: string` prop.
   - Add a `Field` labeled "Site name (header & footer)" text input named
     `site_name`, placed with the other brand fields.

3. **`src/app/admin/(dashboard)/settings/page.tsx`**
   - Pass `siteName={settings.site_name ?? ""}`.

4. **`src/components/SiteHeader.tsx`**
   - Add `siteName` prop (default `"Bymamito"`).
   - Render the name with the existing italic-first-letter markup:
     `<span className="italic">{siteName[0]}</span>{siteName.slice(1)}`.
   - The `font-logo` class and existing typography picker are unchanged.

5. **`src/app/layout.tsx`**
   - Pass `siteName={settings.site_name || "Bymamito"}` to `SiteHeader`.

6. **`src/components/SiteFooter.tsx`**
   - `const siteName = settings.site_name || "Bymamito";`
   - Use it in the footer wordmark with the same italic-first-letter markup.

## Styling

Preserved: first letter italic, `font-logo` class, `text-cocoa` (header) /
`text-paper` (footer). Only the letters are dynamic. Font selection continues
to be handled by the existing "Logo font" (`logo_font`) picker.

## Fallback

Empty `site_name` → `"Bymamito"` in header and footer.

## Out of scope

- Footer copyright line `© {year} Bymamito. Baked with patience.`
- Per-location independent names (single shared value by decision).
