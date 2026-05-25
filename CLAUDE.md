@AGENTS.md

# CLAUDE.md — INNTW Grand Opening Reservation Site

> Session boot instructions + permanent warnings. Read after ROADMAP.md
> at session start. Update when a new gotcha/decision is discovered that
> should survive indefinitely.

---

## Project identity

- **What:** Single-page-ish web booking flow for INNTW's grand opening.
  Frontend only. Next.js 16 App Router on Vercel.
- **Who:** Shantha (INNTW founder) is the brand owner and decision-maker.
  All copy + visual decisions go through him.
- **State:** Phase 5 — pre-event maintenance / content iteration. The
  initial build is shipped and live. Future work is content tweaks,
  potentially a real backend, then event-day ops.
- **Live:** <https://inntw-invite.vercel.app>
- **Repo:** <https://github.com/INNTW/inntw-invite>

---

## Common mistakes (corrections from Shantha — don't repeat)

These are explicit corrections Shantha has made. Each one cost a
correction cycle. Don't repeat them.

- **Button label is "Reserve Your Spot" — not "Reserve Launch Time".**
  The submit button on `/reserve/details` was changed from launch-time
  to your-spot. Same name as the page title is intentional.
- **Confirmation eyebrow is "YOU STEP INTO THE DREAM AT" — not "YOUR
  LAUNCH WINDOW".** The label above the time on `/reserve/confirmed`.
  Reflects the brand voice.
- **Default slot is 1:00 PM, not 4:00 PM.** Both `app/reserve/page.tsx`
  state default AND `findSlot()` fallback in `app/lib/slots.ts`.
- **"This is a small pop up shop to launch the brand. Due to capacity
  limits, you'll pick a time to come in."** Exact copy for the landing
  meta blurb. Don't paraphrase.
- **Date is Saturday, June 6, 2026.** Shown as "Saturday, June 6" in
  most places, "JUNE 6TH, 2026" in the landing date row. Don't shorten
  to "June 6th" elsewhere — match the existing string.
- **Don't use `<br />` in flowing text.** Shantha specifically called
  out "The Grand Opening" splitting awkwardly because of a manual `<br />`
  in the subtitle. Let text wrap naturally and tune via container
  width / font size instead.
- **"Both checkboxes" — not "the below" or "on the left".** The pin
  offer note has to work for mobile (stacked) AND desktop (horizontal).
  Direction-agnostic wording only.
- **Logo lives in the page header only.** Confirmation page used to have
  a second logo stamp in the aside; that was removed because it
  duplicated the header. Don't reintroduce it.

---

## Technical gotchas

### Next.js 16 / Turbopack
- **CSS bundle can go stale.** When CSS edits don't appear in the
  preview server, the fix is: stop the dev server, `rm -rf .next`,
  restart. Not just a hot reload. Happened multiple times with
  significant CSS additions.
- **AGENTS.md warns** that Next.js 16 has breaking changes from older
  versions. Read `node_modules/next/dist/docs/` before assuming any
  Next.js API works the way training data suggests.

### Layout / CSS gotchas
- **`max-width` on a flex column item needs `align-self: flex-start`.**
  Otherwise the item stretches the cross axis and max-width is ignored.
  This bit us when constraining `.landing-main` to 75% width on mobile.
- **`white-space: nowrap` + tuned `clamp()` font size is the pattern
  for one-line hero text.** Both `IF NOT NOW THEN WHEN` and "Reserve
  Your Spot" use it. The `vw` rate is calibrated to ~6em width for the
  longer of the two lines; bumping it higher causes the line to wrap
  before the explicit `<br />`.
- **Auto margins distribute slack between elements.** In a flex column,
  putting `margin-top: auto` on two children splits the remaining space
  50/50 between them. This is how the landing page puts breathing room
  ABOVE and BELOW the CTA on tall mobile viewports — `.cta-primary`
  and `.landing-meta` both have `margin-top: auto`.
- **Mobile booking-frame reorders.** On `/reserve` mobile, slot cards
  move to the top and confirm-time button to the bottom using CSS
  `order:` on the grid children. Aside contents are also reordered via
  `order:` so the primary action sits at the bottom of the page where
  the thumb expects it.
- **Logo asset is black-on-transparent.** Rendered white via
  `filter: invert(1) brightness(2)` in `.logo-stamp`. The favicon at
  `app/icon.png` has the inversion + cobalt background baked in (was
  generated with ffmpeg `lutrgb` + overlay; see BUILD_JOURNAL for the
  exact command).

### Metadata gotchas
- **`metadataBase` must be set** in `app/layout.tsx` for relative
  Open Graph image paths to resolve when social media scrapers fetch
  the page. Currently pinned to `https://inntw-invite.vercel.app`.
- **Edge cache holds ~10–30s after each Vercel deploy.** Always tell
  Shantha to hard-refresh (⌘⇧R) if the old layout shows.

---

## Key architecture decisions

These shape how future sessions should think about the system.

- **No backend.** The brief is explicit: no databases, no real emails,
  no payments. Form submits are client-side only and pass data via URL
  params. If a backend is asked for, treat it as a new phase (see
  ROADMAP phase 6) and confirm scope first.
- **CSS classes are the styling primitive, not Tailwind utilities.**
  Despite `@import "tailwindcss"`, almost all visual styling lives in
  named CSS classes in `globals.css`. When adding styles, follow this
  pattern — don't sprinkle Tailwind utilities in JSX. Easier for
  Shantha's co-developer to port and matches the design-handoff source.
- **Desktop + mobile are designed independently.** Don't naively
  mirror desktop classes to mobile. Mobile gets its own paddings,
  font sizes, and sometimes element reordering. The `@media
  (max-width: 720px)` and `@media (max-width: 1080px)` blocks at the
  bottom of globals.css are where mobile/tablet-specific rules live.
- **The "sky glow" is the brand identifier.** The cobalt linear
  gradient + 3 radial ellipses with `mix-blend-mode: screen` is the
  most recognisable visual element. Every page uses `<PageCanvas>` to
  apply it. Don't remove or replace without explicit go-ahead.
- **Logo is consistent in the header across all routes.** Landing's
  `.top-bar` and booking pages' `.booking-top` use the same layout
  (logo, brand text, countdown). The booking pages add "— Reservation"
  to the brand text as the only delta. Don't drift this.

---

## Reading order for new sessions

1. **`ROADMAP.md`** — Where we are in the phase plan, what's next.
2. **`BUILD_STATE.md`** — Live snapshot, last-updated timestamp.
3. **`BUILD_JOURNAL.md`** — Last 5–10 entries to see recent context.
4. **This file (`CLAUDE.md`)** — Gotchas + decisions to keep in mind.
5. **`PLAN.md`** — Only if today's work touches architecture / new
   routes / new components.
6. **`AGENTS.md`** — Reminder about Next.js 16 conventions before
   writing any Next-specific code.
7. **`STYLE_HANDOFF.md`** — Skim if today's work is design-system
   related, since changes here affect what we tell the co-developer.

After reading, state orientation to Shantha: phase, last completed
work, what's queued, and any gotchas relevant to today's task.
