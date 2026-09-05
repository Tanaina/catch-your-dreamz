# Elegant Star-Dust Hover — Button Glitter Rebuild

## Goal

Match the moving reference: on hover, delicate warm-gold **4-point stars in mixed sizes** appear slowly across and just beyond the pill, twinkling in and out at a calm pace while drifting gently upward, with fine dust specks between them. Unhurried and refined — never a fast, busy shimmer, never a dotted border or grid.

The **current live preview is the immutable button baseline**. The earlier sample's button styling is rejected; only the glitter's appearance and movement are relevant.

## Reference read (moving_dust gif)

- **Pace is slow**: each star fades in, holds, and fades out over roughly 3–5 seconds; drift travel is small and slow (a few pixels over 9–15 seconds). Nothing flickers.
- **Denser, but refined**: increase the sample's particle count enough to create a continuous fine-dust field while retaining varied spacing and clearly separated star glints.
- **Star shape**: thin, long-pointed 4-point stars with a fine waist; sizes mixed — dust ~1.5–3px, mid stars ~7–13px, hero stars ~15–24px.
- **Placement**: the field follows the pill silhouette across its full width and height, with most particles contained within that shape and only a soft, narrow spill immediately beyond the ring. The label stays readable.
- **Star shape**: thin, long-pointed 4-point stars with a fine waist; sizes mixed and deliberately restrained — dust ~1.4–2.6px, mid stars ~4–7.5px, hero stars ~8.5–12px (no oversized stars).
- **Button styling stays exactly as it is**: the reference applies only to the glitter motion and particle appearance, not to the button face, ring, text, hover colour, or typography.

## What changes

### 1. Particle field (button.tsx)

- Every particle renders as a thin 4-point star (no plain round dots), in three size tiers: dust ~50%, mid stars ~35%, hero stars ~15%.
- Deterministic `PARTICLES` table rewritten with a denser distribution, unevenly placed across the full pill silhouette and weighted subtly toward its lower half and curved ends.
- The glitter layer remains visually pill-shaped: the core field is contained to the pill, with a separate restrained edge scatter extending only slightly outside the ring.

### 2. Calm animation (theme.css)

- Each star runs two slow infinite animations while hovered/focused:
  - **Twinkle** — fade and scale in, hold at full brightness, fade out; periods **2.6–4.6s** with staggered delays up to ~3s, so stars arrive in waves rather than all at once.
  - **Drift** — a small, slow rise (about 6–14px over 9–15s) with slight sideways variation.
- No rotation flicker and no fast pulsing; only `opacity` and `transform` animate.
- Animations stay paused until `group-hover` / `group-focus-visible`; `prefers-reduced-motion` disables the effect entirely.

### 3. Scope guardrails

- Applies to all clickable button variants (primary / outline / ghost / link), as today.
- **Glitter only.** Preserve the current preview exactly: Great Vibes font and styling, text colour, ring colour and ring variants, default fill, hover fill/colour, shape, size, spacing, and every existing button token.
- Do not copy the button face, typography, ring, or colours from any visual sample; a sample is only a reference for glitter motion.
- Do not alter any other component or page.
- Only `button.tsx` (particle table + Glitter renderer) and the glitter section of `theme.css` (keyframes + star rendering) are touched.

## Technical details

- Star shape via `clip-path` polygon with a narrow waist — crisp at every size, recolours from `currentColor`.
- All animation via `transform` + `opacity` only; each star sets `--cyd-size`, `--cyd-shimmer`, `--cyd-delay`, `--cyd-drift-dur`, `--cyd-dx`, `--cyd-dy`, `--cyd-max-opacity` inline (the existing inline-style exception for particles).
- Use the smallest particle count that faithfully matches the denser approved sample, then verify hover playback remains smooth.
- Verification: Playwright frame captures at high DPI, idle vs hovered, confirming slow twinkle, edge bleed, mixed star sizes, readable label, and the reduced-motion off state.
- Compare idle and hover captures against the current preview to confirm that no non-glitter styling changed on any variant.

## Open choice

The replacement visual sample must use a direct capture of the current preview button as its unchanged base and add only the denser, pill-shaped glitter overlay. The earlier sample's button styling is discarded entirely.
