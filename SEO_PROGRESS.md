# SEO Progress Tracker

Living checklist for the SEO effort on the Next.js app (**pristinehealthstaffing.com** — not the Perfex CRM). Strategy reference: [`seo-plan.html`](./seo-plan.html).

**Architecture:** two buyer-facing acquisition systems under one brand — **Facility Staffing** (nursing homes, assisted living, memory care, SNF, hospitals → admins/DONs/coordinators) and **Home Care** (families). Pages are **data-driven** (service × customer × geography); adding a page = one entry in [`src/lib/marketing/taxonomy.ts`](./src/lib/marketing/taxonomy.ts).

Status key: ✅ done · 🚧 in progress · ⬜ not started

_Last updated: 2026-09-09_

---

## Phase 1 — Foundation + marketing architecture  ✅ (PR #44)

| Item | Status | Where |
|---|---|---|
| SEO config + JSON-LD builders (Org, WebSite, Service, LocalBusiness, Breadcrumb, FAQ, JobPosting) | ✅ | `src/lib/seo.ts` |
| Server-rendered JSON-LD component | ✅ | `src/components/JsonLd.tsx` |
| Root metadata (metadataBase, title template, OG, Twitter, robots) + Org/WebSite | ✅ | `src/app/layout.tsx` |
| `robots.txt` + `sitemap.xml` (taxonomy + open jobs from Mongo) | ✅ | `src/app/robots.ts`, `src/app/sitemap.ts` |
| Middleware allowlist for marketing routes + robots/sitemap | ✅ | `src/proxy.ts` |
| `/facility-staffing` hub + 11 service pages (SSG) | ✅ | `src/app/(marketing)/facility-staffing/` |
| `/home-care` hub + 8 service pages (SSG) | ✅ | `src/app/(marketing)/home-care/` |
| `/locations` hub + 9 WA city hubs (SSG) | ✅ | `src/app/(marketing)/locations/` |
| Per-page Service/LocalBusiness + Breadcrumb + FAQ schema | ✅ | page templates in `src/components/marketing/` |
| Content taxonomy (editable placeholder copy) | ✅ | `src/lib/marketing/taxonomy.ts` |

Verified: `tsc --noEmit` clean, `next build` green (all marketing routes prerendered SSG).

---

## Phase 2 — Buyer intake forms  ✅

Turn the two audiences into leads. Reuses the existing `/api/contact` pipeline (rate limit + honeypot + time-trap + link-flood + reCAPTCHA v3 + `sendContactEmail`); no new API or model.

- ✅ `/request-staffing` — facility intake (facility name/type, roles, city, shifts, urgency, notes)
- ✅ `/request-home-care` — family intake (recipient, care type, city, hours, start, notes)
- ✅ Reuse `/api/contact` (structured fields composed into the message; `inquiryType` set per form)
- ✅ Swap `STAFFING_CTA` / `HOMECARE_CTA` to the new routes + middleware allowlist + sitemap
- ✅ Thank-you / confirmation state (inline success panel)
- ✅ Reusable `IntakeForm` client component (declarative field schema; loads reCAPTCHA)

## Phase 3 — Homepage two-audience split  ⬜

- ⬜ Hero splits Facilities vs Families with two CTAs
- ⬜ Entry points into both systems + featured cities

## Phase 4 — Google for Jobs (`JobPosting`)  ⬜

- ⬜ Server-render `/jobs/[id]` (currently dynamic/client) so schema is crawlable
- ⬜ Emit `jobPostingLd` (builder already exists in `src/lib/seo.ts`)
- ⬜ Optional JobPosition fields: `employmentType`, `baseSalary`, `validThrough`

## Phase 5 — Resources / content hub  ⬜

- ⬜ `/resources` index + article template (schema: Article/FAQ)
- ⬜ Seed cornerstone posts from strategy keywords

## Phase 6 — Off-code (owner tasks, not in repo)  ⬜

- ⬜ Google Business Profile (claim + optimize)
- ⬜ Reviews flow
- ⬜ Google Ads negative-keyword list
- ⬜ Set `NEXT_PUBLIC_BASE_URL` in production env

---

## Decisions

- **Base URL:** `NEXT_PUBLIC_BASE_URL`, defaults to `https://pristinehealthstaffing.com`.
- **Taxonomy in code** (not CMS/DB) — fastest, fully static, version-controlled. Revisit if non-devs need to edit copy.
- **Placeholder copy** in `taxonomy.ts` is drafted from the strategy and **meant to be edited** (H1s, meta descriptions, FAQs).
- `AggregateRating` schema deferred until real reviews exist.

## Open questions for the owner

- [ ] Edit/approve the placeholder copy in `taxonomy.ts` (esp. H1s + meta descriptions).
- [ ] Priority order for Phase 2 vs Phase 3.
- [ ] Confirm the 9 launch cities are the right ones.
