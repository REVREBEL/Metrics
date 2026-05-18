# Metrics Project Overview

Metrics is a hotel commercial intelligence platform for REVREBEL. The app is intended to bring hotel performance data, business logic, metric definitions, campaign tracking, strategy context, and AI-assisted recommendations into one operating layer.

The product should not only display performance. It should help define what the data means, expose what can be used in BI, and connect performance patterns to concrete commercial strategies.

## Core Product Areas

- **Dashboard** — analytical performance views for metrics, segments, channels, room types, demand, and website performance.
- **Hotels** — property context, hotel profiles, events, notes, revenue meeting tasks, campaigns, and strategy plans.
- **Data Library** — internal REVREBEL control layer for lookup tables, mapping tables, unmapped codes, data health, and source visibility.
- **Metric Library** — catalog of base and calculated metrics, formulas, source fields, allowed dimensions, and supported dashboard use cases.
- **Campaigns** — initiative tracking across rate codes, channels, GA tags, booking links, promo codes, goals, and campaign performance.
- **Strategies** — REVREBEL strategy library with structured playbooks, trigger conditions, related metrics, and recommended actions.
- **Chats** — future development area for AI/chat-based workflows.
- **Users** — user management and access controls.
- **Settings** — account, appearance, notifications, and profile preferences.

## Architecture Direction

- **BigQuery** is the analytical source of truth for raw hotel data, staging tables, fact tables, dimensions, lookup tables, mapping tables, and reporting views.
- **App database** is the operational source of truth for users, roles, hotel profiles, notes, events, campaigns, strategy library, metric definitions, dashboard/card configuration, and draft mapping edits.
- **DuckDB** is the fast local/server-side serving layer for precomputed BI-ready tables and lightweight dashboard interactions.

## Authenticated App Structure

The authenticated app lives under `src/app/(app)/` and should use the existing Metrics app shell, sidebar, header, and content layout.

```text
src/app/(app)/
├── layout.tsx
│   └── Uses AuthenticatedLayout / AppSidebar / SidebarInset
│
├── dashboard/
│   ├── page.tsx                         # Metrics / main dashboard
│   ├── segments/
│   │   └── page.tsx                     # Segment performance
│   ├── channels/
│   │   └── page.tsx                     # Channel performance
│   ├── room-types/
│   │   └── page.tsx                     # Room type performance
│   ├── demand/
│   │   └── page.tsx                     # Demand / market demand
│   ├── website/
│   │   └── page.tsx                     # Website / GA / digital metrics
│   └── components/
│       └── dashboard-tabs.tsx
│
├── hotels/
│   ├── page.tsx                         # Hotel list / portfolio view
│   └── [hotelId]/
│       ├── page.tsx                     # Hotel overview
│       ├── profile/
│       │   └── page.tsx                 # General hotel information
│       ├── events/
│       │   └── page.tsx                 # Hotel events and demand drivers
│       ├── notes/
│       │   └── page.tsx                 # Strategy notes / property notes
│       ├── tasks/
│       │   └── page.tsx                 # Revenue meeting Kanban board and follow-ups
│       ├── campaigns/
│       │   └── page.tsx                 # Hotel-specific campaigns
│       └── strategies/
│           └── page.tsx                 # Hotel-specific strategy plans
│
├── data-library/
│   ├── page.tsx                         # Data Library overview
│   ├── lookups/
│   │   └── page.tsx                     # Lookup Table Manager
│   ├── mappings/
│   │   └── page.tsx                     # Mapping Table Manager
│   ├── unmapped-codes/
│   │   └── page.tsx                     # Unmapped Code Queue
│   └── data-health/
│       └── page.tsx                     # Refresh and data quality
│
├── metric-library/
│   ├── page.tsx                         # All metrics
│   ├── base/
│   │   └── page.tsx                     # Base metrics
│   ├── calculated/
│   │   └── page.tsx                     # Calculated metrics
│   └── [metricKey]/
│       └── page.tsx                     # Metric detail page
│
├── campaigns/
│   ├── page.tsx                         # Campaign list
│   └── [campaignId]/
│       ├── page.tsx                     # Campaign overview
│       ├── setup/
│       │   └── page.tsx                 # Rate codes, channels, GA tags, booking links
│       └── performance/
│           └── page.tsx                 # Campaign progress screen
│
├── strategies/
│   ├── page.tsx                         # Strategy library
│   └── [strategyId]/
│       └── page.tsx                     # Strategy detail
│
├── chats/                               # Keep for future AI/chat development
│   └── page.tsx
│
├── users/                               # User management
│   └── page.tsx
│
└── settings/
    ├── account/
    │   └── page.tsx
    ├── appearance/
    │   └── page.tsx
    ├── notifications/
    │   └── page.tsx
    └── profile/
        └── page.tsx
```

## Navigation Direction

```text
Main
├── Dashboard
│   ├── Metrics
│   ├── Segments
│   ├── Channels
│   ├── Room Types
│   ├── Demand
│   └── Website
├── Hotels
│   ├── Hotel Profiles
│   ├── Events
│   ├── Notes
│   ├── Tasks
│   ├── Campaigns
│   └── Strategies
├── Campaigns
├── Metric Library
├── Data Library
│   ├── Lookup Tables
│   ├── Mapping Tables
│   ├── Unmapped Codes
│   └── Data Health
├── Strategies
├── Chats
├── Users
└── Settings
    ├── Account
    ├── Appearance
    ├── Notifications
    └── Profile
```

## Current Product Decisions

- Keep dashboard sections as distinct pages: `segments`, `channels`, `room-types`, `demand`, and `website`.
- Keep `chats` in the structure for future development.
- Keep `settings` limited to account, appearance, notifications, and profile preferences.
- Move `tasks` into the hotel context because it represents a Kanban board for revenue meeting tasks and follow-ups.
- Keep `users` as its own user-management area.
- Remove `apps` from the product navigation and route structure.
- Build new product functionality inside the existing authenticated Metrics shell rather than creating detached admin surfaces.

## First Implementation Target

The first Data Library implementation target should be the Lookup Table Manager:

```text
src/app/(app)/data-library/lookups/page.tsx
```

This page should use the existing authenticated app shell and follow current dashboard layout conventions rather than creating a separate admin UI.