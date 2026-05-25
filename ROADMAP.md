# ROADMAP — INNTW Grand Opening Reservation Site

> Top-level anchor doc. Read first every session. Captures: **what we're
> building, the phase plan, where we are now, locked stack, working
> rules.** When something visible in this doc no longer matches reality,
> update this doc.

---

## What we're building

A small web booking flow for INNTW's grand opening pop-up. People land
on a teaser/countdown page, pick a 1-hour launch window, fill in their
contact details, and land on a confirmation screen. The event is a
**capacity-limited Trinity Bellwoods pop-up shop on Saturday, June 6,
2026**.

- **Live:** <https://inntw-invite.vercel.app>
- **Source:** <https://github.com/INNTW/inntw-invite>
- **Brand owner:** Shantha (INNTW founder)
- **Design source:** Claude Design (claude.ai/design) handoff bundle —
  see `app/globals.css` heritage in `BUILD_JOURNAL.md`.

---

## Locked stack

- **Framework:** Next.js **16** (App Router, Turbopack dev). Heads-up —
  this is NEWER than most AI training data; see `AGENTS.md` for the
  warning and `node_modules/next/dist/docs/` for the canonical
  references. Don't assume Pages-Router or old App-Router conventions.
- **CSS:** Tailwind v4 (`@import "tailwindcss"` in globals.css) plus
  custom CSS classes. The custom CSS is doing 95% of the heavy lifting —
  Tailwind is mostly Preflight + a couple of utilities. Most named
  classes (`.page`, `.sky`, `.booking-frame`, `.slot-card`, etc.) are
  plain CSS.
- **Language:** TypeScript.
- **Fonts:** Helvetica Neue stack with system fallback. **No web font
  files bundled.**
- **Hosting:** Vercel. Production alias: `inntw-invite.vercel.app`.
- **Repo:** Public GitHub at `INNTW/inntw-invite`.

Do not swap any of the above without confirming with Shantha first.

---

## Routes & scope

| Route | Purpose |
|---|---|
| `/` | Landing — countdown, headline, "Step Into The Dream" CTA, meta info. |
| `/reserve` | Slot picker — 5 cards (1 PM–6 PM, 1-hr windows), 1 PM auto-selected, confirm-time button. |
| `/reserve/details` | Contact form (first, last, email, phone) + mandatory event-emails consent + 2 opt-in checkboxes + free-pin promo. |
| `/reserve/confirmed` | "You're in." — locked time summary, What Happens Next 3-step rail, What To Expect card, Add to Calendar / Copy Details buttons. |

No actual database, no real email, no payment. **All "submit" flows are
client-side state passing data through URL params.** This is by design
(per Shantha's brief) until a back-end is wired up later.

---

## Phase plan

| # | Phase | Status | Completed |
|---|---|---|---|
| 0 | Initial Next.js scaffold + 3 mockup-based pages | ✅ | 2026-05-24 |
| 1 | Implement Claude Design handoff (cobalt / cream / Helvetica) | ✅ | 2026-05-24 |
| 2 | Iterative content + layout polish with Shantha | ✅ | 2026-05-25 |
| 3 | First Vercel deploy + custom alias | ✅ | 2026-05-25 |
| 4 | GitHub publish + STYLE_HANDOFF.md for co-developer | ✅ | 2026-05-25 |
| 5 | **Pre-event maintenance / iteration** | 🚧 | — |
| 6 | Wire up a real backend (reservations DB, emails) | ⬜ | — |
| 7 | Event day live ops | ⬜ | 2026-06-06 (target) |
| 8 | Post-event archive / takedown decision | ⬜ | — |

Phases 6–7 are scoped here as placeholders. Shantha hasn't asked for
backend work yet; the brief explicitly said *"no databases, no real
email"* during build. **Don't start phase 6 work without explicit
direction.**

---

## Working rules

These are cross-phase rules Shantha has established. Add to this list
when a new one shows up — they survive across sessions.

- **Mobile-first for spacing decisions.** When Shantha says "this is for
  mobile," scope the change to the relevant breakpoint. Don't change
  desktop unless asked.
- **Verify with screenshot.** After spacing/layout changes, take a
  preview screenshot at both mobile (390×844) and desktop (1440×900)
  before declaring done. Zero-overflow is the bar on desktop.
- **One-line constraints matter.** "Reserve Your Spot" and the
  IF NOT NOW headline must always fit on one line per their breakpoint
  — uses `white-space: nowrap` plus a tuned `clamp()` font size.
- **No real persistence.** Form submits just navigate via URL params.
  Don't add backend calls without scope.
- **Vercel deploy after every visible change.** Shantha sees the live
  site, not the local dev. After every batch of changes that ship a UX
  delta, run `vercel deploy --prod --yes --scope inntw` and tell
  Shantha the URL has updated.
- **Hard-refresh note.** When deploying CSS changes, the edge cache can
  hold for 10–30s. Always mention "hard-refresh (⌘⇧R) if you still see
  the old layout."

---

## Pointers to spec files

- **`PLAN.md`** — Architecture, route map, component breakdown, design
  tokens. Read this when touching component boundaries or adding new
  pages.
- **`STYLE_HANDOFF.md`** — External-facing doc, written for Shantha's
  co-developer to implement the same styling in his codebase. Keep this
  current if the design system changes meaningfully.
- **`AGENTS.md`** — Next.js 16 breaking-change warning. Honour it.
- **`app/globals.css`** — The full design system. 1,342 lines. Source
  of truth for visual styling.

---

## Completion log

- **2026-05-25** — STYLE_HANDOFF.md authored and pushed for co-developer
  (commit `fc841e6`). GitHub repo public at `INNTW/inntw-invite`.
- **2026-05-25** — First GitHub commit + push (commit `32bcb18`).
- **2026-05-25** — Production alias `inntw-invite.vercel.app` confirmed.
- **2026-05-24** — Initial Vercel deploy. Site goes live.
- **2026-05-24** — Design handoff implementation lands (cobalt + cream
  brand, Helvetica Neue, slot-card grid, booking shell, confirmation
  screen).
- **2026-05-24** — Project scaffolded from `create-next-app` (Next.js
  16, Tailwind v4, App Router, TypeScript).
