# FEATURES_LOG.md — Living Roadmap

> **Purpose:** This is the single source of truth for feature tracking. Updated as features move through development phases.

---

## Feature Status Legend

| Status         | Emoji | Description                        |
| -------------- | ----- | ---------------------------------- |
| **To-Do**      | ⬜    | Not started                        |
| **In Progress**| 🟡    | Currently being built              |
| **Done**       | ✅    | Complete and functional            |
| **Blocked**    | 🔴    | Waiting on dependency or decision  |

---

## Phase 1 — Foundation & Core UI

| #  | Feature                              | Status | Notes                                                    |
| -- | ------------------------------------ | ------ | -------------------------------------------------------- |
| 1  | Project initialization (Next.js)     | ✅     | App Router + TypeScript + Tailwind + Shadcn              |
| 2  | AI_STRICT_CONTEXT.md                 | ✅     | Anti-hallucination rulebook created                      |
| 3  | FEATURES_LOG.md                      | ✅     | This file                                                |
| 4  | Mobile-responsive layout shell       | ✅     | Bottom nav (mobile) + sidebar (desktop)                  |
| 5  | Unified Leads Inbox (UI scaffold)    | ✅     | Empty page with layout, search bar, source filters       |
| 6  | Site Visit Kanban Pipeline (scaffold)| ✅     | 6-column Kanban board with empty drop zones              |

---

## Phase 2 — Core Features

| #  | Feature                              | Status | Notes                                                    |
| -- | ------------------------------------ | ------ | -------------------------------------------------------- |
| 7  | Unified Leads Inbox                  | ✅     | Single dashboard for fresh inquiries from all sources    |
|    | — Lead cards with source badge       | ✅     | 99acres, MagicBricks, Housing.com, Walk-in, Referral     |
|    | — Quick actions (Call, WhatsApp)      | ✅     | One-tap actions on each lead card                        |
|    | — Search & filter                    | ✅     | By source, status, date range, budget                    |
|    | — Add lead manually                  | ✅     | Quick-add form (name, phone, source, requirement)        |
| 8  | Smart Inventory Database             | ✅     | Property table with tags and filters                     |
|    | — Property cards                     | ✅     | Type, price, location, possession, RERA badge            |
|    | — Tag system                         | ✅     | 2BHK, Under Construction, Possession Q4 2027, Area      |
|    | — Add/Edit property                  | ⬜     | Form with all Property model fields                      |
|    | — Search & filter                    | ⬜     | By type, price range, location, status                   |
| 9  | Site Visit Pipeline (Kanban)         | ✅     | Full drag-and-drop Kanban board                          |
|    | — Column: New Lead                   | ✅     | Hardcoded column                                         |
|    | — Column: Requirement Gathered       | ✅     | Hardcoded column                                         |
|    | — Column: Site Visit Scheduled       | ✅     | Hardcoded column                                         |
|    | — Column: Site Visit Done            | ✅     | Hardcoded column                                         |
|    | — Column: Token/Negotiation          | ✅     | Hardcoded column                                         |
|    | — Column: Closed                     | ✅     | Hardcoded column                                         |
|    | — Drag-and-drop lead cards           | ✅     | Move leads between stages                                |
| 10 | WhatsApp Brochure Engine             | ✅     | Select property → auto-generate message → WhatsApp link  |
|    | — Property selector                  | ✅     | Dropdown/search to pick a property                       |
|    | — Message template builder           | ✅     | Auto-fill project name, price, location, possession      |
|    | — WhatsApp Web link generator        | ✅     | `https://wa.me/?text=...` with encoded message           |
|    | — PDF/Brochure attachment            | ⬜     | Link to brochure URL in message                          |

---

## Phase 3 — Advanced Features (Future)

| #  | Feature                              | Status | Notes                                                    |
| -- | ------------------------------------ | ------ | -------------------------------------------------------- |
| 11 | Database setup (SQLite + Prisma)     | ✅     | Schema, migrations, seed data                            |
| 12 | Automated Lead Ingestion (Webhook)  | ✅     | API endpoint to ingest leads from external sources      |
|    | — API Key protection                 | ✅     | Header-based authorization check                         |
|    | — Payload validation                 | ✅     | Ensure name and phone are present                        |
|    | — Prisma database sync               | ✅     | Instant lead creation in SQLite                          |
| 13 | Authentication                       | ⬜     | Phone OTP or simple login                                |
| 14 | Dashboard analytics                  | ⬜     | Lead count, conversion rate, pipeline value              |
| 15 | Interaction Timelines & History    | ✅     | Chronological log of calls, visits, and messages        |
|    | — Activity feed UI                   | ✅     | Visual vertical timeline with status icons               |
|    | — Manual note logging                | ✅     | Quick form to log manual entries and notes               |
|    | — Automated event hooks              | ✅     | Auto-log stage changes and WhatsApp broadcasts          |
| 16 | Smart Broadcast Queue              | ✅     | Sequential WhatsApp dispatcher for filtered leads        |
|    | — Bulk selection logic               | ✅     | Select multiple leads from the inbox                     |
|    | — Sequential dispatcher UI           | ✅     | Modal to iterate through leads and send messages         |
|    | — Message templates                  | ✅     | Pre-fill message for the entire selection                |
|    | — Progress tracking                  | ✅     | See which leads are sent/pending in the queue            |
| 17 | Follow-up reminders                  | ⬜     | Push notifications / calendar integration                |
| 18 | Multi-user support                   | ⬜     | Team leads assigning leads to agents                     |
| 19 | CSV import/export                    | ⬜     | Bulk data migration                                      |
| 20 | PWA support                          | ⬜     | Installable on mobile home screen                        |

---

## Changelog

| Date       | Change                                         |
| ---------- | ---------------------------------------------- |
| 2026-04-28 | Initial roadmap created. Phase 1 items started. |

---

*This document is updated continuously as development progresses.*
