# Handoff: Grupo ZER Corporate Website

> **Read this file first.** It is the entry point. The rest of the package is referenced from here.

## 1. Overview

This is the developer handoff for the **Grupo ZER corporate website** — the institutional front-door for a Dominican holding company that designs, develops, and operates digital products (flagship: **SafePickup**).

- **Production domain:** `zergrupo.com`
- **Staging domain:** `staging.zergrupo.com`
- **Languages:** Spanish (default) + English, with persistent switcher
- **Site structure:** Single-page-with-sections homepage + dedicated About, Portfolio, Contact pages

## 2. About the design files

The HTML files in `reference/` are **design references** — high-fidelity prototypes showing the intended look, feel, copy, and behavior. They are **not production code to ship as-is**.

Your task is to **recreate these designs in a proper codebase** (recommended: Next.js 14 App Router + Tailwind + `next-intl`) using the codebase's idiomatic patterns. The HTML is the source of truth for visual design, copy, and brand application — not for architecture.

When in doubt, the official **brand identity manual** (`GrupoZER_ManualDeIdentidad`, request from founders) **prevails** on all visual matters per spec §11. The original PRD is preserved in `reference/website_specification.txt`.

## 3. Fidelity

**High-fidelity.** All colors, typography, spacing, copy (ES + EN), and interaction states are final and brand-compliant. Recreate pixel-faithfully.

## 4. Package contents

```
design_handoff_grupozer_website/
├── README.md                          ← you are here
├── CLAUDE.md                          ← drop into repo root; Claude Code reads it every session
├── DESIGN_SYNC.md                     ← living-link contract between design canvas ↔ codebase
├── reference/
│   ├── Grupo_ZER.html                 ← the high-fidelity reference (open in browser)
│   └── website_specification.txt      ← the original PRD
├── tokens/
│   ├── tokens.css                     ← CSS custom properties (drop-in)
│   └── tailwind.config.js             ← Tailwind preset using the same tokens
├── content/
│   ├── es.json                        ← all Spanish copy, keyed for i18n
│   └── en.json                        ← all English copy, keyed for i18n
├── components/
│   └── component-spec.md              ← component-by-component implementation guide
└── deployment/
    ├── stack.md                       ← recommended stack + rationale
    ├── deployment.md                  ← Vercel + DNS + branch strategy
    └── continuous-workflow.md         ← how to iterate after first deploy
```

## 5. Getting started (10-minute path)

```bash
# 1. Install Claude Code if you haven't
npm install -g @anthropic-ai/claude-code
claude login

# 2. Bootstrap the repo
mkdir grupozer-web && cd grupozer-web
git init
git checkout -b staging

# 3. Copy this entire handoff folder into the repo root
cp -r /path/to/design_handoff_grupozer_website/* .

# 4. Open Claude Code
claude

# 5. Give it this prompt:
```

> Read `README.md`, `CLAUDE.md`, and `DESIGN_SYNC.md`. Then read `reference/Grupo_ZER.html` end-to-end and `reference/website_specification.txt`. Scaffold a Next.js 14 (App Router) + TypeScript + Tailwind CSS + `next-intl` project. Use `tokens/tailwind.config.js` as the brand preset and `content/{es,en}.json` as the message catalog. Spanish is the default locale at `/es`, English at `/en`. Translate the single-page reference into the routes documented in `components/component-spec.md`. Wire the contact form to a `/api/contact` route that emails `ngiudicelli@zergrupo.com` and `mjpena@zergrupo.com` via Resend. Add `hreflang`, sitemap, robots.txt, and Organization JSON-LD per spec §12.5. Do not redraw the isotype — use the SVG from `reference/Grupo_ZER.html` verbatim. Once scaffolded, push `staging` to GitHub.

## 6. Sitemap

| Route | Spanish title | Source section in reference HTML |
|---|---|---|
| `/{lang}` | Inicio / Home | `#home`, `#pillars`, `#about` (teaser), `#portfolio` (preview), `.cta-band` |
| `/{lang}/about` | Nosotros / About | `#story` (full) |
| `/{lang}/portfolio` | Portafolio / Portfolio | `#portfolio` (full) |
| `/{lang}/contact` | Contacto / Contact | `#contact` |
| `/{lang}/privacy` | Política de privacidad / Privacy | placeholder draft |
| `/{lang}/terms` | Términos / Terms | placeholder draft |

The reference HTML implements all of these as anchor sections on a single page for design review. **In production, split them into proper routes** so each gets its own meta, hreflang, and crawlable URL.

## 7. Brand attributes (must guide every decision)

1. **Innovation** — purposeful technology
2. **Agility** — fast iteration
3. **Service** — user at the center

## 8. Critical brand rules (from spec §11.4 — non-negotiable)

The following are **forbidden** and Claude Code must refuse to introduce them:

- ❌ Recoloring the logo outside the approved palette (no red/green/purple/etc.)
- ❌ Gradients, shadows, outlines, or effects on the logo
- ❌ Stretching, squashing, or skewing the wordmark or isotype
- ❌ Rendering the logo below the minimum size (120px desktop / 100px mobile / 32px isotype)
- ❌ Rearranging the lockup (e.g., isotype to the right of the wordmark)
- ❌ Placing the logo on busy backgrounds or low-contrast photography

## 9. Deliverables checklist

Track completion against spec §14:

### Design (mostly done — these files)
- [x] High-fidelity reference for desktop + mobile, both languages
- [x] Component vocabulary (see `components/component-spec.md`)
- [ ] **Official logo SVGs** from founders (request all 6 approved color variants)
- [ ] Favicon + PWA icon set generated from the official isotype
- [ ] Final typography licensing decision (Fontanella vs. Manrope confirmed in writing)

### Development
- [ ] Next.js scaffold with i18n routing
- [ ] All 4 primary pages + 3 legal pages
- [ ] Working contact form → Resend → both founder emails
- [ ] Staging deployment on `staging.zergrupo.com`
- [ ] Production deployment on `zergrupo.com`
- [ ] README in repo covering local dev, deploy, content updates

### QA (per spec §14)
- [ ] Cross-browser: Chrome, Safari, Firefox, Edge
- [ ] Devices: iOS Safari, Android Chrome, iPad
- [ ] Lighthouse: 90+ across the board
- [ ] axe-core accessibility audit (WCAG 2.1 AA)
- [ ] SEO: meta, hreflang, sitemap, structured data

## 10. Continuous workflow (after first deploy)

See `deployment/continuous-workflow.md`. Short version:

- **Visual / copy / brand changes** → originate in the Claude Design canvas → produced as PR against `staging`
- **Functional / backend changes** → handle in Claude Code directly
- **Content updates** → optional headless CMS layer (Sanity recommended) for non-technical edits

## 11. Project contacts

| Name | Role | Email |
|---|---|---|
| Nazha Stephanie Giudicelli | Co-Founder | `ngiudicelli@zergrupo.com` |
| Miguel José Peña | Co-Founder | `mjpena@zergrupo.com` |

Location: Santo Domingo, Dominican Republic.

---

**Next step:** open `CLAUDE.md`. Everything Claude Code needs to behave correctly in this repo is there.
