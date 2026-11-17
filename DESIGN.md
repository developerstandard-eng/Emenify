# Emenify — Design System (design review build)

> Source: the client's three reference banners, as described in the brief. The `/reference`
> folder was not in the workspace when this build started.
> TODO(client): add the banner files to `/reference` so this spec can be checked against them.

## 1. Direction

A corporate B2B site that is calm and exact. Most of each page is white or mist, with deep navy
type and one orange accent. Visual interest comes from a few signature elements (globe, hexagon
tiles, pill stat bar, wave divider), not from decoration on every surface.

## 2. Tokens (`tailwind.config.ts`)

| Token | Value | Use |
|---|---|---|
| `navy` | `#0A1F4D` | Headings, primary text on light, footer |
| `navy-deep` | `#071536` | Dark section, footer bottom bar, button text on orange |
| `accent` | `#F28C1B` | Buttons, eyebrow rule, highlight tag, focus ring, icon accents |
| `accent-hover` | `#D97706` | Button hover |
| `cobalt` | `#1E5BB8` | Globe, links on hover, secondary icon colour |
| `tint` | `#EAF2FC` | Icon tiles, wave fill, badges |
| `mist` | `#F5F9FE` | Alternating section background |
| `body` | `#475569` | Body copy |
| `muted` | `#94A3B8` | Meta text, placeholders (never for essential text on white) |
| `line` | `#E2E8F0` | 1px hairlines, input borders |

**Contrast decisions (WCAG AA)**
- Orange `#F28C1B` on white is 2.5:1, so it fails even for large text. Orange is **never** used
  for text. It is used for fills, rules, icons and focus rings only.
- Orange buttons and the highlight tag use **navy-deep text** (7.1:1), not white.
- Eyebrow labels: orange rule + **navy** italic text.
- `muted` is limited to non-essential metadata at 14px+ and is never the only carrier of meaning.

**Radius:** cards 12px (`rounded-card`), pills 999px, inputs 8px.
**Shadow:** `shadow-soft` = `0 1px 2px rgba(10,31,77,.06), 0 12px 32px -12px rgba(10,31,77,.14)`;
`shadow-lift` (hover) is slightly deeper. No other shadows.
**Spacing:** 8px grid. Sections: `py-16` (64px) mobile → `lg:py-28` (112px) desktop.
**Container:** `max-w-[1200px]`, 24px gutters (16px under 400px), 12-col grid for split layouts.

## 3. Typography

- **Montserrat** 600/700/800 for headings and the wordmark. Letter-spacing `-0.02em`.
- **Inter** 400/500 for body and UI. Line-height 1.65. Paragraphs capped at `65ch`.
- Scale (mobile → desktop): H1 36 → 56, H2 28 → 40, H3 20 → 22, body 16/17, small 14, meta 13.
- Eyebrow: Montserrat 600 italic, 14px, navy, preceded by a 24×2px orange rule.

## 4. Signature elements (and where each is allowed)

| Element | Component | Allowed use |
|---|---|---|
| Eyebrow | `Eyebrow` | Above every H1/H2 |
| Slanted highlight | `HighlightTag` | **Once per page**, one phrase in a headline |
| Pill stat bar | `PillStats` | Home hero; each service section (mini variant) |
| Hexagon icon tile | `HexIcon` | Services, training/career value tiles. Other icons use the round tile |
| Globe | `visuals/Globe` | Home hero only |
| Podium glow | `visuals/Globe` | Home hero only |
| Wave divider | `visuals/WaveDivider` | Bottom of the home hero and inner page heroes; the footer CTA band |

## 5. Gradient budget (max 2 on the whole site)

1. Radial blue glow behind the globe and podium (hero).
2. Sphere shading on the globe (subtle radial, same visual).

Everything else is flat colour plus the soft shadow.

## 6. Layout vocabulary (no section-after-section of centred title + 3 cards)

- Split hero (text 6 cols / visual 6 cols)
- Text + key-facts list (asymmetric 7/5)
- Feature cards (used once on Home for services, once for partnership models)
- Featured + stacked products (1 large, 2 small)
- Logo strip with a side label
- Dark stat block (2×2 counters next to text). **One dark section per page at most**
- Alternating text/visual rows (Services)
- Numbered horizontal process (About, Partnership)
- Calendar list / month grid (Training)
- Table-like list of open roles (Careers)

## 7. Components

`Button` (primary / secondary / ghost; sm / md / lg) · `Eyebrow` · `HighlightTag` · `PillStats`
(default / compact) · `HexIcon` · `SectionHeader` (left or split alignment) · `Card` · `Input`,
`Select`, `Textarea` (one `Field` wrapper: label, required marker, hint, error) · `FileUpload` ·
`Modal` (portal, focus trap, Esc, focus restore) · `Badge` (online / offline / neutral).

## 8. Interaction rules

- Focus: 2px orange ring with 2px offset on every interactive element (`focus-visible`).
- Hover: cards lift 2px and swap to `shadow-lift`; links shift arrows 2px. Nothing moves more than 4px.
- Motion: fade-up 12px, 300ms ease-out, once on scroll. Counters animate once. Globe rings rotate
  slowly (60–120s per turn). No parallax, no bounce. With `prefers-reduced-motion`, all of this is off.
- Icons: lucide, 1.5 stroke, 20px in UI, 24px in tiles.

## 9. Copy rules

Short sentences. Specific nouns. Banned words: unleash, revolutionize, cutting-edge, seamless,
game-changing, synergy, next-level. All placeholder copy is in `src/data/*` and marked
`TODO(client)`.

## 10. Imagery

No stock photos. Placeholders are duotone navy/tint SVG compositions (`visuals/Placeholder`),
each with a `TODO: replace with client photo` comment.
