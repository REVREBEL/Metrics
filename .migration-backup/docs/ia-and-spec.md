# Metrics — Information Architecture, User Flows & Implementation Spec

> Generated: May 28, 2026  
> Stack: Vite + React + TypeScript + Tailwind v4 + Wouter routing  
> Source root: `src/`  
> Migrated artifact: `artifacts/revrebel-metrics/`

---

## 1. Navigation & Sidebar

The sidebar (`src/components/layout/data/sidebar-data.ts`) defines the top-level app navigation. Current registered items and their route targets:

| Sidebar Label | Route | Source Label |
|---|---|---|
| Metrics | `/dashboard` | Dashboard (main) |
| Properties | `/properties` | Hotel portfolio |
| Growth Plan | `/tasks` | Revenue meeting tasks |
| Broadcast | `/campaigns` | Campaign tracking |
| Signals | `/metric-library` | Metric library |
| Data Library | `/data-library` | Internal data tools |
| The Playbook | `/strategies` | Strategy library |
| Threads | `/chats` | AI/chat (future) |
| Help Desk | `/help-desk` | Support |

The property/portfolio switcher at the top of the sidebar currently has three hardcoded teams: `Portfolio / All Properties`, `Property A`, and `Property B`. These are fixtures — not yet wired to `hotelProfiles` in the database.

Settings and Users are accessible but not linked from the main sidebar. They live at `/settings/*` and `/users`.

---

## 2. Full Route Map

### App shell routes — `src/app/(app)/`

```
/dashboard                              → Metrics dashboard (DuckDB-powered, partially live)
/dashboard/segments                     → Segment performance
/dashboard/channels                     → Channel performance
/dashboard/room-types                   → Room type performance
/dashboard/demand                       → Demand / market demand
/dashboard/website                      → Website / GA / digital metrics

/properties                             → Property list (ProductAreaPage placeholder)
/hotels/events                          → Hotel events
/hotels/notes                           → Hotel notes
/hotels/tasks                           → Hotel tasks (Kanban — not yet property-scoped)
/hotels/campaigns                       → Property-level campaigns
/hotels/strategies                      → Property-level strategies

/tasks                                  → Global Growth Plan / tasks table (TasksTable, static data)

/campaigns                              → Campaigns index (ProductAreaPage placeholder)
/campaigns/active                       → Active campaigns (placeholder)
/campaigns/setup                        → Campaign setup (placeholder)
/campaigns/performance                  → Campaign performance (placeholder)

/data-library                           → Data Library index (ProductAreaPage placeholder)
/data-library/lookups                   → Lookup Table Manager ← MOST BUILT
/data-library/mappings                  → Mapping Table Manager ← MOST BUILT
/data-library/unmapped-codes            → Unmapped code queue (placeholder)
/data-library/data-health               → Data health / refresh status (placeholder)

/metric-library                         → Metric Library index (placeholder)
/metric-library/base                    → Base metrics (placeholder)
/metric-library/calculated              → Calculated metrics (placeholder)

/strategies                             → Strategies index (ProductAreaPage placeholder)
/strategies/playbooks                   → Playbooks (placeholder)
/strategies/triggers                    → Trigger conditions (placeholder)
/strategies/recommended-actions         → Recommended actions (placeholder)

/chats                                  → Threads index (placeholder)
/chats/assistant                        → AI assistant chat (placeholder)

/users                                  → Users management table (UsersTable, static data)

/settings                               → Settings index (redirect to account)
/settings/account                       → Account settings
/settings/appearance                    → Appearance / theme
/settings/notifications                 → Notification preferences
/settings/profile                       → User profile form
/settings/display                       → Display settings (extra, may merge with appearance)
/settings/data-library/lookups          → Duplicate lookup manager (lives inside settings — should consolidate)

/help-desk                              → Help Desk index
/help-desk/contact                      → Contact
/help-desk/documentation                → Docs

/apps                                   → Apps area (scheduled for removal per product decision)
```

### Auth routes — `src/app/(auth)/`

```
/sign-in/[[...sign-in]]                 → Stubbed (Clerk removed, redirects to /dashboard)
/sign-up/[[...sign-up]]                 → Stubbed (Clerk removed, redirects to /dashboard)
```

### Backend/dev routes — `src/app/(backend)/`

```
/playground                             → Live code playground (Monaco, Vite worker, shadcn registry)
/ui-builder                             → Drag-and-drop UI builder (full layer store, DnD kit)
```

---

## 3. Implementation Status by Section

### 3.1 Dashboard — `/dashboard`

**Status: Partially live. DuckDB data loading broken.**

The main dashboard page renders a `YearMonthSelector` and, once a date is selected, shows `PerformanceCard` and `PerformanceCardOther`. These cards pull data from parquet files via DuckDB WASM.

**Current blocker:** `dashboard_current.parquet` is present at `public/data/` but the file is invalid (no magic bytes — likely a placeholder or corrupt file). The browser console shows:
```
No magic bytes found at end of file 'dashboard_current.parquet'
```

The sub-tabs (Overview, Analytics, Performance, Reports, Notifications) exist in the tab list but only `Overview` has a `TabsContent` block, which is empty.

Top nav links connect to the five sub-sections below.

#### Dashboard sub-sections

| Route | Status | Components |
|---|---|---|
| `/dashboard` | Partial — date picker works, cards fail on data | `PerformanceCard`, `PerformanceCardOther`, `YearMonthSelector` |
| `/dashboard/segments` | Placeholder page with same shell | `analytics.tsx`, `analytics-chart.tsx`, `overview.tsx`, `recent-sales.tsx` — all placeholder |
| `/dashboard/channels` | Placeholder | Same pattern |
| `/dashboard/room-types` | Placeholder | Same pattern |
| `/dashboard/demand` | Placeholder | Same pattern |
| `/dashboard/website` | Has extras: `config-drawer.tsx`, `popover.tsx` | Slightly more detail, still placeholder data |

All sub-section pages share the same four-component pattern:
- `overview.tsx` — KPI cards row
- `analytics-chart.tsx` — chart area
- `analytics.tsx` — secondary analytics panel
- `recent-sales.tsx` — data table

These are named generically and need to be replaced with hotel-revenue-specific content.

---

### 3.2 Data Library — `/data-library`

**Status: Most built section. Two functional managers exist.**

#### Lookup Table Manager — `/data-library/lookups`

**Fully built. Backed by fixtures; ready for real data wiring.**

- **Component:** `lookup-table-manager.tsx` (734 lines)
- **Actions:** `actions.ts` → `getLookupTableRowsAction`, `saveLookupTableChangesAction`
- **Service:** `src/lib/lookup-tables/service.ts` — currently reads from fixtures; has dynamic Drizzle import path for later DB wiring
- **Fixtures:** `src/lib/lookup-tables/fixtures.ts` — 9 tables defined

Fixture tables currently loaded:

| Table Key | Display Name |
|---|---|
| `metrics_core.dim_property` | Property Dimension |
| `metrics_core.lkp_segment` | Segment Lookup |
| `metrics_core.map_segment` | Segment Mapping |
| `metrics_core.map_roomtype` | Room Type Mapping |
| `metrics_core.lkp_channel` | Channel Lookup |
| `metrics_core.map_source` | Source Mapping |
| `metrics_core.map_rate` | Rate Code Mapping |
| `metrics_core.lkp_event_category` | Event Category Lookup |
| `metrics_core.lkp_event_impact` | Event Impact Lookup |

Columns per row: `sourceSystem`, `rawCode`, `rawName`, `mappedValue`, `mappedGroup`, `isActive`, `notes`, `updatedAt`, `updatedBy`

UX features implemented:
- Table selector dropdown
- Search / filter by raw code, name, mapped value
- Sort by multiple columns (asc/desc)
- Status filter: All / Active / Inactive / Dirty / Invalid
- Inline cell editing for `mappedValue`, `mappedGroup`, `isActive`, `notes`
- Dirty state tracking
- Zod validation (`lookupTableChangeSchema`)
- Save via server action with optimistic feedback (Sonner toast)
- Pagination

#### Mapping Table Manager — `/data-library/mappings`

**Fully built. Backed by fixtures; ready for real data wiring.**

- **Component:** `mapping-tables-manager.tsx` (594 lines)
- **Actions:** `actions.ts` → `getMappingTableRowsAction`, `saveMappingTableChangesAction`
- **Service:** `src/lib/mapping-tables/service.ts`
- **Fixtures:** `src/lib/mapping-tables/fixtures.ts`

UX features: same pattern as Lookup Manager, plus coverage status indicators.

#### Unmapped Codes — `/data-library/unmapped-codes`

**Status: ProductAreaPage placeholder.** No dedicated component yet.

#### Data Health — `/data-library/data-health`

**Status: ProductAreaPage placeholder.** No dedicated component yet.

---

### 3.3 Properties — `/properties`

**Status: ProductAreaPage placeholder.**

The route exists with a descriptive placeholder listing: `Property Profiles`, `Events`, `Notes`, `Tasks`, `Campaigns`, `Strategies`. No list view, no `[hotelId]` dynamic routes yet.

The `hotels/` sub-routes (events, notes, tasks, campaigns, strategies) exist as separate flat files under `src/app/(app)/hotels/` — they are not yet nested under a `[hotelId]` param. These are likely working towards the property-scoped design in the vision doc.

---

### 3.4 Growth Plan (Tasks) — `/tasks`

**Status: Functional with static data.**

Uses a full TanStack Table implementation with:
- Column sorting, filtering, pagination
- Multi-select bulk delete
- Row-level actions (edit, delete)
- Mutate drawer for create/edit
- Import dialog
- Static `tasks` data array (not yet DB-backed)

Note: This is currently a global task list. Per product decisions, tasks should move into the hotel context (`/properties/[hotelId]/tasks`) as a Kanban board. The current flat table can serve as a base but needs scoping and Kanban transformation.

---

### 3.5 Campaigns (Broadcast) — `/campaigns`

**Status: ProductAreaPage placeholder with sub-routes stubbed.**

Sub-routes exist (`/active`, `/setup`, `/performance`) but all are placeholder pages. The DB schema for campaigns is fully defined (see Section 5).

---

### 3.6 Strategies (The Playbook) — `/strategies`

**Status: ProductAreaPage placeholder with sub-routes stubbed.**

Sub-routes for `playbooks`, `triggers`, and `recommended-actions` exist but are placeholders. DB schema (`strategy_templates`, `hotel_strategy_notes`) is defined.

---

### 3.7 Metric Library (Signals) — `/metric-library`

**Status: ProductAreaPage placeholder with base/calculated sub-routes stubbed.**

No metric catalog data, no `[metricKey]` detail route yet.

---

### 3.8 Users — `/users`

**Status: Functional with static data. Has next/navigation imports to fix.**

Full TanStack Table with roles, invite dialog, bulk actions. Currently imports `useRouter` and `useSearchParams` from `next/navigation` — needs migration to wouter equivalents before it runs cleanly in the Vite build.

Static `users` data array at `src/app/(app)/users/data/users.ts`.

---

### 3.9 Settings — `/settings`

**Status: Forms built, not DB-wired.**

| Sub-route | Component | Status |
|---|---|---|
| `/settings/account` | `account-form.tsx` | Form built, static |
| `/settings/appearance` | `appearance-form.tsx` | Theme toggle, font selector |
| `/settings/notifications` | `notifications-form.tsx` | Form built, static |
| `/settings/profile` | `profile-form.tsx` | Form built, static |
| `/settings/display` | `display-form.tsx` | Duplicate of appearance — consider merging |
| `/settings/data-library/lookups` | Full lookup manager copy | **Duplicate** — should point to `/data-library/lookups` |

---

### 3.10 Playground & UI Builder — backend routes

| Route | Status |
|---|---|
| `/playground` | Fully built — Monaco editor, Vite transpile worker, shadcn registry, preset system |
| `/ui-builder` | Fully built — layer store, DnD kit, props panel, layers panel, canvas, variables |

These are internal REVREBEL developer tools, not client-facing.

---

## 4. Data Architecture

### 4.1 Three-layer model

```
BigQuery (analytical source of truth)
  └── Raw hotel data, staging, fact tables, dimensions, lookup/mapping tables

App Database — PostgreSQL via Drizzle ORM  (`src/db/`)
  └── Users, roles, hotel profiles, notes, events, tasks, campaigns,
      strategy templates, data library edits, audit log

DuckDB WASM  (browser) / DuckDB server-side
  └── Parquet files served from /public/data/
  └── Pre-computed BI-ready mart tables for fast dashboard queries
```

### 4.2 DuckDB integration

- Hook: `src/hooks/useDuckDb.ts` — initializes `@duckdb/duckdb-wasm` with MVP and EH bundles
- Parquet files registered from `/public/data/`:
  - `dashboard_current.parquet` ← currently invalid/empty
  - Additional files registered in `useHotelAnalytics.ts`
- Worker files expected at `/public/duckdb/`:
  - `duckdb-mvp.wasm`, `duckdb-eh.wasm`
  - `duckdb-browser-mvp.worker.js`, `duckdb-browser-eh.worker.js`

**Key gap:** Valid parquet data files need to be generated and placed in `public/data/` before the dashboard cards will render. The worker files appear to be present (console shows they load), but the parquet data file is corrupt/empty.

---

## 5. Database Schema (Drizzle / PostgreSQL)

All tables defined in `src/db/schema/index.ts`.

### Enums
- `role_type`: `admin | manager | analyst | viewer`
- `task_status`: `todo | in_progress | blocked | done`
- `event_type`: `meeting | call | onsite | milestone | other`
- `campaign_status`: `draft | active | paused | archived`

### Tables

| Table | Purpose | Key Fields |
|---|---|---|
| `app_users` | Authenticated users | `clerkUserId`, `email`, `displayName` |
| `user_roles` | Role assignments | `userId → role` |
| `hotel_profiles` | Hotel/property records | `propertyCode`, `name`, `timezone`, `market` |
| `hotel_user_access` | Per-hotel access control | `userId`, `hotelId`, `canEdit` |
| `hotel_notes` | Strategy/property notes | `hotelId`, `title`, `body` |
| `hotel_events` | Demand-driver events | `hotelId`, `eventType`, `title`, `startsAt`, `endsAt` |
| `hotel_task_statuses` | Kanban column definitions | `code`, `label`, `sortOrder` |
| `hotel_tasks` | Revenue meeting tasks | `hotelId`, `title`, `statusId`, `assigneeUserId`, `dueDate` |
| `hotel_task_comments` | Task thread comments | `taskId`, `authorUserId`, `comment` |
| `campaigns` | Campaign records | `hotelId`, `name`, `status`, `startsAt`, `endsAt`, `metadata` |
| `campaign_tracking_rules` | Rate codes, GA tags, links | `campaignId`, `rule (jsonb)` |
| `campaign_metric_selections` | Which metrics a campaign tracks | `campaignId`, `metricKey` |
| `strategy_templates` | REVREBEL playbook library | `name`, `description`, `content (jsonb)` |
| `hotel_strategy_notes` | Per-hotel strategy context | `hotelId`, `strategyTemplateId`, `note` |
| `data_library_tables` | Registry of BigQuery tables | `tableName`, `displayName`, `uiMetadata` |
| `lookup_table_draft_edits` | Pending mapping changes | `dataLibraryTableId`, `rowIdentifier`, `draftPayload` |
| `lookup_table_change_requests` | Review/approval workflow | `draftEditId`, `status`, `rationale` |
| `app_audit_log` | Full change history | `actorUserId`, `entityType`, `entityId`, `action`, `before/afterState` |

**Note:** The schema is fully designed and migrated (`0000_magical_iron_monger.sql` exists) but the app DB connection is not yet live in the Replit environment. The lookup and mapping managers currently fall back to fixtures.

---

## 6. Component & Widget Inventory

### Layout shell — `src/components/layout/`
- `authenticated-layout.tsx` — wraps all app routes with sidebar + content area
- `app-sidebar.tsx` — sidebar with team switcher, nav groups, user menu
- `header.tsx` — top header bar, supports fixed mode
- `main.tsx` — content wrapper (supports fluid mode)
- `top-nav.tsx` — horizontal tab nav (used by dashboard)
- `nav-group.tsx`, `nav-user.tsx`, `team-switcher.tsx`

### Data table system — `src/components/data-table/`
- `toolbar.tsx`, `column-header.tsx`, `faceted-filter.tsx`, `pagination.tsx`, `view-options.tsx`, `bulk-actions.tsx`
- Full TanStack Table v8 implementation

### Chart library — `src/components/charts/`
All Recharts-based. Available types:
- Area: standard, stacked, interactive, gradient, step, linear
- Bar: standard, horizontal, interactive, negative, mixed, stacked, custom label
- Line: standard, interactive, custom dots/label, multiple, step
- Pie: donut, donut with text, interactive, stacked, custom label
- Radar: multiple variants
- Radial: grid, label, shape, stacked, text

### Widget library — `src/widgets/`
Revenue/hotel-specific widgets:
- `PerformanceCard`, `PerformanceCardOther` — main dashboard metric cards (DuckDB-backed)
- `DailyPickupTable` / `TempDailyPickupTable` — daily pickup data
- `ModelComparisonCard` — model vs. actual
- `MarketSegmentGroupRoomsTable`, `MarketSegmentTransientRoomsTable`
- `CalendarHeatmap` — booking calendar heat map
- `TopChannelsChart`, `OTBStackedBarChart`
- `YearMonthSelector` — date picker for dashboard
- `DashboardSection`, `OverviewSection`, `AnalyticsSection`, `CampaignsSection`, `PostsSection`
- `AnalyticsOverview`

Generic dashboard widgets:
- `SimpleKPICards`, `SimpleStatisticsCards`, `SalesMetrics`, `SalesMetricsCard`
- `BudgetSnapshotCard`, `ConversionCard`, `BrowserStatsCard`, `PageTrafficCard`
- `BarChartInteractive`, `AreaChartInterActive`, `LineChartInteractive`
- `ChartsGrid`, `DataTable`, `EmptyState`, `TimelineComponent`

Shared metric shells — `src/widgets/_shared/`:
- `MetricCard.tsx`, `MetricCardShell.tsx`, `MetricLayout.tsx`, `MetricTrendIcon.tsx`

### UI primitives — `src/components/ui/`
Full shadcn/Radix-style set: accordion, alert-dialog, avatar, badge, button (all variants), calendar, card, carousel, chart, checkbox, combobox, command, dialog, drawer, dropdown-menu, form, hover-card, input (all variants), label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toast, toggle, tooltip, typography.

Additional complex components:
- `auto-form/` — Zod-schema-driven auto form generator
- `minimal-tiptap/` — rich text editor (TipTap-based)
- `ui-builder/` — full drag-and-drop UI builder

### Context providers — `src/context/`
- `theme-provider.tsx` — dark/light via `next-themes`
- `font-provider.tsx` — runtime font switching
- `layout-provider.tsx` — layout configuration
- `direction-provider.tsx` — RTL/LTR
- `search-provider.tsx` — command menu search state

---

## 7. Styles & Design System

### Tokens — `src/styles/`
| File | Purpose |
|---|---|
| `metric-theme-tokens.css` | OKLCH color tokens: brand greens, dark blues, teal accents |
| `metric-theme-sources.css` | Source-system color palette |
| `metric-cards.css` | Base card component styles |
| `metric-layout.css` | Dashboard grid and spacing |
| `metric-card-overrides.css` | Card variant overrides |
| `metric-card-color-overrides.css` | Color variant overrides |
| `metric-card-header-overrides.css` | Header layout overrides |
| `metric-card-chart-overrides.css` | Chart-inside-card overrides |
| `theme-reference.css` | CSS variable definitions (dark/light) |
| `tailwind-reference.css` | Tailwind utility reference |
| `analytics-section.css` | Analytics section layout |
| `campaigns-section.css` | Campaigns section layout |
| `dashboard-section.css` | Dashboard wrapper |
| `daily-pickup-table.css` | Pickup table specific styles |
| `model-comparison-card.css` | Model comparison layout |
| `calendar-heatmap.css` | Heatmap cell styles |
| `top-channels-chart.css` | Channel chart styles |
| `overview-section.css` | Overview layout |
| `posts-section.css` | Posts/social section |
| `widget-props-showcase.css` | Dev showcase styles |
| `metric-layout-showcase.css` | Dev layout showcase |
| `page-traffic-card.css` | Traffic card styles |

### Fonts
- Display / headings: **Khand** (all-caps, bold)
- Body: **Barlow**
- Monospace: **Fira Code**

### Color system
OKLCH-based. Primary brand token reference:
- Background: near-black navy
- Sidebar: dark navy with teal accent
- Primary action: teal/green
- Text: off-white with muted variants

---

## 8. Key Gaps & What Needs to Be Built

### Immediate / unblocked

| Gap | Detail |
|---|---|
| Valid parquet data files | `public/data/dashboard_current.parquet` is corrupt — dashboard cards can't render. Replace with valid mock or real data. |
| `users/page.tsx` next/navigation imports | Uses `useRouter` and `useSearchParams` from `next/navigation` — needs wouter equivalents |
| Wouter router wiring | The migrated artifact needs an `App.tsx` that wires all `src/app/(app)/` pages to wouter `<Route>` paths |
| Settings duplicate | `/settings/data-library/lookups` is a copy of the main lookup manager — should be removed or redirected |
| `apps` route | `src/app/(app)/apps/page.tsx` exists but should be removed per product decision |

### Next build targets (in priority order)

1. **Fix parquet data** → Dashboard becomes live with real or mock hotel data
2. **Property list** → `/properties` real page with `hotelProfiles` DB connection + `[hotelId]` routing
3. **Unmapped Code Queue** → `/data-library/unmapped-codes` functional page
4. **Data Health** → `/data-library/data-health` with refresh history
5. **Metric Library catalog** → `/metric-library` with metric definitions, formulas, dimension support
6. **Campaign manager** → `/campaigns` + `/campaigns/[campaignId]` full CRUD
7. **Tasks → Kanban** → Move `/tasks` into property context, convert table to Kanban board
8. **Strategy library** → `/strategies` real playbook entries backed by `strategy_templates`
9. **Hotel profile pages** → `/properties/[hotelId]/profile|events|notes|tasks|campaigns|strategies`
10. **App DB connection** → Wire PostgreSQL so lookup/mapping saves persist

---

## 9. File Reference Quick Map

```
src/
├── app/
│   ├── (app)/          ← All authenticated pages
│   ├── (auth)/         ← Sign-in / sign-up (stubbed)
│   └── (backend)/      ← Playground + UI Builder (dev tools)
├── assets/             ← Brand icons, channel icons, social icons, rebel icons
├── components/
│   ├── layout/         ← Shell: sidebar, header, main, top-nav
│   ├── charts/         ← All Recharts chart variants
│   ├── data-table/     ← TanStack Table shared utilities
│   ├── ui/             ← All shadcn/Radix primitives + complex components
│   ├── playground/     ← Code playground UI components
│   └── reui/           ← Data grid with DnD row support
├── context/            ← Theme, font, layout, direction, search providers
├── db/
│   ├── schema/index.ts ← Full Drizzle schema
│   ├── migrations/     ← SQL migrations
│   └── seed.ts         ← Seed script
├── hooks/              ← useDuckDb, useHotelAnalytics, useSettings, etc.
├── lib/
│   ├── lookup-tables/  ← Types, fixtures, schemas, service
│   ├── mapping-tables/ ← Types, fixtures, service
│   ├── playground/     ← Transpile, registry, presets, themes
│   └── ui-builder/     ← Layer store, DnD context, registry
├── styles/             ← All metric CSS design tokens and layouts
└── widgets/            ← Hotel-specific and generic dashboard widgets
```
