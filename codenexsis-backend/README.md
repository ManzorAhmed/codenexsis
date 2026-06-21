# Codenexsis CMS API (NestJS + Prisma)

A headless CMS that powers the Codenexsis Technologies website and the admin
dashboard. Built with **NestJS 10**, **Prisma 5**, **PostgreSQL**, and **JWT auth**.

It exposes:

- **Public endpoints** the website consumes (published services, blog posts,
  testimonials, SEO meta, settings, and the contact-form submission endpoint).
- **Protected admin endpoints** the dashboard uses to manage every piece of
  content (role-based: `ADMIN` / `EDITOR`).

---

## 1. Requirements

- Node.js 18+
- PostgreSQL 14+ (local, Docker, Supabase, Neon, RDS — anything Postgres)

## 2. Setup

```bash
cd codenexsis-backend
cp .env.example .env          # then edit DATABASE_URL, JWT_SECRET, ADMIN_*
npm install
npx prisma migrate dev --name init   # creates tables
npm run db:seed                       # creates admin user + 12 services + samples
npm run start:dev                     # http://localhost:4000/api
```

Swagger API docs: **http://localhost:4000/api/docs**

> Quick Postgres via Docker:
> `docker run --name codenexsis-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=codenexsis -p 5432:5432 -d postgres:16`

### Default admin (from `.env`)

```
email:    admin@codenexsis.com
password: Admin@12345
```

Change `ADMIN_EMAIL` / `ADMIN_PASSWORD` before seeding in any real environment.

## 3. Environment variables

| Variable          | Purpose                                              |
| ----------------- | ---------------------------------------------------- |
| `DATABASE_URL`    | Postgres connection string                           |
| `JWT_SECRET`      | Secret used to sign JWTs (use a long random string)  |
| `JWT_EXPIRES_IN`  | Token lifetime (default `7d`)                        |
| `PORT`            | API port (default `4000`)                            |
| `CORS_ORIGINS`    | Comma-separated allowed origins (website + admin)    |
| `ADMIN_*`         | First admin account created by the seed script       |

## 4. Data model

`User`, `Service`, `BlogPost`, `SeoMeta`, `Lead`, `Testimonial`, `Setting`
— see `prisma/schema.prisma`.

## 5. API reference (prefix `/api`)

### Auth
| Method | Path          | Access | Notes                    |
| ------ | ------------- | ------ | ------------------------ |
| POST   | `/auth/login` | public | returns `{ accessToken, user }` |
| GET    | `/auth/me`    | auth   | current user             |

### Services  *(drives `/services` + `/services/[slug]` on the site)*
| Method | Path                    | Access        |
| ------ | ----------------------- | ------------- |
| GET    | `/services`             | public (published only) |
| GET    | `/services/slug/:slug`  | public        |
| GET    | `/services/all`         | admin/editor  |
| POST   | `/services`             | admin/editor  |
| PATCH  | `/services/:id`         | admin/editor  |
| DELETE | `/services/:id`         | admin         |

### Blog
`GET /blog` (public), `GET /blog/slug/:slug` (public), `GET /blog/all`,
`POST /blog`, `PATCH /blog/:id`, `DELETE /blog/:id`.

### SEO meta (per-page overrides)
`GET /seo` (public), `GET /seo/by-path?path=/services` (public),
`PUT /seo` (upsert), `DELETE /seo?path=/services`.

### Leads (contact form + sales pipeline)
`POST /leads` (public, rate-limited 5/min), `GET /leads`, `GET /leads/stats`,
`PATCH /leads/:id`, `DELETE /leads/:id`.

### Testimonials
`GET /testimonials` (public), `GET /testimonials/all`, `POST`, `PATCH`, `DELETE`.

### Settings (contact info, social links, flags…)
`GET /settings` (public), `GET /settings/:key` (public), `PUT /settings`, `DELETE /settings/:key`.

### Users (admin only)
Full CRUD at `/users`.

## 6. Auth model

A global `JwtAuthGuard` protects everything except routes marked `@Public()`.
A `RolesGuard` enforces `@Roles(...)`. Send the token as:

```
Authorization: Bearer <accessToken>
```

## 7. Connecting the website (optional)

The website currently reads services from `src/lib/services.ts` (static, fast,
SEO-friendly). To make it dynamic, fetch from this API instead, e.g. in a
Server Component:

```ts
const res = await fetch(`${process.env.API_URL}/api/services`, {
  next: { revalidate: 300 },
});
const services = await res.json();
```

Keep the static file as a fallback so the site never hard-depends on the API.

## 8. Scripts

| Script                | Action                                  |
| --------------------- | --------------------------------------- |
| `npm run start:dev`   | Watch mode                              |
| `npm run build`       | Compile to `dist/`                      |
| `npm run prisma:migrate` | Create/apply a migration             |
| `npm run db:seed`     | Seed admin + content                    |
| `npm run prisma:studio` | Visual DB browser                     |
