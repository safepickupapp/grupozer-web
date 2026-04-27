# DESIGN_SYNC.md — The living link

This file documents the **continuous workflow** between the Claude Design canvas (where the visuals live) and this code repo (where the site lives). Read it before making any change that crosses the boundary.

## Ownership map

| Artifact | Lives in | Source of truth | Mirror |
|---|---|---|---|
| Visual reference | `reference/Grupo_ZER.html` | Design canvas | This repo (read-only) |
| Brand tokens | `tokens/tokens.css`, `tokens/tailwind.config.js` | Design canvas | This repo (read-only) |
| Copy (ES / EN) | `content/es.json`, `content/en.json` | Design canvas | This repo (read-only); fed into `messages/` |
| Component architecture | `/components/**` | This repo | — |
| Routes & data flow | `/app/**` | This repo | — |
| API & integrations | `/app/api/**`, `/lib/**` | This repo | — |
| Deployment config | `vercel.json`, env vars | This repo | — |

**Rule of thumb:** if it's something you'd see, it lives in the design canvas. If it's something you'd run, it lives in the repo.

## How a change flows

### Visual / copy / brand change

1. Stakeholder asks for the change in the Claude Design canvas
2. The canvas updates `Grupo_ZER.html`, `tokens.css`, and/or `*.json`
3. The canvas (via its GitHub connector, if authorized) opens a PR against `staging` of this repo titled `design: <description>`
   - …or, if no connector, exports a patch the developer applies via Claude Code
4. Claude Code, working in this repo, **propagates** the canvas changes into the appropriate code locations:
   - Token edits → `tailwind.config.js` already pulls from `tokens/`, so the propagation is automatic; just `npm run build` to verify
   - Copy edits → copy `content/*.json` into `messages/` (or have `messages/` symlink/import directly)
   - HTML reference edits → manually translate the visual change into the React component(s); update screenshots in PR description
5. PR lands on `staging`. Review on `staging.zergrupo.com`. Squash-merge.

### Functional / backend change

1. Stakeholder asks the developer (or Claude Code) directly
2. Code-only change → PR against `staging`
3. Design canvas does not need to know

### Content-only change (after CMS phase)

1. Editor logs into Sanity Studio (or equivalent)
2. Publishes new content
3. Vercel rebuilds; no PR, no canvas involvement

## Promotion to production

```bash
# After QA on staging
git checkout main
git merge --ff-only staging
git push origin main
# Vercel auto-deploys main → zergrupo.com
```

## Conflicts

If `tokens.css` from the canvas disagrees with the current Tailwind config, **the canvas wins** and Tailwind config must be regenerated. If the codebase has stylistic needs the canvas doesn't anticipate (e.g., a hover state for a brand-new component), implement it locally **using only existing brand tokens** — never invent new tokens in the codebase. If you genuinely need a new token, request it in the design canvas, let it round-trip.

## What the canvas will never do

- Change route structure (that's an architecture decision)
- Change API contracts
- Change build / deploy configuration
- Modify files under `/app`, `/lib`, `/components` directly

## What the codebase will never do

- Modify `reference/Grupo_ZER.html`, `tokens/*`, or `content/*.json`
- Invent copy not present in the JSON catalog
- Introduce colors, fonts, or visual effects not approved in the brand manual
- Bypass the staging PR review for design changes

## Initial setup checklist

- [ ] Authorize the GitHub connector in the Claude Design project (gives the canvas push access for design PRs)
- [ ] Add `staging` and `main` branch protection rules in GitHub (require review, require status checks)
- [ ] Add a GitHub Action that fails CI if any string in a component is hardcoded outside `messages/`
- [ ] Add a GitHub Action that fails CI if any non-brand color (`#xxxxxx`) appears outside `tokens/`
