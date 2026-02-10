# Dozo Tech 2026 - Project Specifications

**Date:** February 2026
**Target:** AI Development Agent (Antigravity)
**Core Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + next-intl + Neon DB + Vercel AI SDK

---

## 1. Project Overview & Business Goals
**Dozo Tech 2026** is a B2B lead capture platform targeting independent restaurants. It identifies and quantifies three specific "revenue leaks":
1.  **No-Shows:** ~23% of reservations that don't arrive.
2.  **Invisible Customers:** Lost revenue due to poor online visibility.
3.  **Hidden Money:** Operational inefficiencies.

**Value Proposition:** A free 5-minute AI diagnostic that calculates exact financial losses (e.g., "You are losing €15,000/month"), generating high urgency and capturing high-intent leads.

---

## 2. Technical Stack (Strict)
*   **Framework:** Next.js 14 (App Router)
*   **Language:** TypeScript 5.x (Strict Mode)
*   **Styling:** Tailwind CSS 3.x (Vanilla, no libraries like shadcn/ui)
*   **Database:** Neon (PostgreSQL) + `neondatabase/serverless` driver (Raw SQL)
*   **i18n:** `next-intl` (Routing: `/[locale]/...`)
*   **AI:** Vercel AI SDK + OpenAI GPT-4 Turbo
*   **Validation:** Zod

---

## 3. Project Architecture & Directory Structure
The project follows a **Feature-Sliced Design hybrid with Atomic Design**.

```text
src/
├── app/
│   ├── [locale]/             # Localization Route Group
│   │   ├── (marketing)/      # Landing & Blog
│   │   │   ├── components/   # Page-specific components
│   │   │   └── page.tsx      # Home
│   │   ├── diagnostic/       # AI Chatbot Page
│   │   ├── contact/          # Simple Contact Page
│   │   ├── layout.tsx        # Root Layout per locale
│   │   └── error.tsx
│   └── api/                  # API Routes (Chat Streaming)
├── components/               # Atomic Design Shared Components
│   ├── atoms/                # Buttons, Inputs, Icons
│   ├── molecules/            # Cards, FormFields
│   ├── organisms/            # Header, Footer, LeadForm, ChatInterface
│   └── templates/            # Generic Page Layouts
├── lib/                      # Core Logic
│   ├── db/                   # Database Client & Actions
│   ├── i18n/                 # Translation Config
│   └── blog/                 # MDX Parser & Logic
├── locales/                  # JSON Translation Files (en, es, de)
└── content/
    └── blog/                 # MDX Files (slug.lang.mdx)
```

---

## 4. Internationalization (i18n)
**Strategy:** Sub-path routing (`/es`, `/en`, `/de`) using `next-intl`.

### Configuration (`src/lib/i18n/routing.ts`)
```typescript
import { defineRouting } from 'next-intl/routing';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['es', 'en', 'de'],
  defaultLocale: 'es',
  localePrefix: 'always'
});

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(routing);
```

### Middleware (`src/middleware.ts`)
Matches all paths except API, static assets, and internal Next.js files.
```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(es|en|de)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
```

---

## 5. Database Schema (Neon PostgreSQL)
We use raw SQL with the Neon serverless driver.

### Tables
1.  **`leads`**: Captures user contact info.
2.  **`diagnostics`**: Stores the AI analysis results linked to a lead.

```sql
-- Leads Table
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    restaurant_name VARCHAR(255),
    phone VARCHAR(50),
    locale VARCHAR(5) NOT NULL,
    entry_channel VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Diagnostics Table
CREATE TABLE diagnostics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    pain_primary VARCHAR(50) NOT NULL, -- 'no_show', 'invisible_customers', 'hidden_money'
    estimated_no_show_rate DECIMAL(5,2),
    avg_ticket DECIMAL(10,2),
    monthly_covers INTEGER,
    calculated_monthly_loss DECIMAL(10,2),
    calculated_annual_loss DECIMAL(10,2),
    urgency_level VARCHAR(20) NOT NULL, -- 'low', 'medium', 'high', 'critical'
    fit_score INTEGER NOT NULL, -- 0-100
    conversation_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 6. Core Features Implementation

### A. Lead Capture (Server Actions)
Located in `src/lib/db/actions.ts`. Must use Zod for validation.
- **`createLeadAction`**: Upserts a lead by email. Uses `ON CONFLICT DO UPDATE`.
- **`createDiagnosticAction`**: Inserts a diagnostic record linked to the lead.

### B. AI Diagnostic Chatbot
- **Route:** `src/app/api/chat/route.ts` (Edge Runtime).
- **Logic:**
    1.  System Prompt acts as a consultant identifying the "Main Pain".
    2.  Asks 3-5 quantifying questions (covers, ticket size, etc.).
    3.  Calculates loss in JSON format.
    4.  Outputs `DIAGNOSTIC_COMPLETE: { JSON_DATA }` when finished.
- **Frontend (`src/app/[locale]/diagnostic/page.tsx`):**
    - Uses `useChat` from Vercel AI SDK.
    - Parses the JSON output to show a "Results Dashboard".
    - Calls `createLeadAction` to save data.

### C. Blog System (MDX)
- **Content:** Stored in `content/blog/[slug].[locale].mdx`.
- **Frontmatter:**
    ```yaml
    title: "How No-Shows Cost You €15k/Year"
    slug: "no-show-reservations"
    lang: "en"
    publishedAt: "2026-02-01"
    alternates:
      es: "/es/blog/reservas-no-show"
      de: "/de/blog/reservierung-no-show"
    ```
- **SEO:** Auto-generates `canonical` tags and `hreflang` alternates in `generateMetadata`.

---

## 7. Design System (Tailwind CSS)

### Design Tokens (`tailwind.config.ts`)
- **Primary:** `#0A66C2` (Professional Blue)
- **Accent:** `#F59E0B` (Amber - Opportunity)
- **Danger:** `#DC2626` (Red - Loss/Pain)
- **Success:** `#059669` (Green - Recovery/Solution)
- **Typography:**
    - **Display:** `Outfit` (Modern, geometric)
    - **Body:** `Inter` (Readable)

### UI Principles ("Vanilla Premium")
- **High Contrast:** Dark text on clean white/gray backgrounds.
- **Number-Focused:** Highlight stats and money values.
- **Direct & Urgent:** "You are losing X", "Recover Y".

---

## 8. Implementation Roadmap (12-Day Plan)

### Phase 1: Foundation
1.  Setup Next.js, Tailwind, and `next-intl`.
2.  Create Design Tokens and Atomic Components (Button, Input, Card).

### Phase 2: Landing Page & Marketing
1.  Implement Hero Section (Value Prop).
2.  Implement "Three Pillars" Section (Pain Points Cards).
3.  Basic Lead Capture Form.

### Phase 3: Backend & Database
1.  Setup Neon DB project.
2.  Run SQL Migrations.
3.  Implement Server Actions (`actions.ts`) and DB Client (`client.ts`).

### Phase 4: AI Diagnostic System (Critical)
1.  Build Chat Interface (`useChat`).
2.  Engineer System Prompt for JSON output.
3.  Connect Chat results to DB (Leads + Diagnostics).

### Phase 5: Blog & SEO
1.  Build MDX Parser (`mdx-parser.ts`).
2.  Create content (`content/blog/`).
3.  Implement Dynamic Metadata & Sitemaps.