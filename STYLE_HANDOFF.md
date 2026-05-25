# INNTW Grand Opening — Style Handoff

This doc is a focused reading list for porting the visual styling of this
site (live at <https://inntw-invite.vercel.app>) into another codebase.
It's written for an AI assistant or developer to consume side-by-side
with the source files.

## TL;DR — the three files that matter

| File | What it is | Why it matters |
|---|---|---|
| [`app/globals.css`](./app/globals.css) | The entire design system + every component style (1,342 lines) | This is **the** file. Almost all visual styling lives here. |
| [`public/assets/logo-stamp-black.png`](./public/assets/logo-stamp-black.png) | The brand logo (black on transparent) | Rendered white via CSS filter; see [`Logo.tsx`](./app/components/Logo.tsx) |
| [`app/icon.png`](./app/icon.png) | Favicon — white logo on cobalt 512×512 | Generated with ffmpeg from the source logo |

Plus reference markup in [`app/page.tsx`](./app/page.tsx),
[`app/reserve/page.tsx`](./app/reserve/page.tsx),
[`app/reserve/details/page.tsx`](./app/reserve/details/page.tsx), and
[`app/reserve/confirmed/page.tsx`](./app/reserve/confirmed/page.tsx).

---

## Design tokens

All CSS variables are declared at the top of `globals.css` under `:root`.
Use these — don't hardcode hex values.

### Color

```css
--c-cobalt:        #024FDA;   /* primary brand — page background */
--c-warm-neutral:  #DAD3C8;   /* cream — CTAs, form inputs, hero type */
--c-warm-200:      #C9C0B2;   /* cream hover */
--c-warm-50:       #F4F0EA;   /* cream focused/active */
--c-brown-300:     #B89486;   /* cream pressed */
--c-ink-900:       #0A0A0A;   /* black text on cream */
--c-white:         #FFFFFF;
--c-black:         #000000;
```

### Typography

```css
--font-sans: "Helvetica Neue", "Helvetica", "Arial", "Liberation Sans", sans-serif;
```

No web font files are bundled. The site relies on the OS-installed
Helvetica Neue on macOS/iOS and falls through to Arial on Windows (which
is metrically near-identical).

### Spacing + motion

```css
--gutter:     clamp(20px, 4vw, 64px);   /* responsive page padding */
--ease-out:   cubic-bezier(0.22, 0.61, 0.36, 1);
--dur-fast:   140ms;
--dur-base:   220ms;
--dur-slow:   480ms;
```

---

## The signature look — cobalt canvas + sky glow

Every page is wrapped in `<div class="page">` with an absolute-positioned
`<div class="sky" aria-hidden="true">` overlay. This is the most
recognisable visual element of the site — copy these two rules
verbatim.

```css
.page {
  position: relative;
  min-height: 100vh;
  background:
    radial-gradient(circle at 88% 70%, rgba(255,255,255,0.10), transparent 55%),
    radial-gradient(circle at  8% 18%, rgba(255,255,255,0.06), transparent 55%),
    linear-gradient(180deg, #024FDA 0%, #034BD0 55%, #023FB4 100%);
}

/* Soft "sky" radial ellipses, blended on top */
.sky {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.55;
  background:
    radial-gradient(ellipse 800px 360px at 100% 50%, rgba(255,255,255,0.18), transparent 70%),
    radial-gradient(ellipse 500px 240px at  92% 38%, rgba(255,255,255,0.10), transparent 70%),
    radial-gradient(ellipse 600px 220px at  85% 78%, rgba(255,255,255,0.07), transparent 70%);
  mix-blend-mode: screen;
}
```

Implementation pattern (React/JSX):

```jsx
<div className="page">
  <div className="sky" aria-hidden="true" />
  {/* page contents */}
</div>
```

---

## Type system

### Display (the giant landing headline)

```css
.landing-display {
  font-size: clamp(64px, 10.4vw, 184px);
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: -0.025em;
  text-transform: uppercase;
  white-space: nowrap;          /* keep "IF NOT NOW" on one line */
  margin: 0 0 8px;
}
```

### Booking title (smaller hero)

```css
.booking-title {
  font-size: clamp(40px, 5.4vw, 72px);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 0.96;
  color: var(--c-warm-neutral);    /* cream, not white */
  white-space: nowrap;
}
```

### Eyebrow / label (uppercase tracked)

```css
.t-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.18em;          /* common: 0.18em–0.22em */
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1;
}
```

The `letter-spacing: 0.22em` variant is used for most card/section
eyebrows (Selected Time, Your Details, About This Room, etc.).

---

## Buttons

There are four button styles, in order of visual weight:

### `.cta-primary` — white on cobalt (landing CTA)

```css
.cta-primary {
  width: 100%;
  max-width: 880px;
  height: 84px;
  display: flex;
  align-items: center;
  justify-content: space-between;   /* text left, arrow right */
  padding: 0 32px;
  border: 0;
  border-radius: 0;
  background: #fff;
  color: var(--c-cobalt);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
```

### `.cta-cream` — cream on cobalt (Confirm Time, Reserve Your Spot)

```css
.cta-cream {
  background: var(--c-warm-neutral);
  color: var(--c-ink-900);
  height: 48px;
  padding: 0 28px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  border: 0;
  border-radius: 0;
}
.cta-cream--block { width: 100%; height: 56px; }   /* full-width variant */
```

### `.cta-outline` — outlined on cobalt (Copy Details)

```css
.cta-outline {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255,255,255,0.65);
  height: 48px;
  padding: 0 20px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  border-radius: 0;
}
```

### `.cta-ghost` — text only

Used for tertiary actions like "Change Time", "Back". Just transparent
background + white uppercase tracked text.

---

## Form fields

Cream-colored block inputs. Brand-distinctive — no rounded corners.

```css
.field { display: flex; flex-direction: column; gap: 6px; }

.field__label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #fff;
}

.field__input {
  height: 44px;
  background: var(--c-warm-neutral);
  border: 0;
  border-radius: 0;
  padding: 0 14px;
  color: var(--c-ink-900);
  font-size: 15px;
  font-weight: 500;
  outline: none;
}
.field__input:focus {
  background: #F4F0EA;
  box-shadow: inset 0 0 0 2px var(--c-ink-900);
}
```

### Checkboxes (`.check-row` + `.check-box`)

Custom-rendered (the `<input type=checkbox>` is `sr-only`). The visible
`.check-box` is a 18×18 square with a cobalt checkmark on cream when
checked. See lines 776–810 in `globals.css`.

---

## Cards & containers

### Slot card (`.slot-card`)

The cobalt-on-cobalt time-slot picker card. Selected state paints it
fully cream with cobalt accents (radio + progress bar). 3-up grid on
desktop, single column on mobile.

```css
.slot-card {
  position: relative;
  border: 1px solid rgba(255,255,255,0.5);
  background: transparent;
  color: #fff;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.slot-card.is-selected {
  background: var(--c-warm-neutral);
  border-color: var(--c-warm-neutral);
  color: var(--c-ink-900);
}
```

### Aside card (`.aside-card`)

Bordered info card used for "What To Expect" etc. The `--soft` variant
uses a lighter border.

### Pin promo container (`.opt-grid`)

The bordered semi-transparent container that wraps the two optional
opt-ins + the pin offer image. 2-column on desktop, stacks on mobile.

---

## Layout patterns

### The booking frame (slot picker / details / confirmation)

```jsx
<div className="booking-frame">
  <aside className="booking-aside">{/* left column on desktop */}</aside>
  <div className="form-pane">{/* or .slot-grid, .conf-pane */}</div>
</div>
```

```css
.booking-frame {
  display: grid;
  grid-template-columns: 320px 1fr;   /* aside | content */
  gap: 40px;
  padding: 28px 32px 32px;
  border: 1px solid rgba(255,255,255,0.36);
}

@media (max-width: 1080px) {
  .booking-frame { grid-template-columns: 1fr; gap: 32px; }
}
```

### The shared page header (logo + brand + countdown)

```jsx
<header className="top-bar">  {/* or .booking-top */}
  <Logo />
  <div className="brand">
    <span className="t-label">If Not Now Then When</span>
    <span className="t-label muted">Grand Opening — Reservation</span>
  </div>
  <Countdown />
</header>
```

```css
.top-bar,
.booking-top {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 24px;
}
```

On mobile (≤720px), the header collapses to a single centered column:
logo on row 1, countdown row 2 (full width, with a divider line above
it). See `globals.css` mobile media query for details.

---

## Logo rendering

The source logo is black on transparent. It's rendered as white on the
cobalt canvas via a CSS filter:

```css
.logo-stamp {
  width: 64px;       /* size varies — 40px in booking header, 60–88px in confirmed */
  height: 64px;
  filter: invert(1) brightness(2);
  user-select: none;
}
```

```jsx
<img
  src="/assets/logo-stamp-black.png"
  alt="If Not Now Then When"
  className="logo-stamp"
  draggable={false}
/>
```

---

## Responsive breakpoints

There are two breakpoints:

| Breakpoint | What changes |
|---|---|
| `max-width: 1080px` | Booking frame stacks to 1 column. Slot picker reorders so cards come first, confirm button drops to the bottom. Aside cards stay in the left column (or move below the form on details). |
| `max-width: 720px` | Mobile. Header becomes centered single column. Headline font scales down. Landing content column constrained to ~75% of viewport via `max-width: 75%; align-self: flex-start`. Form fields, paddings, and gaps all tighten. |

---

## Tailwind dependency note

`globals.css` opens with `@import "tailwindcss"`. This is **Tailwind v4**
and is used for ~5% of the styling — mostly to get Preflight (basic CSS
reset) and a few utility classes in the JSX. The vast majority of the
visual system is in plain CSS classes defined in this same file.

**If your project doesn't use Tailwind**, you can safely remove the
`@import "tailwindcss"` line. You'll just need to add a minimal CSS
reset (`* { box-sizing: border-box; }`, `body { margin: 0 }`, etc.) —
all of that is already covered explicitly later in the file (search for
`box-sizing: border-box` and the `html, body, #root` rule).

---

## Page-by-page reading order

If your AI is implementing this from scratch, read in this order:

1. **`app/globals.css`** — the whole design system.
2. **`app/components/PageCanvas.tsx`** — the cobalt + sky wrapper.
3. **`app/components/Logo.tsx`** — how the logo is rendered.
4. **`app/components/Countdown.tsx`** — the live "Doors Open In" timer.
5. **`app/components/ReserveShell.tsx`** — the shared booking-page header + frame chrome.
6. **`app/page.tsx`** — the landing page (headline + CTA + meta block).
7. **`app/reserve/page.tsx`** — slot picker grid.
8. **`app/reserve/details/page.tsx`** — form with mandatory consent + pin promo.
9. **`app/reserve/confirmed/page.tsx`** — confirmation rail with What Happens Next + What To Expect.

That order maps from system primitives → shared components → pages, so
each file builds on the previous one.

---

## Open Graph / share metadata

Configured in `app/layout.tsx`. The `<title>` and Open Graph title both
read **"If Not Now Then When Grand Opening"**. `og:image` and
`twitter:image` point at the cobalt favicon at `/icon.png`. The
`metadataBase` is pinned to the production URL so social scrapers
resolve relative paths correctly.

---

## Live reference

Deployed at <https://inntw-invite.vercel.app> — open the responsive
inspector in Chrome and compare layouts side-by-side as you port.
