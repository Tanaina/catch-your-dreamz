# Elegant Star-Dust Hover — Button Glitter + Script Font

## Goal

Two changes to the button, nothing else:

1. **Glitter** — on hover, delicate warm-gold 4-point stars in mixed sizes appear slowly across the pill, twinkling in and out at a calm pace while drifting gently upward, with fine dust between them. Unhurried and refined; approved sample: `glitter-motion-sample-v5.gif`.
2. **Button lettering** — swap the script face on every button to the formal copperplate calligraphy in the `CYD_Butttons.png` reference.

Apart from those two things, the **current live preview is the immutable button baseline**.

## Reference read (moving_dust gif)

- **Pace is slow**: each star fades in, holds, and fades out over roughly 3.4–5.6 seconds; drift travel is small and slow (a few pixels over 13–20 seconds). Nothing flickers.
- **Denser field**: a continuous fine-dust field of roughly 310 in-pill stars plus ~60 in the edge scatter, still with varied spacing and clearly separated glints.
- **Placement**: the field follows the pill silhouette across its full width and height, with most particles contained within that shape and only a soft, narrow spill immediately beyond the ring. The label stays readable.
- **Star shape**: thin, long-pointed 4-point stars with a fine waist; sizes mixed and one step larger than the earlier sample — dust ~2.2–3.6px, mid stars ~5–8.5px, hero stars ~9.5–13px.
- **Colour**: soft warm gold (`--cta-glitter` family); brightness varies by opacity only.
- **Button styling stays exactly as it is**: the reference applies only to the glitter motion and particle appearance, not to the button face, ring, text, hover colour, or typography.

## What changes

### 1. Particle field (button.tsx)

- Every particle renders as a thin 4-point star (no plain round dots), in three size tiers: dust ~66%, mid stars ~28%, hero stars ~6%.
- Deterministic `PARTICLES` table rewritten with a denser distribution, unevenly placed across the full pill silhouette and weighted subtly toward its lower half and curved ends.
- The glitter layer remains visually pill-shaped: the core field is contained to the pill, with a separate restrained edge scatter extending only slightly outside the ring.

### 2. Calm animation (theme.css)

- Each star runs two slow infinite animations while hovered/focused:
  - **Twinkle** — fade and scale in, hold at full brightness, fade out; periods **2.6–4.6s** with staggered delays up to ~3s, so stars arrive in waves rather than all at once.
  - **Drift** — a small, slow rise (about 6–14px over 9–15s) with slight sideways variation.
- No rotation flicker and no fast pulsing; only `opacity` and `transform` animate.
- Animations stay paused until `group-hover` / `group-focus-visible`; `prefers-reduced-motion` disables the effect entirely.

### 3. Button lettering

- The reference uses a formal, high-contrast copperplate calligraphy — noticeably more upright, sharper and more ornate than Great Vibes. Closest faithful web match: **Pinyon Script** (fallbacks if you prefer: Italianno for a lighter, more slanted feel, or Petit Formal Script for a slightly sturdier one).
- Load the chosen family with a `<link>` in the root route head alongside the existing families, and point the `--font-script` token at it so every button (all variants and sizes) picks it up.
- Only the typeface changes: text colour, size, tracking, ring, fill and hover treatment stay exactly as they are today.

### 4. Scope guardrails

- Applies to all clickable button variants (primary / outline / ghost / link), as today.
- Beyond the glitter and the script typeface, preserve the current preview exactly: text colour, ring colour and ring variants, default fill, hover fill/colour, shape, size, spacing, and every existing button token.
- Do not copy the button face, ring, or colours from any reference image; the reference informs the lettering shape only.
- Do not alter any other component or page.
- Files touched: `button.tsx` (particle table + Glitter renderer), the glitter and font sections of `theme.css`, and the font `<link>` in `src/routes/__root.tsx`.

## Technical details

- Star shape via `clip-path` polygon with a narrow waist — crisp at every size, recoloured from `currentColor`.
- All animation via `transform` + `opacity` only; each star sets `--cyd-size`, `--cyd-shimmer`, `--cyd-delay`, `--cyd-drift-dur`, `--cyd-dx`, `--cyd-dy`, `--cyd-max-opacity` inline (the existing inline-style exception for particles).
- Use the smallest particle count that faithfully matches the approved sample, then verify hover playback stays smooth.
- Verification: Playwright frame captures at high DPI, idle vs hovered, confirming slow twinkle, mixed star sizes, readable label, the new lettering, and the reduced-motion off state.
- Compare idle and hover captures against the current preview to confirm nothing beyond the glitter and typeface changed on any variant.

## Open choice

Pinyon Script is my recommendation for the reference lettering. Say the word if you'd rather see Italianno or Petit Formal Script before I build it.

