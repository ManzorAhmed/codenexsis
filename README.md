# Codenexsis Technologies — Website

Cinematic, polished cyber-tech website built with Next.js 14, TypeScript, CSS Modules, Three.js, and framer-motion.

---

## Tech stack

- **Next.js 14** — App Router, React Server Components, static rendering
- **TypeScript** — strict mode
- **CSS Modules** — scoped, zero-runtime, no Tailwind
- **Three.js** + `@react-three/fiber` + `@react-three/drei` — hero 3D scene
- **framer-motion** — every cinematic scroll animation on the site
- **lucide-react** — icons

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build && npm run start    # production
npm run lint                      # lint
```

---

## Cinematic scroll animations — what you're seeing

This site is built around **scroll-driven motion**. Every section has at least one of:

| Pattern | Where | How |
|---|---|---|
| **Word-by-word reveal** | Hero headline | `framer-motion` variants with custom delay per index |
| **Section parallax** | Hero scene + glow | `useScroll` + `useTransform` mapping `scrollYProgress` to `y` / `opacity` / `scale` |
| **Sticky cinematic reveal** | Manifesto section | 200vh outer + 100vh sticky inner, words fade in as you scroll |
| **Sticky two-column scroll** | Process steps | Left column sticks, right column scrolls past with stagger reveal |
| **Stagger fade-up** | Services list, Testimonials, Portfolio, FAQ, etc. | `StaggerReveal` + `StaggerChild` from `ScrollReveal.tsx` |
| **Number parallax** | About section "120+" | Big number floats up slowly as you scroll |
| **Section fade-up on enter** | All inner-page sections | `<ScrollReveal>` wrapper |

The core animation primitives live in **`src/components/ScrollReveal/ScrollReveal.tsx`**:
- `<ScrollReveal>` — drop-in fade-up wrapper
- `<StaggerReveal>` + `<StaggerChild>` — for cascading lists

Custom scroll-tied effects (Hero, About, Manifesto) use `useScroll()` directly.

---

## Project structure

```
codenexsis-website/
├── public/
│   └── logo.png
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout, fonts, JSON-LD
│   │   ├── page.tsx              # Homepage
│   │   ├── globals.css           # Design tokens, utilities
│   │   ├── about/                # /about
│   │   ├── contact/              # /contact
│   │   ├── portfolio/            # /portfolio
│   │   ├── services/
│   │   │   ├── page.tsx          # /services index
│   │   │   └── [slug]/page.tsx   # /services/:slug (dynamic, SSG)
│   │   ├── not-found.tsx         # 404
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── manifest.ts
│   ├── components/
│   │   ├── Header/               # Sticky scroll-blur header + mega menu
│   │   ├── Footer/               # Big "CODENEXSIS" wordmark footer
│   │   ├── Hero/                 # 3D scene + parallax + word reveal
│   │   ├── Manifesto/            # Cinematic sticky text reveal
│   │   ├── Services/             # Row-based service list
│   │   ├── About/                # Parallax number + copy
│   │   ├── Process/              # Sticky-left, scrolling-right steps
│   │   ├── Testimonials/         # Stagger-reveal grid
│   │   ├── CTA/                  # Dual-CTA gradient box
│   │   ├── PageHero/             # Reusable inner-page hero
│   │   ├── ServiceDetail/        # Service detail layout (CSS only)
│   │   └── ScrollReveal/         # Animation primitives
│   ├── config/
│   │   └── site.ts               # Brand, contact, social, SEO
│   └── lib/
│       └── services.ts           # 8 services + categories + helpers
├── package.json
├── next.config.mjs
└── tsconfig.json
```

---

## Customising

### Brand / contact info
Edit **`src/config/site.ts`** — name, tagline, email, phone, social, address.

### Services
Edit **`src/lib/services.ts`**. Every service has a slug, icon, capabilities, technologies, deliverables, and SEO meta. Pages auto-generate.

### Colors
Edit `:root` in **`src/app/globals.css`**. The whole design uses:
- `--bg`, `--bg-2`, `--bg-3` — backgrounds
- `--text`, `--text-2`, `--text-3` — text hierarchy
- `--red`, `--red-hi`, `--red-lo`, `--red-glow` — single brand accent
- `--line`, `--line-2` — borders

### Hero 3D scene
Edit **`src/components/Hero/HeroScene.tsx`** — wireframe sphere, particle count, colors, lighting.

### Animation timing
All scroll easings are `cubic-bezier(0.16, 1, 0.3, 1)` — change in `ScrollReveal.tsx` to tune the feel globally.

---

## SEO

- Per-route `generateMetadata` (services, etc.)
- JSON-LD: Organization, WebSite, Service, BreadcrumbList, ItemList
- `sitemap.ts`, `robots.ts`, `manifest.ts`
- Open Graph + Twitter cards
- Canonical URLs

Replace `siteConfig.url` in `src/config/site.ts` with your production domain before launch.

---

## Notes

- **Reduced motion** — all framer-motion animations respect `prefers-reduced-motion`. Users who opt out get instant transitions.
- **Three.js dynamic import** — the hero scene is loaded client-side only (`dynamic({ ssr: false })`).
- **No Tailwind** — entirely CSS Modules + design tokens.
- **No localStorage** — fully SSR-safe.

Built by Codenexsis Technologies. Abu Dhabi.
