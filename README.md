# RocStars DJ Academy — Website

Production-grade Next.js site for RocStars DJ Academy.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Netlify

---

## Quick start (local development)

You'll need [Node.js 18.17+](https://nodejs.org/) installed. Open a terminal and:

```bash
cd web
npm install
npm run dev
```

Visit **http://localhost:3000**. Edit any file and the page hot-reloads.

To build for production:

```bash
npm run build
npm run start
```

---

## Project layout

```
web/
├── app/                       Next.js App Router pages
│   ├── layout.tsx               Root layout (Nav + Footer + WhatsApp FAB)
│   ├── globals.css              Tailwind base + brand tokens
│   ├── page.tsx                 / Home
│   ├── about/page.tsx           /about
│   ├── courses/page.tsx         /courses
│   ├── enrol/page.tsx           /enrol (lead form)
│   ├── gallery/page.tsx         /gallery
│   └── contact/page.tsx         /contact (contact form)
│
├── components/
│   ├── layout/                  Nav · Footer · WhatsAppFab
│   ├── sections/                Hero · Pathway · Courses · Instructors · …
│   └── ui/                      Button · Container · Section · Reveal
│
├── lib/
│   ├── data.ts                  All site content (single source of truth)
│   └── cn.ts                    tiny classname helper
│
├── public/
│   └── logo.jpg                 Brand logo (B&W wordmark)
│
├── tailwind.config.ts           Electric Neon design tokens
├── next.config.mjs              Next.js config (image domains, etc.)
├── netlify.toml                 Netlify build config
└── package.json
```

---

## Editing content

Every piece of copy, every course, every instructor, every FAQ lives in **`lib/data.ts`**. To update prices, swap a bio, change cohort dates, edit that one file — pages re-render automatically.

```ts
// lib/data.ts
export const COURSES = [
  {
    slug: 'beginner',
    title: 'Beginner DJ Course',
    priceTTD: 1950,     // <- change this
    durationWeeks: 6,
    // ...
  },
  // ...
];
```

---

## Replacing the placeholder images

Right now the site loads hero/gallery/instructor images from the Higgsfield CDN. These are **placeholders**. For production:

1. Take real photos of the studio, instructors, showcase nights.
2. Drop them in `public/images/`.
3. In `lib/data.ts`, change the `IMAGES` object to reference your local paths:

```ts
export const IMAGES = {
  heroBooth: '/images/hero-booth.jpg',
  equipment: '/images/equipment.jpg',
  // ...
};
```

Once that's done you can delete the `remotePatterns` block in `next.config.mjs`.

---

## Deploying to Netlify

The repo is pre-configured for Netlify (`netlify.toml` is set up with the official Next.js plugin).

**One-time setup:**

1. Push this `web/` folder to a GitHub repo (you can put just the `web/` directory at the repo root).
2. Go to [app.netlify.com](https://app.netlify.com), click **"Add new site → Import an existing project"**.
3. Connect your GitHub account, pick the repo.
4. Netlify auto-detects Next.js — accept the defaults. Build command is `npm run build`, publish dir is `.next`.
5. Click **Deploy**.

Your site is live within ~2 minutes at a `*.netlify.app` URL.

**Adding a custom domain (when ready):**

1. Buy the domain (Namecheap, Hostinger, Cloudflare — any registrar).
2. In Netlify → Site settings → Domain management → Add custom domain.
3. Follow the DNS instructions Netlify gives you (usually 2–4 records on the registrar side).
4. SSL is auto-issued via Let's Encrypt; no action needed.

---

## Forms

The Enrolment form and Contact form currently show a success message but **don't actually send anywhere yet**. When you're ready to wire them up, the simplest options are:

- **Netlify Forms** (free, zero-code) — add `data-netlify="true"` to the `<form>` tag and forms post to Netlify automatically. Submissions appear in the Netlify dashboard. Wire-up takes ~2 minutes.
- **Formspree / Web3Forms** — replace the `onSubmit` handler with a `fetch` to their API.
- **Supabase / Firebase** — full backend with a DB if you want to build a student dashboard later.

Pick when you're ready, ping me, I'll wire it.

---

## Design tokens

Brand colours, type, spacing — all in `tailwind.config.ts`. Custom keyframes (ticker, scroll cue, pulse) are defined there too. The Electric Neon palette:

| Token | Hex | Use |
|------|-----|-----|
| `ink` | `#06060B` | Page background |
| `ink-2` | `#0B0B12` | Card background |
| `electric` | `#0066FF` | Primary accent |
| `violet` | `#A855F7` | Secondary accent |
| `cyan` | `#00E5FF` | Highlight |

Display font: **Anton** (Google Fonts) · Body: **Inter**.

---

## Scaling later

The codebase is structured to grow into the future scope from the brand brief:

- **Student portal** → add `/dashboard` route, gate with NextAuth + Supabase
- **Online courses** → add `/learn/[course]/[lesson]` routes, video via Mux or Cloudflare Stream
- **Payments** → Stripe integration, replace the seat-locking form with a real checkout
- **Memberships** → Stripe subscriptions + Supabase row-level security
- **Merch store** → Shopify Buy SDK or a small e-commerce backend
- **CMS** → swap `lib/data.ts` for Sanity or Contentlayer when content gets big

The component architecture keeps these additions clean — sections are independent, data is centralised, pages are composable.
