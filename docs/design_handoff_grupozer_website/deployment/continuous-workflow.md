# Continuous Workflow

How design changes flow from the Claude Design canvas into production after the first deploy. **Read this with `DESIGN_SYNC.md`.**

## The three change types

### 1. Visual / copy / brand changes
**Originate in:** the Claude Design canvas
**Examples:** "Make the SafePickup card bigger", "Change Spanish hero subhead", "Add a fourth pillar", "Soften the navy on hover"

**Flow:**
1. You ask the design canvas
2. Canvas updates `Grupo_ZER.html`, `tokens/tokens.css`, and/or `content/{es,en}.json`
3. Canvas opens a PR against `staging` titled `design: <description>`, body containing:
   - Before/after screenshots
   - Diff summary (what changed in tokens / copy / structure)
   - Component(s) affected
4. **Claude Code** (in this repo) reviews the PR:
   - If it's purely token or copy → already mirrored, just rebuild
   - If it's structural (new section, restructured component) → translate the HTML diff into the React component(s)
5. Push commits to the PR branch with the code-side changes
6. Merge to `staging` → auto-deploys to `staging.zergrupo.com`
7. Stakeholder reviews, approves, fast-forwards to `main`

### 2. Functional / backend changes
**Originate in:** Claude Code (this repo)
**Examples:** New API route, CMS integration, analytics event, form validation rule

**Flow:** standard PR against `staging`. The design canvas is not involved.

### 3. Content-only changes
**Originate in:** the CMS (once phase 2 is live)
**Examples:** New blog post, edited bio, new portfolio card metadata

**Flow:** edit in Sanity Studio → publish → on-demand revalidation re-renders affected pages. No PR.

## Bidirectional sync rules

| If this changes... | ...then propagate to | How |
|---|---|---|
| `tokens/tokens.css` | `styles/tokens.css` | Copy file (or symlink) |
| `tokens/tailwind.config.js` | `tailwind.config.js` (root) | Copy file |
| `content/es.json` | `messages/es.json` | Copy file |
| `content/en.json` | `messages/en.json` | Copy file |
| `reference/Grupo_ZER.html` | manual translation to components | Code review by Claude Code |

A small npm script in `package.json` automates the file copies:
```json
{
  "scripts": {
    "sync:design": "cp design_handoff_grupozer_website/tokens/tokens.css styles/tokens.css && cp design_handoff_grupozer_website/tokens/tailwind.config.js tailwind.config.js && cp design_handoff_grupozer_website/content/*.json messages/"
  }
}
```

Run `npm run sync:design` after any design-canvas PR is merged.

## Recommended cadence

- **Design iterations:** open as small as possible. One PR per logical change. Avoids merge conflicts and makes review fast.
- **Staging review:** stakeholders check `staging.zergrupo.com` daily during active iteration, weekly once stable
- **Production promotion:** weekly on a fixed day (e.g. Friday 4pm) unless hotfix

## When the canvas and the codebase disagree

The **design canvas wins** on visual / copy / brand questions. The **codebase wins** on architecture, performance, accessibility, and integration questions. If you find yourself arguing, you're probably mixing the two — split the disagreement into the two halves and resolve each in its proper home.

## Authorizing the canvas to push PRs

In the Claude Design project for `Grupo ZER Webpage`, ask the design assistant to "connect GitHub". Authorize the connector against the `grupozer/grupozer-web` repo with **write access to the `staging` branch only**. The canvas will then open PRs directly instead of requiring you to copy/paste patches into Claude Code.

## Safety rails (CI checks)

Add these GitHub Actions to enforce the contract:

1. **No hardcoded strings** — fail CI if any `<...>...</...>` text node in `/components/**` is not a `t()` call
2. **No off-brand colors** — fail CI if any hex code outside `tokens/tokens.css` appears in `/components/**` or `/app/**` (allow tonal extensions defined in tokens)
3. **No off-brand fonts** — fail CI if any `font-family` not in tokens is used
4. **Bilingual completeness** — fail CI if `messages/es.json` and `messages/en.json` have different key sets

Workflow files belong under `.github/workflows/design-contract.yml`. Claude Code can scaffold these on first setup.

## What to do on Day 1

1. Run the bootstrap prompt from `README.md` §5 in Claude Code
2. Copy the handoff folder into the repo and `npm run sync:design`
3. Push to GitHub, connect Vercel, configure domains
4. Authorize the GitHub connector in the Claude Design canvas
5. Verify staging deploys cleanly
6. Open the first design-canvas PR (a tiny copy tweak) end-to-end to validate the loop

From here on, every change has a clear home and a clear path to production.
