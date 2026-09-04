# Catch Your Dreamz — design system

A mystical-elegant brand language for a handmade crystal and jewellery studio.
Antique gold on ink and warm off-white, fine script headlines, delicate line
work, generous negative space. Everything reads calm and considered — never
loud, never neon, never corporate SaaS.

## Voice

- Warm, poetic, grounded. "Chase your dreams and catch the sun" is the tagline.
- Copy is sentence case; only eyebrows, labels and button text use wide-tracked caps.
- No exclamation marks, no urgency spam, no growth-hack microcopy.

## Hard constraints

1. **Tokens, never literals.** No hex, rgb, hsl, or arbitrary `px` for anything the
   token set covers. Use the semantic classes (`bg-surface`, `text-foreground-muted`,
   `border-border`, `bg-primary`) in product code; the raw scales
   (`bg-cyd-gold-400`, `bg-cyd-ink-900`) exist to define semantics, not to be
   sprinkled through features. New value needed? Add a token in
   `src/design-system/styles/theme.css` first.
2. **No ad-hoc inline styles.** No `style={{ ... }}` for visual styling; compose
   utilities or add a variant to the component.
3. **Variants, not booleans.** Visual variation is a named prop with a fixed option
   set (`variant`, `size`, `tone`). Do not add `primary`/`big` booleans or fork a
   near-duplicate component.
4. **Semantic elements.** `<button>` for actions, `<a>`/`Link` for navigation,
   labels wired to inputs. Never a clickable `<div>`.
5. **Keyboard first.** Every interactive element is reachable and shows the
   `focus-visible` gold ring. Icon-only controls carry an accessible name.
6. **Both themes.** Anything built must hold up in light and dark — check via the
   `.dark` class on `<html>`.
7. **Composability.** Components merge `className` with `cn()`, forward refs, and
   spread remaining props. Compose the existing components before writing a new one.

## The dominant CTA

The primary `Button` is deliberately NOT gold-filled: it uses the `cta-*` tokens —
a warm smoke-grey base (`bg-cta`) drawn from the business card, soft champagne
lettering and border (`text-cta-foreground`, `border-cta-border`), and a fine
falling gold-glitter animation on hover (`cyd-glitter-particle` +
`cyd-glitter-fall`, disabled under `prefers-reduced-motion`). These tokens are
independent of `--primary`; changing the CTA never changes the gold used by
badges, dividers, rules, focus rings or borders elsewhere. The only permitted
inline styles in the system are the per-particle `left` / size / `animation-delay`
values in the glitter overlay — scatter data, not design values.

## The logo

`src/assets/logos/cyd-logo-circle.png` is the canonical mark: the full circular
emblem with a transparent background. Always render `<Logo />`; never redraw,
recolour, or place it on a white plate.


## Typefaces

- `font-script` (Great Vibes) — the wordmark and at most one hero line per page.
  Never for body, labels, or anything under ~24px.
- `font-display` (Cormorant Garamond) — headings.
- `font-sans` (Jost) — body, UI, labels. Labels and buttons use `cyd-tracked`.

## Layout

8pt spacing rhythm, pill radii for controls, `rounded-lg` for cards, gold-tinted
shadows only (`shadow-sm/md/lg/glow`). Prefer air over density.

## Setup for consuming projects

Import the theme once (`@import "./design-system/styles/theme.css";` after
`@import "tailwindcss";`) and load the three families with `<link>` tags in the
root route head — never `@import` a font URL in CSS. Import components from the
design-system barrel.

See `.lovable/rules/design-tokens.md` and `.lovable/rules/components.md` for the
full token and component reference.
