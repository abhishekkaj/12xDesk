# AI_STRICT_CONTEXT.md — Anti-Hallucination Rulebook

> **Purpose:** This file is the single source of truth for all AI-assisted development on this project. It MUST be silently read and referenced before executing any prompt. Any deviation from these rules must be flagged to the user before code is written.

---

## 1. Target Audience

- **Who:** Independent real estate channel partners and brokers operating in the Indian market.
- **Geography Focus:** High-growth corridors such as Mumbai suburbs (Thane, Navi Mumbai, Panvel, Vasai-Virar, etc.).
- **Device Priority:** Mobile-first. 90%+ of users will access this CRM from their smartphones.
- **Communication Channel:** WhatsApp is the primary business communication tool. Every feature must consider "How does this help the broker send/receive info on WhatsApp faster?"
- **Literacy Level:** Users are tech-savvy enough for WhatsApp and basic apps, but NOT power users. UI must be dead simple — no nested menus, no jargon, no enterprise bloat.

---

## 2. Tech Stack (LOCKED)

| Layer            | Technology                        | Notes                                      |
| ---------------- | --------------------------------- | ------------------------------------------ |
| Framework        | **Next.js 14+ (App Router)**      | Use `app/` directory, server components     |
| Language         | **TypeScript**                    | Strict mode enabled                        |
| Styling          | **Tailwind CSS**                  | Mobile-first breakpoints                   |
| UI Components    | **Shadcn UI**                     | Copy-paste component model, no heavy deps  |
| Database         | **SQLite + Prisma ORM**           | Local-first, zero-config for prototyping   |
| State Management | React Server Components + hooks  | No Redux, no Zustand unless approved       |
| Deployment       | Vercel (future)                   | Keep build output clean                    |

### Stack Rules:
- ❌ **DO NOT** install any new npm package without explicit user permission.
- ❌ **DO NOT** introduce an external database (Postgres, Supabase, Firebase) unless explicitly told.
- ❌ **DO NOT** add authentication libraries until Phase 3+.
- ❌ **DO NOT** use CSS-in-JS (styled-components, emotion, etc.).

---

## 3. Design Language

- **Philosophy:** Clean, high-contrast, intuitive. Inspired by modern fintech/neobank apps (CRED, Jupiter, Razorpay Dashboard).
- **Color Palette:** Dark mode primary. Accent color: Electric blue (#3B82F6) or Emerald (#10B981).
- **Typography:** Inter or system font stack. No decorative fonts.
- **Layout Rules:**
  - No complex nesting. Maximum 2 levels of visual hierarchy per screen.
  - Cards over tables on mobile.
  - Bottom navigation on mobile, sidebar on desktop.
  - Every CTA must be thumb-reachable (bottom 60% of screen).
- **Spacing:** Generous padding. Touch targets minimum 44x44px.
- **Icons:** Lucide Icons (bundled with Shadcn UI).

---

## 4. Core Data Models

All features MUST revolve around these three primary entities:

### Lead (Inquiry)
```
Lead {
  id            String    @id @default(cuid())
  name          String
  phone         String    // Indian mobile format: +91XXXXXXXXXX
  email         String?
  source        String    // 99acres, MagicBricks, Housing.com, Walk-in, Referral, WhatsApp
  budget        String?   // e.g., "80L - 1.2Cr"
  requirement   String?   // e.g., "2BHK in Thane West"
  status        String    @default("new") // new, contacted, qualified, site_visit, negotiation, closed_won, closed_lost
  notes         String?
  assignedTo    String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### Property (Inventory)
```
Property {
  id            String    @id @default(cuid())
  projectName   String    // e.g., "Lodha Palava"
  developerName String    // e.g., "Lodha Group"
  location      String    // e.g., "Dombivli East"
  type          String    // 1BHK, 2BHK, 3BHK, Villa, Plot
  priceRange    String    // e.g., "55L - 1.2Cr"
  status        String    // Under Construction, Ready to Move, Pre-Launch
  possession    String?   // e.g., "Q4 2027"
  reraCertified Boolean   @default(false)
  reraNumber    String?
  amenities     String?   // JSON string or comma-separated
  brochureUrl   String?
  notes         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### Interaction (Activity Log)
```
Interaction {
  id            String    @id @default(cuid())
  leadId        String
  type          String    // whatsapp, call, site_visit, email, note
  direction     String?   // inbound, outbound
  summary       String
  scheduledAt   DateTime?
  completedAt   DateTime?
  createdAt     DateTime  @default(now())
}
```

---

## 5. Architectural Principles

1. **Speed over features.** If a feature takes more than 2 taps to use, redesign it.
2. **WhatsApp-first.** Every lead action should have a "Send on WhatsApp" shortcut.
3. **Offline-capable (future).** Design data layer to support offline sync later.
4. **No enterprise bloat.** This is NOT Salesforce. No role hierarchies, no approval workflows, no complex permissions in Phase 1.
5. **Indian context.** Currency in ₹ (Lakhs/Crores format). Phone numbers in +91 format. RERA compliance fields where needed.

---

## 6. Conflict Resolution

If any future prompt contradicts:
- The locked tech stack → **FLAG IT** before coding.
- The core data models → **FLAG IT** before coding.
- The mobile-first philosophy → **FLAG IT** before coding.
- The "no new dependencies" rule → **FLAG IT** before coding.

> This document is version-controlled. Any changes require explicit user approval.

---

*Last Updated: 2026-04-28*
