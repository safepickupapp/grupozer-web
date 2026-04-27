# Deployment Guide

## Branch strategy

```
main         ──────────●  production (zergrupo.com)
                       │
staging      ───●──────●  staging (staging.zergrupo.com)
                │     ↑
                │     promote with: git checkout main && git merge --ff-only staging
                │
design-*  ──────●  one PR per design change
feature-* ──────●  one PR per feature
```

- **All work** opens a PR against `staging`
- **Production** is updated only by fast-forward merge from `staging` after sign-off
- Squash-merge feature/design PRs into `staging`

## GitHub setup

```bash
gh repo create grupozer/grupozer-web --private --source . --push
git push -u origin staging
git push origin main   # after first promotion
```

Branch protection (GitHub UI):
- `main` — require PR, require status checks (build + lint + typecheck), require linear history
- `staging` — require PR, require status checks
- Disallow force pushes on both

## Vercel setup

1. Import the repo in Vercel
2. Add two custom domains:
   - `zergrupo.com` → tied to **Production** branch (`main`)
   - `staging.zergrupo.com` → tied to **Preview** for the `staging` branch (use Vercel's "branch domain" feature)
3. Add env vars (see `stack.md`) for both **Production** and **Preview** scopes
4. Enable Web Analytics + Speed Insights on Production only

## DNS (at the domain registrar)

| Record | Name | Value |
|---|---|---|
| A | `@` | Vercel IP (per their dashboard) |
| CNAME | `www` | `cname.vercel-dns.com` |
| CNAME | `staging` | `cname.vercel-dns.com` |
| MX | `@` | (existing email provider, do not touch) |
| TXT | `@` | SPF / DMARC for sending domain |
| TXT | `_dmarc` | DMARC policy |
| TXT | `resend._domainkey` | DKIM record from Resend (for the contact-form sender domain) |

SSL is auto-provisioned by Vercel.

## First-deploy checklist

- [ ] Create the repo and push `staging`
- [ ] Connect Vercel to the repo
- [ ] Configure both custom domains
- [ ] Add env vars to both scopes
- [ ] Verify the contact-form sending domain in Resend (DKIM)
- [ ] Confirm `staging.zergrupo.com` renders the homepage in ES and EN
- [ ] Run Lighthouse on staging (target 90+ in all four categories)
- [ ] Run axe-core on staging — fix any WCAG AA violations
- [ ] Submit a test contact form; confirm both founders receive the email
- [ ] Test language persistence: pick EN on home, navigate around, refresh — should stay EN
- [ ] Promote to `main` → confirm `zergrupo.com` is live
- [ ] Submit sitemap to Google Search Console for both `/es/` and `/en/`

## Rollback

```bash
# If main goes bad:
git checkout main
git revert <bad-commit>
git push origin main
# Vercel redeploys automatically
```

For zero-downtime rollback, use Vercel's "Rollback to previous deployment" UI.

## Promotion cadence (suggested)

- Design / copy PRs → land on `staging` daily as needed
- **Friday afternoon promotion window**: review staging, run smoke tests, fast-forward to main
- Hotfixes can promote any time
