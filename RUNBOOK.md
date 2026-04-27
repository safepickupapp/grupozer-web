# Grupo ZER Website — Runbook

## Project Overview

Corporate website for Grupo ZER at `zergrupo.com`. Bilingual (Spanish default + English), hosted on Vercel.

| Environment | URL | Branch | Auto-deploy |
|-------------|-----|--------|-------------|
| Production | `zergrupo.com` / `www.zergrupo.com` | `main` | Yes (on push) |
| Staging | `staging.zergrupo.com` | `staging` | Yes (on push) |

## Repos & Access

- **Repo:** `github.com/safepickupapp/grupozer-web` (public)
- **Hosting:** Vercel — project `grupozer-web` under `safepickup-4027` team
- **DNS:** Google Cloud DNS (via Squarespace domain management)
- **Email:** Twilio SendGrid (shared account with Safe Pickup)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS with brand tokens |
| i18n | next-intl (localePrefix: "always") |
| Forms | react-hook-form + zod v4 |
| Email | @sendgrid/mail |
| Icons | lucide-react |
| Hosting | Vercel (free tier) |

## Local Development

```bash
cd ~/Projects/grupozer-web
npm install
npm run dev          # http://localhost:3000
```

The root `/` redirects to `/es`. Both `/es` and `/en` serve the full site.

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description | Required |
|----------|-------------|----------|
| `TWILIO_SENDGRID_API_KEY` | SendGrid API key (starts with `SG.`) | For contact form |
| `CONTACT_FROM_EMAIL` | Sender address (`noreply@zergrupo.com`) | For contact form |
| `CONTACT_TO_EMAILS` | Comma-separated recipient emails | For contact form |
| `NEXT_PUBLIC_SITE_URL` | Site base URL (no trailing slash) | For SEO/sitemap |

## Branch Model

```
staging  →  all development lands here first
main     →  production, promoted from staging
```

### Workflow

1. Work on `staging` branch (or feature branches → PR to `staging`)
2. Push to `staging` → auto-deploys to `staging.zergrupo.com`
3. Test on staging
4. Merge `staging` → `main` (PR or fast-forward)
5. Push to `main` → auto-deploys to `zergrupo.com`

## Deployment

Vercel handles everything automatically on push. No manual deploy steps needed.

### Build Command

```bash
npm run build        # runs `next build`
```

### Verify a Deployment

- Check Vercel dashboard → Deployments tab for build status
- Visit the site and verify pages load in both languages
- Test contact form submission (check SendGrid activity for delivery)

### Rollback

In Vercel dashboard → Deployments → click the three dots on a previous successful deployment → **"Promote to Production"**.

## Project Structure

```
app/
  layout.tsx                  # root layout (CSS import only)
  page.tsx                    # redirect / → /es
  [lang]/
    layout.tsx                # locale layout (html lang, Manrope font, Header, Footer)
    page.tsx                  # home page
    about/page.tsx
    portfolio/page.tsx
    contact/page.tsx
    privacy/page.tsx
    terms/page.tsx
  api/
    contact/route.ts          # POST → SendGrid
  sitemap.ts
  robots.ts
components/
  brand/                      # Wordmark, Isotype, Logo
  ui/                         # Button, Input, Select, Textarea, Checkbox
  layout/                     # Header, Footer, Container, Section
  sections/                   # Hero, Pillars, AboutTeaser, Story, etc.
  interactive/                # LangSwitcher, MobileMenu, RevealOnScroll, PhoneMock
messages/
  es.json                     # Spanish translations (nested)
  en.json                     # English translations (nested)
i18n/
  config.ts                   # locales array, default locale
  request.ts                  # next-intl request config
lib/
  sendgrid.ts                 # email helper with HTML escaping
styles/
  globals.css                 # Tailwind directives + tokens import
  tokens.css                  # brand CSS custom properties
```

## i18n Conventions

- **Server Components:** `getTranslations("namespace")` from `next-intl/server`
- **Client Components:** `useTranslations("namespace")` from `next-intl`
- **Zero hardcoded strings** — all copy via translation functions
- Messages use nested JSON (e.g., `t("hero.eyebrow")` or scoped `t("eyebrow")`)
- `localePrefix: "always"` — both `/es/...` and `/en/...` get URL prefixes

### Adding a New Translation

1. Add the key to both `messages/es.json` and `messages/en.json`
2. Use `t("your.key")` in the component

## Brand Rules

- **Colors:** Navy `#00205C`, Sky `#4197CB`, Cool Gray `#76777A` — closed palette, no other hues
- **Font:** Manrope (Google Fonts), weights 200-800
- **Signature:** "grupo" in ExtraLight Cool Gray, "zer" in ExtraBold Navy
- **Logo minimum:** 120px desktop / 100px mobile / 32px isotype
- **No** gradients, shadows, outlines, or effects on the logo

## Contact Form

Flow: Client-side validation (react-hook-form + zod) → POST `/api/contact` → server-side zod re-validation → SendGrid email to both founders.

**Spam protection:** Honeypot field only (in-memory rate limiting doesn't work on Vercel serverless). Add `@upstash/ratelimit` if spam becomes an issue.

## DNS Records

| Type | Name | Value | Purpose |
|------|------|-------|---------|
| A | `@` | `216.198.79.1` | Vercel production |
| CNAME | `www` | `998a01f63f3e5d2c.vercel-dns-017.com` | Vercel production |
| CNAME | `staging` | `998a01f63f3e5d2c.vercel-dns-017.com` | Vercel staging |
| MX | `@` | Google Workspace MX records | Email |
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` | SPF |
| CNAME | `google._domainkey` | (DKIM value) | Google DKIM |

## Troubleshooting

### Build fails on Vercel
- Check build logs in Vercel dashboard
- Run `npm run build` locally to reproduce
- Common: TypeScript errors, missing translation keys

### Contact form not sending
- Verify `TWILIO_SENDGRID_API_KEY` is set in Vercel env vars
- Check SendGrid Activity Feed for delivery status
- Ensure `zergrupo.com` domain is authenticated in SendGrid (DKIM/SPF)

### "Invalid Configuration" on Vercel domains
- DNS records may need updating — check Vercel Domains page for recommended values
- DNS propagation can take up to 4 hours

### Translation missing
- Check the key exists in BOTH `messages/es.json` and `messages/en.json`
- Ensure the namespace matches (e.g., `getTranslations("hero")` needs a `"hero"` key at root level)

## Contacts

| Name | Role | Email |
|------|------|-------|
| Nazha Stephanie Giudicelli | Co-Founder | ngiudicelli@zergrupo.com |
| Miguel Jose Pena | Co-Founder | mjpena@zergrupo.com |
