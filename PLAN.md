# PLAN.md — Architecture & Design

> Read this when touching component boundaries, adding new routes, or
> changing the design system. Update when a new architectural pattern is
> established.

---

## Stack

- **Framework:** Next.js 16 App Router (Turbopack dev)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind v4 (`@import "tailwindcss"`) + custom CSS classes (95% custom)
- **Type:** Helvetica Neue stack (system fallback only — no web fonts)
- **Hosting:** Vercel static + edge
- **State:** Client-only (`useState`), no global store. Cross-route data flow via URL search params.

---

## Route map

```
app/
├── layout.tsx               → Root layout, html/body, metadata + OG tags
├── page.tsx                 → /              Landing (server component)
├── globals.css              → Design system + all component styles
├── icon.png                 → Favicon (Next.js convention, white logo on cobalt)
└── reserve/
    ├── page.tsx             → /reserve              Slot picker (client)
    ├── details/page.tsx     → /reserve/details      Form (client)
    └── confirmed/page.tsx   → /reserve/confirmed    Confirmation (client)
```

All booking pages are client components because of form state /
URL-param reading. Landing is a server component (the only client bit
is `<Countdown />`, isolated).

### Data flow between routes

1. `/` — no state. Click CTA → `/reserve`.
2. `/reserve` — local `selectedId` state (default `"1pm"`). Click
   Confirm Time → `/reserve/details?slot=<id>`.
3. `/reserve/details` — reads `?slot=`, owns form state. Submit →
   `/reserve/confirmed?slot=<id>&first=<>&last=<>&email=<>`.
4. `/reserve/confirmed` — reads params, displays summary.

URL params are the only "persistence" layer. Refresh on `/details` or
`/confirmed` re-reads from URL. **No localStorage. No cookies. No
backend.**

---

## Component breakdown

### Shared (used on multiple pages)
- **`<PageCanvas>`** — Cobalt linear gradient + sky-overlay wrapper.
  Every page is `<PageCanvas>{...}</PageCanvas>`.
- **`<Logo>`** — `<img>` of the brand stamp, rendered white via CSS
  filter. Default 64px, sized down to 40px in booking header. Has an
  `asLink` prop (default true) so it can be used inside other links.
- **`<Countdown>`** — Client component. Ticks every second to
  `2026-06-06T12:00:00-04:00`. Server-renders with `null` state to
  avoid hydration mismatch; first effect syncs to client clock.
- **`<BookingShell>`** — Header (logo + brand + countdown) + title +
  subtitle slot + frame container. Used by `/reserve`, `/details`,
  `/confirmed`.
- **Icons (`<ArrowRight>`, `<ArrowLeft>`, `<ClockIcon>`, `<PinIcon>`,
  `<CalendarIcon>`, `<CheckIcon>`)** — Inline SVGs in `icons.tsx`.

### Page-local components
- **`<SlotCard>`** (in `app/reserve/page.tsx`) — Card with time
  label, progress bar, "X SPOTS LEFT" / "Y TOTAL" meta, radio
  indicator. Selected variant paints cream with cobalt accents.
- **`<Field>`** (in `app/reserve/details/page.tsx`) — Label + cream
  input. Wraps `<input>` with the right autocomplete + a11y bits.
- **`<CheckRow>`** (in `app/reserve/details/page.tsx`) — Custom
  checkbox row. Renders a `<button>` with custom `.check-box` span.
  Native input is sr-only.

### What's NOT a component (intentional)
- The pin-promo card — inlined in `/reserve/details` because it's
  one-off.
- The 3-step "What Happens Next" rail — inlined in `/reserve/confirmed`.
  Static content, no reuse value.
- Slot data is in `app/lib/slots.ts` (`SLOTS[]` array) — a constants
  module, not a component.

---

## Design tokens (source of truth in `globals.css`)

### Colors
| Token | Hex | Usage |
|---|---|---|
| `--c-cobalt` | `#024FDA` | Primary brand — page bg, accents on cream surfaces |
| `--c-warm-neutral` | `#DAD3C8` | Cream — CTAs, form inputs, hero type, selected card |
| `--c-warm-200` | `#C9C0B2` | Cream hover |
| `--c-warm-50` | `#F4F0EA` | Cream focused/active |
| `--c-brown-300` | `#B89486` | Cream pressed |
| `--c-ink-900` | `#0A0A0A` | Black text on cream |

### Type stack
```css
--font-sans: "Helvetica Neue", "Helvetica", "Arial", "Liberation Sans", sans-serif;
```

### Spacing
- Page gutter: `clamp(20px, 4vw, 64px)`
- Booking frame padding: `28px 32px 32px` (desktop) / `32px` all sides (mobile)
- Card padding: ~22px

### Motion
- Standard easing: `cubic-bezier(0.22, 0.61, 0.36, 1)` (`--ease-out`)
- Standard duration: `220ms` (`--dur-base`)
- Faster (hover etc): `140ms` (`--dur-fast`)

### Breakpoints
| Width | What changes |
|---|---|
| `≤1080px` | Booking frame stacks 1-col. Slot picker reorders (cards first). |
| `≤720px` | "Mobile". Header centers. Headline + title font scale down. Content column max-width: 75%. |

---

## Key design patterns

### The cobalt + sky-glow canvas
The signature visual. Cobalt linear gradient with 3 radial ellipses
overlaid in `mix-blend-mode: screen` for a soft glow on the right side.
Implemented as 2 stacked divs: `.page` (gradient bg) + absolute
`.sky` (overlay). Every route uses `<PageCanvas>`.

### Logo as filtered PNG
Source asset is black-on-transparent. CSS does the inversion: `filter:
invert(1) brightness(2)`. No SVG, no Figma export. Same PNG used as the
favicon source (with cobalt baked in via ffmpeg — see BUILD_JOURNAL
2026-05-25 13:42 entry for the exact command).

### One-line hero text
Both `IF NOT NOW THEN WHEN` and "Reserve Your Spot" use
`white-space: nowrap` plus a tuned `clamp()` font size. The `vw` rate
is calibrated to ~6em width for the longer line. Mobile gets its own
override because the 75% content-column max-width is narrower.

### Auto-margin slack distribution
Multi-element flex columns use `margin-top: auto` on two children to
split the remaining viewport space 50/50 between them. Used on the
landing page so the CTA gets equal breathing room above and below on
tall phones, collapsing to zero on short phones.

### Cream-painted selected state
The slot picker uses a 2-state visual: unselected = transparent
cobalt-bordered card, selected = solid cream with cobalt radio and
cobalt-filled progress bar. The whole card flips colors, including the
SPOTS LEFT meta text which transitions from white-on-cobalt to
near-black-on-cream.

### Mobile reordering via CSS `order`
On the slot picker mobile breakpoint (`≤1080px`), the booking-frame
children are reordered:
- `.slot-grid { order: -1 }` puts cards first
- Aside children get explicit `order:` so the Confirm Time button sits
  at the bottom of the page where the thumb expects it

### Mobile-only / desktop-only patterns
Currently used minimally. The pattern (if needed): apply a modifier
class on the inline copy + a wrapping class on the duplicate, then
toggle `display:` in the media query. Used briefly for the cards on
`/details` but later removed when those cards relocated to
`/confirmed`.

---

## Metadata

`app/layout.tsx` sets:
- `metadataBase`: `https://inntw-invite.vercel.app` (required for
  relative OG image paths to resolve correctly when social scrapers
  fetch the page).
- `title`: `"If Not Now Then When Grand Opening"` — used by `<title>`
  AND `og:title` AND `twitter:title`.
- `description`: brand-voice one-liner mentioning the date + location.
- `openGraph.images` and `twitter.images`: both point at `/icon.png`
  (the cobalt favicon).

---

## What's NOT in the architecture (yet)

These are deliberately absent. If a future session is asked to add any
of them, treat it as scope expansion and confirm with Shantha.

- **No database.** Reservations don't persist anywhere. URL params
  carry state across pages but disappear on a fresh visit.
- **No real email.** No transactional email service wired up. The
  "send me emails" checkboxes don't subscribe to anything.
- **No SMS.** Same as above.
- **No analytics.** No PostHog, Plausible, Google Analytics, Vercel
  Analytics, etc.
- **No authentication.** No login. Open access.
- **No A/B testing.** No feature flags.
- **No CMS.** Copy is hardcoded in the TSX/CSS.

These are listed so a future session doesn't accidentally answer "is
there X?" with hallucinated yes.

---

## Open questions / TBD

- **Custom domain.** Should the site be at `rsvp.inntw.studio` or
  similar? Not requested yet. Currently `inntw-invite.vercel.app`.
- **Backend wiring.** Phase 6 in ROADMAP. Likely path: Vercel KV or
  Neon Postgres + a server action on `/details` submit. No timeline.
- **Email delivery.** When backend lands, will need a transactional
  email service (Resend, Postmark, etc.) for the confirmation email
  the user is promised.
- **Capacity enforcement.** "20 spots per window" is currently
  decorative. Real backend would need to enforce + decrement.
