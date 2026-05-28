# RevRebel Metrics

A hotel revenue analytics dashboard migrated from Next.js/Vercel to the Replit pnpm workspace stack (Vite + React).

## Run & Operate

- `pnpm --filter @workspace/revrebel-metrics run dev` — run the frontend (port from $PORT)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: Vite + React, Tailwind v4 (@tailwindcss/vite), wouter for routing
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (v3 compatible), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/revrebel-metrics/src/App.tsx` — router with all route definitions
- `artifacts/revrebel-metrics/src/app/(app)/` — all app pages (dashboard, tasks, users, chats, etc.)
- `artifacts/revrebel-metrics/src/components/layout/` — sidebar, header, nav components
- `artifacts/revrebel-metrics/src/components/layout/data/sidebar-data.ts` — sidebar nav items and routes
- `artifacts/revrebel-metrics/src/lib/` — utilities, playground, theme helpers

## Architecture decisions

- Wouter replaces Next.js router: `Link` uses `href` prop; `useLocation()` returns `[pathname, navigate]`
- All `next/link`, `next/navigation`, `next/dynamic` imports replaced with Vite/wouter equivalents
- `"use client"` / `"use server"` directives are harmless strings in Vite (ignored)
- Zod is v3 — use `.email()`, `.url()` as chain methods, not top-level `z.email()`
- `src/db/` has server-side DB config — not imported in client-side Vite code

## Product

Hotel revenue analytics dashboard with pages for:
- **Metrics / Dashboard** — KPIs, segments, channels, room types, demand, website
- **Properties** — property profiles, events, notes, tasks, campaigns, strategies
- **Growth Plan (Tasks)** — task management with priorities, statuses, labels
- **Broadcast (Campaigns)** — campaign setup, active campaigns, performance
- **Signals (Metric Library)** — base and calculated metrics catalog
- **Data Library** — lookup tables, mapping tables, unmapped codes, data health
- **The Playbook (Strategies)** — strategy library, playbooks, trigger conditions
- **Threads (Chats)** — inbox/messaging interface
- **Help Desk** — support, documentation, contact
- **Settings** — profile, account, appearance, notifications, display
- **Users** — user management with roles and statuses
- **Playground / UI Builder** — component sandbox and design tools

## Sidebar nav route mapping

| Sidebar label | Route |
|---|---|
| Metrics | /dashboard |
| Properties | /properties |
| Growth Plan | /tasks |
| Broadcast | /campaigns |
| Signals | /metric-library |
| Data Library | /data-library |
| The Playbook | /strategies |
| Threads | /chats |
| Help Desk | /help-desk |

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- `lib/playground/modules.ts` has intentional `"next/link"` and `"next/image"` entries — do NOT change (playground sandbox module map)
- `playground/editor-panel.tsx` `DEFAULT_TSX_CODE` string contains `next/link` — also intentional (sample code shown in editor)
- `VITE_TEST_DATE` env var replaces `NEXT_PUBLIC_TEST_DATE` for the YearMonthSelector

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
