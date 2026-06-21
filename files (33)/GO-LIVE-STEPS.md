# Make the website dashboard-driven — update steps

You already have the three projects running locally. This update makes the
website read its services **live from the CMS**, so anything you edit in the
admin dashboard shows up on the site. Follow these once.

## 1. Backend — apply the new database column + reseed

A new `group` field was added to services (for the SEO/marketing menu columns).

```bash
cd codenexsis-backend
npx prisma migrate dev --name add_service_group
npm run db:seed
npm run start:dev
```

`migrate` adds the new column. `db:seed` now loads **all 22 services** (12 core
+ 10 SEO/marketing) so the database matches the site. Existing rows are updated
in place — nothing is lost.

> If `db:seed` says services already exist, that's fine — it upserts.

## 2. Admin — nothing to install, just restart

```bash
cd codenexsis-admin
npm run dev
```

Open http://localhost:3001 → **Services**. You'll now see all 22 services, a new
**market** category option, and a **Marketing group** dropdown (seo / paid /
social / analytics) that appears when a service's category is `market`.

## 3. Website — point it at the API, then restart

In `codenexsis-website/.env` (create it if missing) add:

```
NEXT_PUBLIC_API_URL="http://localhost:4000/api"
```

Then:

```bash
cd codenexsis-website
npm run dev
```

That single variable is the switch. With it set, the site fetches services from
your backend. Without it (or if the backend is down), the site automatically
falls back to its built-in list, so it never breaks.

## 4. Prove it works end-to-end

1. Open the site: http://localhost:3000 — note the services in the nav menus,
   homepage sections, and `/digital-marketing`.
2. In the admin (http://localhost:3001), edit a service — e.g. change a title
   or tagline, or toggle one to unpublished — and save.
3. Refresh the website. Within ~60 seconds (the revalidation window) the change
   appears. To see it instantly, stop and restart `npm run dev`.

That's the whole loop: **edit in dashboard → it's in the database → the website
shows it.**

## What's connected
- Header menus (Services + SEO & Marketing), mobile menu
- Homepage "What we do" + "SEO & Digital Marketing" sections
- `/services`, every `/services/[slug]`, and `/digital-marketing`
- Footer service links and the XML sitemap

## Notes
- The website re-pulls content every 60 seconds (configurable in
  `src/lib/services-data.ts` → `REVALIDATE`).
- New services you add in the dashboard appear automatically — including their
  own `/services/<slug>` page.
- The contact-form service dropdown uses the built-in list (form options only).
- Icons are chosen by name in the dashboard (e.g. `BrainCircuit`, `Search`,
  `Target`); the site maps the name to the icon. Stick to the names shown in
  the icon dropdown so they always resolve.
