# Emenify website (design review build)

A front-end prototype of the redesigned emenify.com, for client design review. It has no backend:
forms validate and simulate submission unless an endpoint is configured.

Stack: Vite, React 18, TypeScript, Tailwind CSS, React Router 6, react-hook-form + zod,
lucide-react, Framer Motion. Fonts: Montserrat and Inter, self-hosted via @fontsource.

## Run

Requires Node 18+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve dist/ on http://localhost:4173
npm run lint
npm test           # Vitest + React Testing Library (4 form suites, 14 tests)
```

### Form endpoint

Copy `.env.example` to `.env`. If `VITE_FORM_ENDPOINT` is set, every form POSTs `multipart/form-data`
(including the CV file) to that URL, with a `form_type` field. If it is empty, submissions wait 800ms,
succeed, and log the payload to the browser console.

In production, the endpoint should email each submission to the client. The client still has to
confirm the address; see `src/lib/forms.ts`.

### Hosting

This is a single-page app. The host must serve `index.html` for unknown paths (Netlify `_redirects`,
a Vercel rewrite, or an Apache/Nginx fallback), so that deep links such as `/services#training-solutions` work.

## Where things live

```
src/
  data/          All copy and content: site.ts, services.ts, products.ts, partners.ts, events.ts, jobs.ts
  components/
    ui/          Primitives: Button, Eyebrow, HighlightTag, PillStats, HexIcon, SectionHeader, Card,
                 Input/Select/Textarea/Checkbox (Field.tsx), FileUpload, Modal, Badge, Reveal
    layout/      Header, ServicesDropdown, MobileDrawer, Footer (with CTA band), ScrollManager
    sections/    Page sections (home hero, highlights, page hero, etc.)
    forms/       The four forms, shared form parts, and their tests
    visuals/     SVG visuals: Globe, WaveDivider, Placeholder, PartnerLogo, Wordmark
  pages/         One file per route (lazy-loaded)
  lib/           forms.ts (submitForm), schemas.ts (zod), spamGuard.ts, recaptcha.ts, dates.ts, icons.ts
```

Design rules and tokens are in `DESIGN.md`.

## Decisions made without client input

- **Contact page (`/contact`).** The brief puts a "Contact Us" button in the header but lists no
  contact page. I added `/contact` with the General Enquiry form. Service CTAs link to it with the
  topic prefilled (`/contact?topic=…`).
- **Orange buttons use navy text.** White on `#F28C1B` is 2.5:1 and fails WCAG AA. Navy-deep on
  orange is 7:1.
- **Reference banners.** `/reference` was empty, so the design follows the brief's description of
  the banners. Please add the files so the direction can be checked against them.
- **Event times** are shown in Gulf Standard Time (`Asia/Dubai`), whatever the visitor's time zone.

## Content to replace

Search the code for `TODO(client)`, `TODO(prod)` and `TODO: replace` to find every placeholder.

- [ ] **Logo.** Replace the text wordmark in `src/components/visuals/Wordmark.tsx` and `public/favicon.svg`
- [ ] **Contact details.** Email, phone, address, hours and social URLs (`src/data/site.ts` → `company`)
- [ ] **Form destination email.** Confirm it, and set `VITE_FORM_ENDPOINT` (`src/lib/forms.ts`)
- [ ] **Hero, about intro and CTA copy** (`src/data/site.ts` → `home`, `ctaBand`)
- [ ] **Key facts and stat counters.** Founded year, regions, clients, uptime, response time,
      people trained (`home.about.facts`, `home.why.counters`). All four counters are placeholders
- [ ] **Service figures** on the Services page cards: response time, assessment length, pass rate
      (`src/pages/Services.tsx` → `visuals`)
- [ ] **About.** Overview, highlights, mission, vision, approach steps (`src/data/site.ts` → `about`)
- [ ] **Leadership.** Names, roles and photos. Set `people` to `[]` to hide the section
- [ ] **Services copy and capabilities** (`src/data/services.ts`)
- [ ] **Products.** Names, descriptions, features, screenshots and the comparison table
      (`src/data/products.ts`, `src/pages/Products.tsx` → `comparison`)
- [ ] **Partners.** Real names, URLs and SVG logos in `public/partners/`, set via `logo` (`src/data/partners.ts`)
- [ ] **Partnership models and benefits** (`src/data/site.ts` → `partnership`)
- [ ] **Training schedule** (`src/data/events.ts`; the comment at the top explains how to add events
      and how the fields map to The Events Calendar in WordPress)
- [ ] **Open positions** (`src/data/jobs.ts`)
- [ ] **Photography.** Every `Placeholder` component is a duotone stand-in for a client photo
- [ ] **Privacy policy link** in the form consent checkboxes, once the page exists
- [ ] **Legal footer line**, e.g. trade licence or entity name, if required (`Footer.tsx`)
- [ ] **reCAPTCHA v3** (TODO(prod)). Add the site key and implement `src/lib/recaptcha.ts`, then verify the token server-side
- [ ] **Meta description** in `index.html`
