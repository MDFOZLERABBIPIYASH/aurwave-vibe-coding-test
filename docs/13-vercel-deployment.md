# Vercel Deployment Strategy

## Environments

Production

Main public website. Currently live at
`https://aurwave-vibe-coding-test.vercel.app/`.

Preview

Automatic preview deployment for development branches and pull
requests. Each PR gets a unique `*.vercel.app` URL with the
current branch's code.

Local

Developer and AI testing environment. `npm run dev` for the
dev server, `npm run build && npm run start` for the
production build locally.

---

## Deployment Flow

```
Local Development
       ↓
   Git Push
       ↓
  GitHub (commit lands on `main`)
       ↓
  GitHub Actions CI (lint, type-check, unit, build, E2E)
       ↓
  Vercel auto-deploy (production on `main`, preview on PRs)
       ↓
  Live URL: aurwave-vibe-coding-test.vercel.app
```

The Vercel project is configured to auto-deploy on every push
to `main`. CI on GitHub Actions is the upstream quality gate
that runs before the deploy.

---

# How to deploy a new change

1. **Develop locally.** Run `npm run dev`. Watch the dev server
   for compile errors and runtime warnings.
2. **Validate before pushing.** Run `npm run validate` to catch
   lint, type, and unit-test issues locally (~3s). Run
   `npm run test:e2e` if you have time (full matrix takes ~3 min).
3. **Commit with a conventional prefix.** `feat:`, `fix:`,
   `test:`, `ci:`, `docs:`, `chore:`, `refactor:` etc. One
   logical change per commit. See `docs/12-version-control.md`
   for the full commit rules.
4. **Push to `main`.** Vercel detects the push, builds, and
   deploys automatically. The build log appears in the Vercel
   dashboard under **Deployments**.
5. **Verify the live URL.** Open `https://aurwave-vibe-coding-test.vercel.app/`
   in a browser and confirm the change is live. For a longer
   feature, check the relevant route (`/work`, `/services`,
   `/contact`, etc.) directly.
6. **Update the CHANGELOG.** Per `CLAUDE.md`, every meaningful
   change must land in `CHANGELOG.md` before the task is
   considered complete.

---

# Production rules

Production deploys should only happen when:

- Tests pass
- Build passes
- No critical issues exist

The CI on `main` is the gate. If CI is red, fix it before
merging. The Vercel deploy will still run on every push to
`main` regardless of CI status, but the deploy will not
promote past "preview" if the build itself fails.

---

# Environment Variables

Configure sensitive / per-environment variables through
Vercel. Do not commit production secrets.

Use `.env.example` (committed) for documentation of which
variables exist and what they do.

## Variables the project actually reads

| Variable | Where it's read | Production value |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `src/lib/site.ts` (`siteConfig.url`), `src/app/sitemap.ts`, `src/app/layout.tsx` (`metadataBase`) | `https://aurwave-vibe-coding-test.vercel.app` |
| `CONTACT_EMAIL` | `src/lib/site.ts` (`siteConfig.email`) — feeds the footer mailto and the contact-form success panel | `f.r.p.421l@gmail.com` |

Both variables are read at build time and inlined into the
client bundle (the `NEXT_PUBLIC_` prefix makes Next.js expose
them to the browser; `CONTACT_EMAIL` is also a public-facing
address because it appears in the rendered HTML as a
`mailto:`).

The values above are also the **defaults** in `src/lib/site.ts`
when the env vars are unset, so the site still builds and
works locally without a `.env.local`. The only difference in
production is the sitemap and metadata will use the real
deployed URL instead of `http://localhost:3000`.

## Variables the project does NOT yet read

These are listed in `.env.example` for forward compatibility but
are not consumed by any current code path:

- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (Phase 14)
- `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` (Phase 14)
- `SENTRY_DSN` (Phase 14)

## Setting env vars in Vercel

1. Go to the Vercel project → **Settings** → **Environment
   Variables**.
2. Add each variable with the right scope:
   - **Production** — for the live URL.
   - **Preview** — for PR previews (optional but recommended).
   - **Development** — for `vercel dev` (rarely used here).
3. After adding, **redeploy** so the new values take effect
   (env-var changes do not auto-rebuild).

---

# How to set the production URL after the first deploy

1. The first deploy will work even if `NEXT_PUBLIC_SITE_URL` is
   unset — `siteConfig.url` falls back to the localhost URL
   and the build still passes. The only visible problem is the
   sitemap and metadata will reference `http://localhost:3000`.
2. After the first deploy, copy the assigned `*.vercel.app`
   URL from the Vercel dashboard.
3. Set `NEXT_PUBLIC_SITE_URL` in Vercel to that URL.
4. Trigger a redeploy from the dashboard. The sitemap and
   metadata will now reference the real URL.

---

# Custom domain

To use a custom domain:

1. Buy the domain from any registrar.
2. In Vercel, go to **Settings** → **Domains** and add the
   domain. Vercel will show the DNS records to add at the
   registrar.
3. Update `NEXT_PUBLIC_SITE_URL` in Vercel env vars to the
   custom domain.
4. The repo's `sitemap.xml` and `metadataBase` will pick up the
   new URL on the next deploy — no code change required.

---

# Deployment Monitoring

After each production deploy, watch for:

- **Build failures** — Vercel surfaces these in the dashboard.
  The CI on `main` will also fail (lint / type-check / unit /
  build / E2E) so a broken build is caught in two places.
- **Runtime errors** — see `docs/15-maintenance-and-monitoring.md`
  for the post-launch monitoring plan (Phase 14, Vercel
  Analytics + Sentry).
- **Performance regressions** — Vercel Analytics surfaces
  Core Web Vitals per deploy.
- **Deployment status** — Vercel → Deployments shows the full
  history; `git log` + `git tag` give the commit-and-tag view.

---

# Rollback

Every Vercel deployment is reversible.

If a production deploy causes a critical issue:

1. Identify the last stable deployment in the Vercel dashboard
   (look for the most recent one before the regression).
2. Click the three dots on that deployment → **Promote to
   Production**. Vercel rolls the live URL back to that build
   in seconds.
3. Investigate the issue. The bad commit is in `git log`; check
   the Vercel build log for the failure.
4. Create a fix on a new branch, run `npm run validate` +
   `npm run test:e2e` to confirm the fix works.
5. Merge the fix to `main`. Vercel will deploy it.

If the rollback itself is bad, repeat the same process — the
previous good deployment is still in the Vercel history.

---

# Local production simulation

To verify the production build locally before pushing:

```bash
npm run build
npm run start -- --port 3030
```

Visit `http://localhost:3030/`. The build is identical to
what Vercel will run; the only difference is the URL. Set the
env vars in a `.env.local` file first if you want to test the
production URL handling.

---

# Reference

- Vercel project: `aurwave-vibe-coding-test`
- GitHub repo: `https://github.com/MDFOZLERABBIPIYASH/aurwave-vibe-coding-test`
- Production URL: `https://aurwave-vibe-coding-test.vercel.app/`
- Vercel CLI: not installed in this project — all deploys
  happen via the GitHub integration.
