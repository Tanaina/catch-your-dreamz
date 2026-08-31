# Catch Your Dreamz — Design System Starter

Build the first version of the design system from the shared brand references: the circular "Chase your dreams and catch the sun" logo, the business card, and the SVG logo files. The look is mystical-elegant: gold on white/near-black, fine script display type, delicate line art.

## Brand foundation

- Gold accent taken from the logo files (`#d4af37`) as the primary brand color, with lighter/darker steps for hover and borders.
- Ink black and warm off-white as the base surfaces, plus a muted grey for secondary text and hairline borders.
- Display face: an elegant script/serif for headlines echoing the "Catch Your Dreamz" wordmark. Body face: a clean, wide-tracked sans matching the "CHASE YOUR DREAMS" ring lettering.
- Spacing on an 8pt rhythm, soft/pill radii, and light gold-tinted shadows.

## What gets built

1. **Tokens** — colors (brand, semantic surfaces, text, border, states), typography scale, spacing, radius, and shadows, defined as CSS variables plus Tailwind v4 `@theme` mapping so both the preview app and consumer projects get them from one import.
2. **Brand assets** — the uploaded logo files committed under `src/assets/logos/` byte-for-byte and used by the showcase; favicon set from the mark.
3. **Starter components** (each token-driven, with variants, keyboard-accessible, ref-forwarding, `className` merged):
   - Button (primary gold, outline, ghost, link; sm/md/lg; loading + disabled)
   - Input, Textarea, Label, and a Field wrapper with help/error text
   - Card (with header/title/description/content/footer)
   - Badge / Tag
   - Divider with an optional ornamental gold rule
   - Heading + Text typography primitives
   - Logo component rendering the brand mark
4. **Barrel** — `src/index.ts` re-exporting every component so attached projects can import them.
5. **Showcase** — a preview-only site with shared navigation: Overview, Colors, Typography, Components (searchable sidebar, every variant and state, realistic Catch Your Dreamz copy). Light/dark toggle if both themes are defined.
6. **Knowledge** — `.lovable/meta.yaml` filled in (react / tailwind / local) and `.lovable/system.md` seeded with the design philosophy, hard constraints (tokens not raw values, no ad-hoc inline styles, accessibility baseline), and usage conventions.

## Technical notes

- Tailwind CSS v4, configured CSS-first in `src/styles.css` (`@theme` / `@theme inline`); no `tailwind.config.js`.
- Fonts loaded via `<link>` in `src/routes/__root.tsx`, never a CSS `@import` URL.
- All design-system source lives self-contained under one folder so the file-copy attach carries it; showcase routes stay out of the barrel and out of consumer copies.
- `cn()` class-merge helper added alongside the components.

After this lands you can refine palette, type, and component APIs iteratively.
