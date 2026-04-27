# Recommended Stack

The choice is informed by spec §13. Final call rests with the dev team.

## Frontend framework: **Next.js 14 (App Router)**

- First-class i18n (`next-intl`) with locale-prefix routing → meets §3 (clean `/es/` and `/en/` URLs)
- Built-in `<Image>` with WebP/AVIF → meets §12.3 (LCP < 2.5s)
- Server Components reduce JS payload → helps Lighthouse 90+
- Edge-rendered metadata → easy `hreflang` per page

Alternative: **Astro** — simpler if the contact form is the only interactive surface. Recommend Next.js because the contact form, language switcher, and any future authenticated areas (admin panel) are easier in React.

## Styling: **Tailwind CSS** with brand preset

- Use `tokens/tailwind.config.js` as-is. Do not override the closed color palette.
- `globals.css` imports `tokens/tokens.css` for any `@apply`-style use.
- No CSS-in-JS, no CSS modules — keep it boring.

## i18n: **next-intl**

- Locales: `es` (default), `en`
- URL strategy: `as-needed` → `/` 302s to `/es`; `/en/...` for English
- Message catalog: `messages/es.json`, `messages/en.json` — symlinked or copied from `content/`
- Cookie: `NEXT_LOCALE` for persistence

## Forms: **react-hook-form + zod + Resend**

- `react-hook-form` for state, `zod` for validation
- `/app/api/contact/route.ts` POST handler:
  1. Validate with `zod`
  2. Send email via Resend SDK to `ngiudicelli@zergrupo.com` AND `mjpena@zergrupo.com`
  3. Send confirmation reply to the user
  4. Return `{ ok: true }`
- Honeypot field + simple rate limit (e.g. Upstash) to prevent abuse
- Env: `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (e.g. `noreply@zergrupo.com`)

## CMS (optional, phase 2): **Sanity**

- Lightweight studio at `/studio`
- Schemas: `homePillars`, `aboutCopy`, `portfolioItems`, `legalPages`
- Founders + marketing edit copy without touching the codebase
- ISR / on-demand revalidation triggers re-render on publish

## Hosting: **Vercel**

- `staging` branch → preview deployment with custom domain `staging.zergrupo.com`
- `main` branch → production at `zergrupo.com`
- Edge functions handle `/api/contact`
- Built-in analytics + Web Vitals → tracks performance budgets

## Analytics: **GA4 + cookie consent**

- GA4 measurement IDs: `NEXT_PUBLIC_GA4_ID_STAGING`, `NEXT_PUBLIC_GA4_ID_PROD`
- Custom events: `cta_click`, `contact_submit`, `outbound_safepickup`, `lang_switch`
- Cookie consent: `vanilla-cookieconsent` or `react-cookie-consent`. Block GA until acceptance.

## Repo layout

```
grupozer-web/
├── app/
│   ├── [lang]/
│   │   ├── layout.tsx
│   │   ├── page.tsx                  ← Home
│   │   ├── about/page.tsx
│   │   ├── portfolio/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   ├── api/contact/route.ts
│   ├── sitemap.ts
│   ├── robots.ts
│   └── layout.tsx
├── components/                       ← see component-spec.md
├── messages/
│   ├── es.json                       ← copied from content/es.json
│   └── en.json
├── lib/
│   ├── analytics.ts
│   └── email.ts
├── public/
│   └── logo/, og/, favicon files
├── styles/
│   ├── globals.css                   ← imports tokens.css
│   └── tokens.css                    ← copy of design_handoff/tokens/tokens.css
├── tailwind.config.js                ← copy of design_handoff/tokens/tailwind.config.js
├── next.config.mjs
├── CLAUDE.md
├── DESIGN_SYNC.md
├── README.md
└── package.json
```

## Required env vars

```bash
# .env.local (do not commit)
RESEND_API_KEY=
CONTACT_FROM_EMAIL=noreply@zergrupo.com
CONTACT_TO_EMAILS=ngiudicelli@zergrupo.com,mjpena@zergrupo.com
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_SITE_URL=https://zergrupo.com   # or staging URL
```
