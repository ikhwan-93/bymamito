# Bymamito — Agents

Roles and conventions for subagents working on this project.

## Dispatch rules

- Use the `brainstorming` skill before new features; `systematic-debugging` before fixes.
- Dispatch **fresh** subagents per task with only the task's requirements — never paste accumulated session history into a dispatch.
- Follow the project's `AGENTS.md`: this Next.js version has breaking changes; check `node_modules/next/dist/docs/` when unsure of an API.

## Implementer subagent

- Read the task brief file first; treat it as the source of truth (exact values verbatim).
- Follow existing file patterns (see "Conventions" below). Don't restructure outside the task.
- Run `npm run build` (and `npm run lint`) before committing; report the results.
- Report status DONE / DONE_WITH_CONCERNS / BLOCKED / NEEDS_CONTEXT; write the full report to the SDD workspace report file.
- Don't add comments to code unless necessary.

## Reviewer subagent

- Read-only. Verify the diff against the brief, never trust the implementer's report.
- Two verdicts required: spec compliance (missing/extra/misunderstood) and code quality.
- Categorize findings Critical / Important / Minor with `file:line`. Be specific; don't pad.

## Conventions

- **File layout:** helpers in `src/lib/`; shared UI in `src/components/`; routes in `src/app/`; admin under `src/app/admin/(dashboard)/`.
- **Server vs client:** default to server components. Only add `"use client"` where interactivity/state requires it (cart, forms with inline edit, drawers).
- **Data access:** use the `prisma` singleton from `src/lib/prisma.ts`. Settings via `src/lib/settings.ts`. Currency via `formatRM` in `src/lib/format.ts`. WhatsApp links via `whatsappLink` in `src/lib/wa.ts`.
- **Admin CRUD pattern** (established in Tasks 9–12): `"use server"` `actions.ts` (zod validation → prisma → `revalidatePath` → `{ error?: string }`), a server `page.tsx` that loads data, and (when inline edit needs state) a client form component.
- **Styling:** use the Tailwind v4 tokens from `design.md` (`paper`, `cocoa`, `caramel`, `rose`, `butter`, `cream-line`) and the `.price-tag`/`.font-display` classes.
- **Money:** always integer cents in the DB; convert only at the edges (`formatRM`, admin form).
