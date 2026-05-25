# BUILD_JOURNAL.md — Append-only decision log

> One entry per meaningful change. Include root cause, files changed,
> rationale. Use `printf '\n## YYYY-MM-DD HH:MM ...' >> BUILD_JOURNAL.md`
> to append. Don't rewrite past entries.

---

## 2026-05-25 16:47 | Phase 5, Optimus init | Context protection files seeded

Shantha asked to activate the Optimus context-guard skill. Created the
five canonical docs at repo root: `ROADMAP.md`, `CLAUDE.md` (replacing
the one-line `@AGENTS.md` stub), `BUILD_STATE.md`, this file
(`BUILD_JOURNAL.md`), and `PLAN.md`.

The existing `AGENTS.md` (Next.js 16 breaking-change warning) is
preserved and now imported via the first line of `CLAUDE.md`.

Files: `ROADMAP.md`, `CLAUDE.md`, `BUILD_STATE.md`, `BUILD_JOURNAL.md`,
`PLAN.md` (all new at repo root).

---

## 2026-05-25 16:44 | Phase 4 | STYLE_HANDOFF.md authored for co-developer

Shantha wants to send the styling to his co-developer who's building a
separate site that needs the same look. Authored `STYLE_HANDOFF.md` —
single doc that lists design tokens, the cobalt + sky-glow recipe, type
scale, button/form patterns, layout grids, responsive breakpoints, logo
rendering, Tailwind dependency notes, and a page-by-page reading order.

Committed as `fc841e6`. Pushed to GitHub.

Files: `STYLE_HANDOFF.md` (new).

---

## 2026-05-25 16:26 | Phase 4 | GitHub repo created at INNTW/inntw-invite

Shantha asked to publish to GitHub for the co-developer. Discovered the
project had never been `git init`'d — the `git remote -v` output was
leaking from the home directory's `~/.git`. Initialised a fresh repo at
the project root, committed all 31 source files (gitignore already
covered `node_modules`, `.next`, `.vercel`, `.env*`), and pushed via
`gh repo create INNTW/inntw-invite --public --source=. --push`.

Auth confirmed under INNTW GitHub account (repo + workflow scopes
present). Commit: `32bcb18`.

Files: `.git/` (new).

---

## 2026-05-25 16:14 | Phase 2 | Address Access removed; What To Expect moved to confirmation

Shantha: "remove the address access section altogether and put the what
to expect section in the confirmation page".

Removed both the desktop-aside instance and the mobile-trailing
duplicate of both cards from `/reserve/details`. Removed the
`aside-extras` trailing block entirely. Added "What To Expect" card to
`/reserve/confirmed` aside (below the time block).

Also removed the duplicate logo from the confirmation aside —
Shantha noted it duplicated the header logo. Just `● CONFIRMED` badge
remains.

Files: `app/reserve/details/page.tsx`, `app/reserve/confirmed/page.tsx`.

---

## 2026-05-25 16:00 | Phase 2 | Mobile: aside cards moved below submit button

Shantha: "put the address access and what to expect under the reserve
your spot button" (mobile only).

First attempt: duplicate-and-hide approach. Cards exist twice in DOM
(once inside aside with `.aside-card--desktop`, once after the form as
`.aside-extras`). Each visibility is media-query toggled at 1080px.

(Superseded later same session — cards removed entirely.)

Files: `app/reserve/details/page.tsx`, `app/globals.css`.

---

## 2026-05-25 15:50 | Phase 2 | Header unified; countdown added to booking pages

Shantha: "Keep that header consistent throughout all the pages. ...
We can keep the countdown there." Also: "left-align it to 'days
countdown'."

Changed `.countdown { align-items: flex-end }` → `flex-start` globally
so the "DOORS OPEN IN" eyebrow sits flush with the first countdown
column ("11 DAYS"). Replaced the "Doors Open · Sat Jun 6 · Trinity
Bellwoods" text on booking pages with `<Countdown />` so all four pages
have an identical header (only "— Reservation" added to brand text on
booking).

Mobile booking-top rewritten to mirror landing mobile: logo centered,
brand hidden, countdown row centered full-width below divider. Removed
the old `≡` hamburger pseudo-element (was never functional).

Files: `app/components/ReserveShell.tsx`, `app/globals.css`.

---

## 2026-05-25 15:25 | Phase 2 | Slot picker reordered for mobile, default = 1 PM

Shantha: on mobile, cards on top, confirm-time button at the bottom.
And: default slot should be 1:00 PM.

Changed `useState("4pm")` → `useState("1pm")` in `/reserve` page.
`findSlot()` fallback in `lib/slots.ts` changed from `SLOTS[3]` →
`SLOTS[0]`.

CSS at `max-width: 1080px`: `.slot-grid { order: -1 }` puts cards
first. Aside children get explicit `order:` values so confirm-time
sits at the bottom of the aside block (below About This Room +
Selected Time + Date).

Files: `app/reserve/page.tsx`, `app/lib/slots.ts`, `app/globals.css`.

---

## 2026-05-25 15:00 | Phase 2 | Pin promo + opt-ins unified into one bordered container

Shantha: pin promo's border/background should also wrap the two opt-in
checkboxes so all three read as one element.

Moved the border + `rgba(255,255,255,0.04)` background from
`.pin-offer` up to `.opt-grid` (the new wrapper). Pin offer becomes a
plain inner grid (image + note, no border). Desktop: 2 columns
(checkboxes left, pin right). Mobile: stacks vertically.

Image had cobalt baked in from Shantha's new PNG, so removed the
cream halo + radius from `.pin-offer__image`.

Files: `app/reserve/details/page.tsx`, `app/globals.css`,
`public/assets/pins.png`.

---

## 2026-05-25 14:30 | Phase 2 | Mandatory consent now toggleable; disables submit when off

Shantha: "It is mandatory: if they uncheck it, the reserve launch time
will not be able to be clicked. ... They should still be able to
uncheck the box."

Removed `LockedCheckRow` component. Mandatory event-emails consent now
uses the standard `CheckRow` with state. Default `consentEmails: true`.
Added `&& form.consentEmails` to the `valid` flag so unchecking
disables the submit button. Verified via DOM eval: unchecked →
`submit.disabled = true`, re-checked → enabled.

Files: `app/reserve/details/page.tsx`.

---

## 2026-05-25 14:00 | Phase 2 | Pin promo card added to /reserve/details

Shantha: pin image + checkbox structure for the free-pin promo.
Mandatory event-emails checkbox first (`Send me emails related to this
event (including address and details)`), then bordered card with pin
image + note, then 2 optional opt-ins.

Pin PNG from Downloads — 1920×1920 4.9 MB original, resized to 600px
via `sips -Z 600` → 469 KB. Stored at `public/assets/pins.png`. Both
optional opt-ins default `true` (auto-checked per Shantha).

Files: `app/reserve/details/page.tsx`, `app/globals.css`,
`public/assets/pins.png`.

---

## 2026-05-25 13:00 | Phase 2 | Slot cards bumped ~25% larger on desktop; mobile title fits

Shantha: cards bigger by ~25%, and "Reserve Your Spot" overflowing on
mobile.

Slot cards: padding `16/18px → 22px`, gap `10 → 14`, label
`clamp(15–19) → clamp(18–24)`, meta `10 → 12px`, radio `18 → 22px`,
grid gap `14 → 18px`.

Mobile booking-title was capped at `clamp(40px, 12vw, 64px)`, still
overflowing at 390px. Reduced to `clamp(28px, 8.6vw, 44px)` so
"Reserve Your Spot" fits on one line down to ~320px-wide phones.
Removed manual `<br />` from booking subtitles in `/reserve` and
`/reserve/details` so "details for your booking" stays together on
the same line.

Files: `app/reserve/page.tsx`, `app/reserve/details/page.tsx`,
`app/globals.css`.

---

## 2026-05-25 12:30 | Phase 2 | Booking pages tightened to fit one viewport on desktop

Shantha: footer gone everywhere; title + header one line; fit on one
page no scroll.

Removed `<footer className="booking-foot">` from BookingShell.
`booking-title` capped at `clamp(40px, 5.4vw, 72px)` with
`white-space: nowrap` so it always fits one line. Dropped
`booking-head max-width: 920px` (was forcing the title to wrap).
Header brand + doors info given `white-space: nowrap`.

Slot grid switched from 2-col → 3-col so 5 cards fit in 3+2 instead
of 2+2+1, saving a row of height. Frame padding `56/64px → 28/32px`.
Selected-time `64px → 52px`. Confirmation page: stamp logo
`88 → 60px`, "Thank you for picking a time" `36 → 26px`, conf-foot
quote row removed entirely.

All three booking pages now fit 1440×900 with `overflow: 0`.

Files: `app/components/ReserveShell.tsx`, `app/globals.css`,
`app/reserve/confirmed/page.tsx`.

---

## 2026-05-25 12:00 | Phase 2 | Landing fits one screen; lock-in caption grouped with CTA

Shantha: tighter spacing, no footer on landing, group "Lock in your
time slot" with the CTA above (no auto-gap between them), pin meta
block to bottom.

Removed landing footer. `.landing-main` is `flex: 1` column with
`justify-content: flex-start`. Pulled "Lock in your time slot" out of
`.landing-meta` into a new `.cta-caption` element that sits immediately
under the CTA. `.cta-primary` and `.landing-meta` both get
`margin-top: auto` to split the remaining slack 50/50 — gives
breathing room ABOVE and BELOW the CTA on tall phones, collapses
cleanly on short ones.

Added the calendar + date row (`📅 JUNE 6TH, 2026`) at the very
bottom of the landing meta block. New `CalendarIcon` in
`components/icons.tsx`.

Files: `app/page.tsx`, `app/components/icons.tsx`, `app/globals.css`.

---

## 2026-05-25 11:30 | Phase 2 | "IF NOT NOW THEN WHEN" forced to 2 lines via nowrap

Shantha: 4-line wrap on narrow viewports is wrong; should be 2 lines
matching the design.

The headline had explicit `<br />` between "NOW" and "WHEN" but the
`clamp(72px, 12.2vw, 184px)` font size was too large for "IF NOT NOW"
to fit one row on viewports under ~1300px. Each line wrapped to 2
visual lines = 4 total.

Fix: `white-space: nowrap` so each `<br />`-separated line stays one
row, plus reduced vw rate to `clamp(64px, 10.4vw, 184px)` so the line
width fits inside `.landing-main`'s 1100px max-width container.
Mobile: `clamp(34px, 10.4vw, 60px)` after Shantha asked for the column
narrower (75% max-width).

Files: `app/globals.css`.

---

## 2026-05-24 23:38 | Phase 1 | Design handoff implemented end-to-end

Fetched the handoff bundle from
`api.anthropic.com/v1/design/h/dGaLuTfRtAb7Oh8ROLVHmw` (13 MB
gzipped tar). Read `README.md`, chat transcript, and `index.html` +
`styles.css` + `design-tokens.css` + `app.jsx` from
`inntw-landing-page/project/`.

Replaced my earlier mockup-based approximation with the actual
design tokens:
- Cobalt `#024FDA` (was my brighter `#1947E5`)
- Warm-neutral `#DAD3C8` (was my `#F2EBD8`)
- Helvetica Neue stack (was Inter + Anton)
- Sky glow via 3 radial-gradient ellipses with `mix-blend-mode: screen`
- Logo PNG from `assets/` copied to `public/assets/` and rendered
  white via `filter: invert(1) brightness(2)`

Added the confirmation page (designed from scratch by the design
assistant — was not in the original mockups). 3-step "What Happens
Next" rail + reservation code + Add to Calendar / Copy Details
buttons. Quote at bottom: *"If not now, then when. — On the door"*
(later removed when tightening to fit one viewport).

Files: ALL — full rewrite of `globals.css`, `layout.tsx`, `page.tsx`;
new `app/reserve/`, `app/reserve/details/`, `app/reserve/confirmed/`;
new `app/components/{Logo,Countdown,ReserveShell,PageCanvas,icons}.tsx`;
new `app/lib/slots.ts`; copied `public/assets/logo-stamp-black.png`.

---

## 2026-05-24 23:13 | Phase 0 | Project scaffolded

`npx create-next-app@latest inntw-invite --typescript --tailwind
--app --no-src-dir --import-alias "@/*" --use-npm --eslint --turbopack
--yes`. Created at `/Users/tdesilva/Projects/inntw invite/inntw-invite/`.

Next 16.2.6 + React 18.3.1 + Tailwind v4 + Turbopack.

Files: scaffolded by create-next-app.
