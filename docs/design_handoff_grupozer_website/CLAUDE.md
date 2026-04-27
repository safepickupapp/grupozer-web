# CLAUDE.md — Grupo ZER Web

This file is read by Claude Code on every session in this repo. Treat it as binding context.

## Project

Corporate website for **Grupo ZER**, a Dominican holding company. Bilingual (ES default, EN). Production: `zergrupo.com`. Staging: `staging.zergrupo.com`.

## Source of truth

- **Visual / copy / brand:** the Claude Design project (canvas), mirrored into:
  - `reference/Grupo_ZER.html` — the high-fidelity HTML reference
  - `tokens/tokens.css` + `tokens/tailwind.config.js` — brand tokens
  - `content/es.json` + `content/en.json` — copy catalog
- **Code architecture:** this repo. Choose idiomatic patterns; do not let HTML structure dictate component shape.
- **Brand authority:** the official `GrupoZER_ManualDeIdentidad` (request from founders) prevails on any visual conflict.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (configured via `tokens/tailwind.config.js`)
- `next-intl` for i18n; locales `es` (default) and `en`; URL prefix `/es` / `/en`
- Resend (or Postmark) for transactional email from the contact form
- Vercel for hosting; `staging` branch → staging domain, `main` → production
- Optional: Sanity headless CMS for editable copy in a later phase

## Hard constraints (do not violate)

1. **Logo rules (spec §11.4 — forbidden):** never recolor the logo outside the approved palette, never apply gradients/shadows/outlines, never stretch or skew, never place below minimum size (120px desktop / 100px mobile / 32px isotype), never rearrange the lockup, never place over busy backgrounds.
2. **Wordmark composition:** "grupo" in ExtraLight Cool Gray (#76777A), "zer" in ExtraBold Navy (#00205C), one word, lowercase, on every branded surface (header, footer, favicon, OG image).
3. **Color palette is closed.** Only `#00205C` (Navy / Pantone 281C), `#4197CB` (Sky / Pantone 7688C), `#76777A` (Cool Gray / Pantone Cool Gray 9C), and tonal variations of these. Do not introduce new hues.
4. **Typography:** Manrope from Google Fonts as the Fontanella stand-in until licensing is confirmed. Use weights 200, 300, 400, 500, 600, 700, 800. Preserve the dual-weight signature (ExtraLight + ExtraBold contrast) on display headlines.
5. **Bilingual completeness:** every visible string, every meta title/description, every alt text, every form label must exist in both `es.json` and `en.json`. No hardcoded strings in components.
6. **Accessibility:** WCAG 2.1 AA. Semantic HTML, ARIA where needed, full keyboard nav, visible focus rings, sufficient contrast.
7. **Performance:** LCP < 2.5s on 4G; CLS < 0.1; serve images as WebP/AVIF with `next/image`.

## Code conventions

- Components live in `/components/{ui,sections}`. UI primitives (Button, Input, Select) in `ui/`; page sections (Hero, Pillars, FeaturedProductCard) in `sections/`.
- Tailwind classes only — no inline styles, no CSS modules. Use `@apply` sparingly in `globals.css` for tokens that need cascade.
- Server Components by default; mark `'use client'` only when needed (forms, language switcher, mobile menu, scroll-reveal observer).
- All copy via `useTranslations()` from `next-intl`. Never hardcode.
- Forms use `react-hook-form` + `zod` for validation.

## Routes

```
/                    → redirect to /es
/[lang]              → home (hero + pillars + about teaser + portfolio preview + CTA)
/[lang]/about        → full story, mission, vision, values, leadership, corporate purpose
/[lang]/portfolio    → SafePickup featured + future slots
/[lang]/contact      → form + direct contacts
/[lang]/privacy      → placeholder drafts
/[lang]/terms        → placeholder drafts
/api/contact         → POST handler → Resend → ngiudicelli@ + mjpena@
/sitemap.xml
/robots.txt
```

`hreflang` tags on every page pointing to the other locale. Canonical tags everywhere.

## SEO baseline

- Unique `<title>` and `<meta description>` per page per language (in `*.json`)
- Organization schema (JSON-LD) on `/`
- OG images per language using the wordmark on Navy
- Sitemap auto-generated from routes; submitted to Google Search Console

## Analytics

- GA4 on both staging and production (different property IDs)
- Cookie consent banner before any analytics fires
- Track: primary CTA clicks, contact form submit, outbound clicks to `safepickup.app`, language switch

## Branch / deploy model

| Branch | Domain | Purpose |
|---|---|---|
| `staging` | `staging.zergrupo.com` | All design + feature PRs land here |
| `main` | `zergrupo.com` | Promoted from `staging` only after sign-off |

Open one PR per change against `staging`. Squash-merge.

## When you receive a design update from the canvas

The design canvas may push a PR or paste a patch. Procedure:
1. Read `DESIGN_SYNC.md` to confirm which artifacts are owned by the canvas
2. If the change touches `tokens.css`, `*.json`, or `reference/Grupo_ZER.html`, propagate it: tokens flow into Tailwind config, JSON flows into `messages/`, HTML changes inform component edits
3. **Do not** modify `reference/Grupo_ZER.html` from the codebase side — it is read-only mirror
4. Land on `staging`, verify on `staging.zergrupo.com`, then close the PR

## What you should refuse

- Adding non-brand colors (e.g. red error states should use Navy + iconography, or a desaturated brand-adjacent red only if explicitly approved)
- Inventing copy (always pull from `*.json` — if a string is missing, ask, don't fabricate)
- Redrawing the isotype or wordmark (use the SVG from `reference/`)
- Shipping any string that exists in only one language
