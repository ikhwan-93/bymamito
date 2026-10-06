# Bymamito — Available Skills

The AI must read this file and load the relevant skill via the `skill` tool **before acting on every task**. Skills live in the user's global config and cache, not in this repo.

## Process skills (invoke first)

| Skill | When |
|---|---|
| `brainstorming` | Before any new feature/creative work — clarify intent and present a design before coding. |
| `writing-plans` | When turning an approved design into an implementation plan. |
| `subagent-driven-development` | Executing a written plan task-by-task with per-task review. |
| `executing-plans` | Executing a plan inline (checkpoints) instead of via subagents. |
| `systematic-debugging` | Any bug, test failure, or unexpected behavior — before proposing a fix. |
| `test-driven-development` | When implementing a feature/fix that warrants tests. |
| `verification-before-completion` | Before claiming work is done/passing. |
| `receiving-code-review` / `requesting-code-review` | Receiving or requesting code review. |

## Implementation / design skills

| Skill | When |
|---|---|
| `frontend-design` | Visual direction for UI work — avoid templated/default aesthetics. |
| `ui-styling` | Tailwind/shadcn UI implementation. |
| `web-design-guidelines` | Auditing UI for accessibility/best practices. |
| `vercel-react-best-practices` | React/Next.js performance work. |
| `design` / `design-system` / `slides` / `banner-design` | Design-system, token, and presentation work. |

## Project-specific guidance

- The repo's `AGENTS.md` (auto-generated) mandates reading `node_modules/next/dist/docs/` before writing Next.js code, because this Next.js version has breaking changes. Treat that as a standing constraint on top of any skill.
- For this project, `brainstorming` and `systematic-debugging` are the two most commonly needed process skills.
