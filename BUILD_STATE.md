# BUILD_STATE.md — Live snapshot

> Updated after every completed task. Checkbox state, file table, and
> "What's Next" must reflect reality.

**Last Updated:** 2026-05-25 16:47
**Current Phase:** 5 — Pre-event maintenance / content iteration
**Last Deploy:** 2026-05-25 — `inntw-invite-j6gk6fy0s-inntw.vercel.app` (aliased to `inntw-invite.vercel.app`)

---

## What's done

### Build (Phases 0–4)
- [x] **Phase 0** — Next.js 16 scaffold via `create-next-app` (TS, Tailwind v4, App Router, no src dir).
- [x] **Phase 1** — Claude Design handoff fetched and implemented end-to-end.
  - [x] Cobalt (#024FDA) + warm-neutral (#DAD3C8) design tokens
  - [x] Page canvas + sky glow (`.page`, `.sky`)
  - [x] Helvetica Neue stack with system fallback
  - [x] Logo PNG rendered white via CSS filter
  - [x] Countdown component (live tick to June 6, 2026)
  - [x] Booking shell with consistent header across all booking pages
- [x] **Phase 2** — Iterative polish with Shantha.
  - [x] Landing: 2-line headline, paragraph block grouped, breathing room around CTA
  - [x] Landing mobile: centered header, narrower content column (75% max-width)
  - [x] Slot picker: 3-up card grid, cards 25% larger, default 1 PM auto-selected
  - [x] Slot picker mobile: cards first, confirm-time at bottom via CSS order
  - [x] Details form: 4 fields, mandatory consent + 2 opt-ins + pin promo card
  - [x] Details: cards moved off the page; What To Expect relocated to confirmation
  - [x] Confirmation: title "You're in.", 3-step rail, calendar/copy buttons, What To Expect aside
  - [x] Header unified — countdown on right (left-aligned eyebrow), brand suffix " — Reservation" on booking pages
  - [x] Footers removed from all pages
- [x] **Phase 3** — First deploy to Vercel (`vercel deploy --prod --scope inntw`).
- [x] **Phase 4** — GitHub repo at `INNTW/inntw-invite` + STYLE_HANDOFF.md authored.

### Polish details that took multiple iterations (see BUILD_JOURNAL)
- [x] "Reserve Your Spot" — single line constraint on title, mobile font sized to fit
- [x] "IF NOT NOW / THEN WHEN" — `white-space: nowrap` + tuned `clamp()`
- [x] "Lock in your time slot" — moved to sit tight under CTA (not in meta block)
- [x] "Trinity Bellwoods, Toronto" + "June 6th, 2026" — at bottom of landing
- [x] Pin offer + opt-in checkboxes wrapped in one bordered container
- [x] Favicon — white logo on cobalt 512×512 (ffmpeg-generated)
- [x] Open Graph metadata — title "If Not Now Then When Grand Opening"

---

## What's next

**No pending requests as of timestamp above.** Shantha just asked for
the Optimus context-protection files (this commit). Awaiting next
direction.

Plausible next-up items, in order of likelihood:
1. More copy / spacing tweaks based on Shantha viewing the live site.
2. Co-developer's questions feeding back through Shantha — needs
   STYLE_HANDOFF.md to stay accurate.
3. Backend wiring (Phase 6) — only if Shantha explicitly asks.
4. Domain alias (e.g. `rsvp.inntw.studio`) — not requested yet.

---

## Files inventory

### App routes
| File | Purpose |
|---|---|
| `app/layout.tsx` | Root layout, metadata (title, OG, Twitter, icons). |
| `app/page.tsx` | Landing page — countdown + headline + CTA + meta. |
| `app/reserve/page.tsx` | Slot picker, default selection = "1pm". |
| `app/reserve/details/page.tsx` | Contact form + mandatory consent + opt-ins + pin promo. |
| `app/reserve/confirmed/page.tsx` | "You're in." + What Happens Next + What To Expect + actions. |
| `app/globals.css` | **Entire design system. 1,342 lines.** Source of truth for styling. |
| `app/icon.png` | Favicon (Next.js convention) — white logo on cobalt 512×512. |

### Components
| File | Purpose |
|---|---|
| `app/components/PageCanvas.tsx` | Cobalt-gradient + sky-overlay wrapper used on every page. |
| `app/components/Logo.tsx` | INNTW stamp logo rendered as `<img>` with CSS-filter invert. |
| `app/components/Countdown.tsx` | Client component, ticks every second to June 6 2026 noon ET. |
| `app/components/ReserveShell.tsx` | Booking-page header (logo + brand + countdown) + title/subtitle slot. |
| `app/components/icons.tsx` | Inline SVG icons (ArrowRight, ArrowLeft, ClockIcon, PinIcon, CalendarIcon, CheckIcon). |

### Data / libs
| File | Purpose |
|---|---|
| `app/lib/slots.ts` | `SLOTS[]` data (5 1-hour windows, 1 PM–6 PM), `findSlot()` helper with default = SLOTS[0]. |

### Assets
| File | Purpose |
|---|---|
| `public/assets/logo-stamp-black.png` | Source logo, black on transparent. |
| `public/assets/pins.png` | Photo of the 3 INNTW enamel pins on cobalt — used in the pin-offer card. |

### Project docs (Optimus + handoff)
| File | Purpose |
|---|---|
| `ROADMAP.md` | Phase plan + locked stack + working rules + completion log. **Read first every session.** |
| `CLAUDE.md` | Session boot instructions + common mistakes + technical gotchas + architecture decisions. |
| `BUILD_STATE.md` | This file. Live snapshot. |
| `BUILD_JOURNAL.md` | Append-only decision log. |
| `PLAN.md` | Architecture and component breakdown. |
| `AGENTS.md` | Next.js 16 breaking-change warning. |
| `STYLE_HANDOFF.md` | External-facing doc for Shantha's co-developer to implement the styling in his codebase. |
| `README.md` | Default `create-next-app` README. Not maintained — relevant info lives in the docs above. |

### Config
| File | Purpose |
|---|---|
| `package.json` | Next 16, React 18.3, Tailwind v4 deps. |
| `next.config.ts` | Default — no customization. |
| `tsconfig.json` | Default Next.js TS config. |
| `eslint.config.mjs` | Default Next.js + Tailwind ESLint config. |
| `postcss.config.mjs` | Tailwind v4 PostCSS plugin. |
| `.claude/launch.json` | Local dev server config for Claude Code preview (port 3001). Not shipped to production. |
| `.gitignore` | Excludes `node_modules`, `.next`, `.vercel`, `.env*`. |

---

## Live URLs

- Production: <https://inntw-invite.vercel.app>
- Frozen latest deploy: `inntw-invite-j6gk6fy0s-inntw.vercel.app`
- GitHub: <https://github.com/INNTW/inntw-invite>
- Vercel project: `inntw-invite` under team `inntw` (`team_F2LXzNCn0HxKRfyM2ojZppNe`)
