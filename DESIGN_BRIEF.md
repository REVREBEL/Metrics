# DESIGN_BRIEF.md — GuestBridge

> Last updated: 2026-06-11 | Design Sprint 1 | Status: In Progress

## 1. Product & Design Vision
GuestBridge is an elegant, multi-surface hospitality platform normalizing communication, concierge services, and CRM workflows across OTA (Expedia, Booking.com) and direct channels. It bridges the gap between anonymous OTA bookings and direct guest relationships by providing direct contact capture and zero-install verification.

## 2. Design Principles
* Derived from `/ux-strategy:strategize`.
* **Frictionless Onboarding** - Zero native app downloads; sub-60s pre-arrival verification.
* **Hospitality-First Elegance** - Editorial serifs for guests; dark, operational density for operators.
* **Accessibility & Safety** - WCAG 2.2 AA compliance; clear Fitts' Law visual barriers for destructive actions.

## 3. Tooling & Target Platforms
* **Design Workspace:** Figma & React 19 Code Components
* **Target Platforms:** Mobile iOS/Android PWA (Guest Portal), Desktop Web (Admin Console)
* **Design Tokens Format:** Tailwind v4 (OKLCH color space)

## 4. Key Artifact Map
| Asset Layer | Path / Location | Contents |
| --- | --- | --- |
| Research | `docs/design/research/` | User personas, journey maps, test protocols |
| Design System | `docs/design/system/` | OKLCH tokens, component specifications |
| Interaction Flows | `docs/design/interactions/` | State charts, shortcut mapping, Fitts' law guidelines |
| Sprints & Feedback | `docs/design/sprints/sprint-1/` | Plans, trackers, done/sign-off sheets |
| Memorandums | `docs/design/MEMORANDUM.md` | Crucial operational parameters and API limits |

## 5. Design Sprint Status
| Sprint | Name | Status | Covered Commands / Scope |
| --- | --- | --- | --- |
| 1 | Core UI Specs | 🔨 In Progress | Guest Portal verification, SLA Messaging thread specs, OKLCH Tokens |

## 6. Cross-Chat Handoff Protocol (CRITICAL)
Before any design chat finishes its execution phase, it MUST:
1. Write `docs/design/sprints/sprint-N/done.md` outlining changes, outputs, and deferred items.
2. Update Section 5 & 7 of this `DESIGN_BRIEF.md` file.
3. Commit all assets with a descriptive message: `design-sprint-N: <summary>`.

## 7. Current Design State
**What is finalized:**
* Mobile VerificationCard visual anatomy and prop API specs.
* SLAInboxThread component specification and operator hotkey models.
* OKLCH theme variables for both surfaces.

**What is undergoing critique/testing:**
* Verification funnels, A/B SMS opt-in consent experiments, and WCAG order verification.

**What's next:**
* Layout definitions for the analytics dashboard and experience metadata database.
