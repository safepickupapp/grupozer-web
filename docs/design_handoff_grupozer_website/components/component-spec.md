# Component Implementation Guide

This guide maps every visual region of `reference/Grupo_ZER.html` to a recommended component in the production codebase. Use it as the contract between the design and the React component tree.

## Architecture

```
/components
  /ui                  ← primitives (no business logic)
    Button.tsx          variants: primary | secondary | accent | ghost
    Input.tsx
    Select.tsx
    Textarea.tsx
    Checkbox.tsx
  /brand               ← brand-locked atoms
    Wordmark.tsx        renders "grupo" (200 weight, gray) + "zer" (800, navy)
    Isotype.tsx         the SVG from reference/Grupo_ZER.html (lines 1-30 of <defs>)
    Logo.tsx            Wordmark + Isotype lockup; props: variant, size
  /layout
    Header.tsx          sticky, scroll-aware; contains Nav + LangSwitcher
    Footer.tsx
    Container.tsx       max-w-container mx-auto px-7
    Section.tsx         vertical rhythm wrapper
  /sections
    Hero.tsx
    Pillars.tsx
    AboutTeaser.tsx     split layout with isotype-art block
    Story.tsx
    MissionVision.tsx
    Values.tsx
    Leadership.tsx
    CorporatePurpose.tsx
    PortfolioIntro.tsx
    FeaturedProductCard.tsx   the SafePickup hero card
    FuturePortfolioGrid.tsx
    FinalCTA.tsx              navy band
    ContactForm.tsx
    ContactSidebar.tsx
  /interactive        ← 'use client'
    LangSwitcher.tsx        persists to localStorage + cookie
    MobileMenu.tsx
    RevealOnScroll.tsx      IntersectionObserver wrapper
    PhoneMock.tsx           the SafePickup phone illustration
```

---

## Per-component spec

### `Wordmark`
- **Markup:** `<span><span class="grupo">grupo</span><span class="zer">zer</span></span>`
- **Styles:** "grupo" → `font-weight:200; color: var(--color-gray)`; "zer" → `font-weight:800; color: var(--color-navy)`. Both share `letter-spacing: -0.02em` and `line-height: 1`.
- **Reverse variant** (for navy/dark backgrounds): "grupo" → `rgba(255,255,255,0.78)`, "zer" → `#fff`.
- **Sizes:** `sm` 18px, `md` 22px, `lg` 28px (header default), `xl` 40px+ (hero).

### `Isotype`
- **Source:** copy the `<symbol id="iso">` from `reference/Grupo_ZER.html` verbatim into `Isotype.tsx`.
- **Props:** `variant: 'full' | 'mono'` and `color?: string` (only for `mono`).
- **Minimum render size:** 32px (favicon, compact nav). Below that → refuse to render (return `null`).
- **TODO:** replace with the official vector once founders provide it.

### `Logo`
- Lockup of `Isotype` + `Wordmark`, horizontal only on the website (vertical reserved for square avatars per spec §11.2).
- Gap between iso and wordmark: `12px`.
- Minimum width: 120px desktop / 100px mobile.

### `Header`
- Sticky, `top: 0`, `z-50`.
- Background: `rgba(255,255,255,0.85)` with `backdrop-filter: saturate(160%) blur(14px)`.
- Adds bottom border at `1px solid var(--color-gray-20)` once `window.scrollY > 8`.
- Height: 76px.
- Layout: Logo (left) — NavLinks (center/right, gap 36px) — LangSwitcher + MobileMenuButton (far right).
- Mobile (≤880px): NavLinks collapse into MobileMenu; menu button replaces them.

### `LangSwitcher`
- Pill container: `1px solid var(--color-gray-20)`, `border-radius: 999px`, `padding: 3px`.
- Two buttons: `SPA` and `ENG`. Active state → `bg-navy text-white`.
- Persists to `localStorage` AND a cookie (so SSR can pick the locale).
- On change: routes from `/es/...` to `/en/...` (or vice versa) preserving the path + scroll position.
- `aria-pressed` on each button.

### `Hero`
- Padding: `96px 0 120px`.
- Background: `linear-gradient(180deg, #fff 0%, #f8fafc 100%)` + two radial glows (sky top-right, navy bottom-left).
- Eyebrow: 12px uppercase Sky, with leading 28px hairline.
- H1: dual-weight — `<span class="block font-extralight text-gray">Tecnología que</span><span class="font-extrabold text-navy">simplifica lo cotidiano.</span>`. `font-size: clamp(40px, 6.4vw, 84px); letter-spacing: -0.035em; max-width: 14ch; text-wrap: balance;`
- Subhead: 17–21px, weight 300, max-width 60ch.
- CTA row: primary (Navy) + secondary (outline). Gap 14px.
- Right-side decorative SVG (the abstract Z motif). Hide below 1100px.

### `Pillars`
- 3-column grid (1 col on mobile), gap 28px.
- Each card: `1px solid var(--color-gray-20)`, `border-radius: 22px`, padding `36px 30px 34px`. Hover: lift -4px, shadow-lg, border `rgba(65,151,203,0.4)`.
- Number "01/02/03" in top-right corner, gray-60, weight 700.
- Icon block: 52×52, `bg-sky-soft`, `text-sky`, rounded 14px.
- Icons: lightbulb / lightning / heart (Lucide-style line icons; 1.8 stroke).
- Title: 22px ExtraBold Navy. Body: 15.5px gray, line-height 1.6.

### `AboutTeaser`
- 2-col split, gap 80px (collapses to 1 col below 900px).
- Left: navy-filled art block, aspect 5/4, `border-radius: 22px`, with grid overlay + centered isotype rendered at 50% size in white/sky.
- Right: eyebrow → H2 → body → ghost link "Conoce más sobre nosotros →".

### `Story`
- Max-width 760px text column.
- Body 1: full company history paragraph.
- Body 2: highlight Z, E, R letters of "Zoe, Emma, Renata" in `font-weight: 700; color: var(--color-navy)`.

### `MissionVision`
- Two-card grid, gap 28px.
- Mission card: white bg, gray-20 border. Vision card: navy bg, white text (variant `dark`).
- Each card: label (12px uppercase sky) → H3 (28px ExtraBold) → body (16px, weight 300).

### `Values`
- 5-column grid (3 on tablet, 2 on mobile).
- Each value card: `1px solid var(--color-gray-20)`, `border-radius: 14px`, padding `22px 20px`.
- Number (11px sky), title (16px ExtraBold Navy), body (13px gray).

### `Leadership`
- 2-col grid; each card is horizontal flex (photo left 160px wide, info right).
- Photo block: gradient `from-sky-soft to-#d6e6f1` with founder initials in 44px ExtraBold Navy. **Replace with real photos when delivered.**
- Info: role (uppercase sky 11.5px) → name (21px ExtraBold) → bio (14px gray) → email (14px Navy with bottom border, hover → sky).
- Mobile: stack photo on top.

### `CorporatePurpose`
- Single block, `border-left: 3px solid var(--color-sky)`, padding `38px 44px`, italic, weight 300.

### `FeaturedProductCard` (SafePickup hero)
- Outer: `border-radius: 22px`, gradient `linear-gradient(135deg, #001a4d, #00205C 60%, #1a3b75)`. White text. Heavy shadow.
- 2-col grid (content left, visual right).
- Content side: tag pill ("Producto insignia" with sky dot) → title 56px ExtraBold → category line → description → 3-stat row (15+ schools, 250K+ pickups, "En operación") → accent button "Visitar safepickup.app" with external-link icon.
- Visual side: `PhoneMock` component, rotated -3°, with 3 stacked cards inside (live dismissal demo).

### `PhoneMock`
- 240px wide, aspect-ratio 9/19. Bezel: `#0a1430` body with `1a2240` outer ring. Notch top.
- Screen: pale gradient. Inside: status label + 3 cards.
- Cards: avatar circle with initials, name + sub-line, status pill (EN RUTA / VERIFICADO / OK with green tint).
- All strings come from `messages/{lang}.json` keys `portfolio.sp.phone.*`.

### `FuturePortfolioGrid`
- 3-col grid of dashed-border placeholder cards. "Próximamente" + clock icon.
- Hover: dashed border → solid sky.

### `FinalCTA`
- Full-width navy band, padding 110/0. Centered text.
- Background: navy + 800px central radial sky glow at 25% opacity.
- H2 60px ExtraBold white. Subhead 17px white/78%. Sky-accent button.

### `ContactForm`
- Two-column rows for name/email and company/subject; full-width for message.
- Inputs: `1.5px solid var(--color-gray-20)`, radius 8px, padding `14px 16px`. Focus: border sky + 4px sky/15% halo.
- Select: custom triangle indicator (inline SVG data URI).
- Consent checkbox: 18px square, accent-color navy.
- Submit: primary button with paper-plane icon.
- Validation: zod schema for `name`, `email`, `subject`, `message`, `consent`. On success → POST `/api/contact` → show localized thank-you toast.

### `ContactSidebar`
- Paper bg, `1px solid var(--color-gray-20)`, radius 22px, padding `36px 32px`.
- Title + body.
- 2 contact items separated by hairline. Each: name → role → email link (sky).
- Location row at bottom with map-pin icon.

### `Footer`
- Bg `#0a1430`. Padding `80px 0 36px`.
- 4-col grid (brand 1.6fr, nav 1fr, portfolio 1fr, contact 1fr).
- Reversed wordmark + tagline in brand col.
- Each col: 11px uppercase white/50% header + link list.
- Bottom row: copyright (left) — privacy/terms + socials (right). Top border `1px solid rgba(255,255,255,0.1)`.

### `RevealOnScroll`
- Wraps any child. On `IntersectionObserver` intersect → adds `in` class.
- Initial state: `opacity: 0; transform: translateY(20px);`. Active: both reset, transition 700ms ease.
- Respect `prefers-reduced-motion` — skip the animation entirely.

---

## State

- **Locale** — `next-intl` reads from URL segment + cookie. Persist user's choice in cookie `NEXT_LOCALE`.
- **Mobile menu open/closed** — local state in `MobileMenu`.
- **Form** — `react-hook-form` with `zod` resolver. Toast state at form level.
- **Cookie consent** — context provider at root; gates GA4 init.

## Asset checklist

- [ ] `public/logo/iso-full.svg` — full-color isotype (request from founders)
- [ ] `public/logo/iso-navy.svg`, `iso-sky.svg`, `iso-gray.svg`, `iso-black.svg`, `iso-white.svg` — monochrome variants
- [ ] `public/logo/wordmark-full.svg`, plus monochromes
- [ ] `public/logo/lockup-horizontal.svg` (header default)
- [ ] `public/favicon.ico`, `icon-16.png`, `icon-32.png`, `apple-touch-icon.png` (180), `icon-512.png` (PWA), `manifest.json`
- [ ] `public/og/og-es.png`, `og-en.png` (1200×630, wordmark on Navy)
- [ ] `public/founders/nazha.jpg`, `miguel.jpg` (request)
- [ ] `public/safepickup/hero.png` or screenshot for portfolio card (until delivered, keep `PhoneMock` SVG)
