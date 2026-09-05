# All-Star Fairy Dust Hover — Button Glitter Rebuild

## Goal

Rebuild the button hover effect so it matches the uploaded "fine dust" reference: a **dense field of very fine bronze-gold dust** — hundreds of tiny specks packed across the whole pill, brightest where they cluster — with occasional brighter 4-point star flares scattered through it. Every particle is a star/glint (no plain dots), continuously shimmering and drifting while the button is hovered or focused. Organic and irregular — never a dotted border, ring, or grid.

## Reference read (uploaded images, incl. the bronze star-flow gif)

- The dust is **fine and dense**: the mass of the effect is specks ~1–2px, not stars.
- **Density gradient**: specks cluster thickly and thin out toward the edges — on the button this becomes densest through the middle band of the pill, softer toward the top/bottom edges and just past the pill bounds.
- **Star flares**: a visible minority are crisp 4-point stars with long tapered needles, in mixed sizes (~5–14px), flashing brighter than the dust — like the star-flow gif, where distinct stars ride through the dust stream rather than sitting in a uniform sprinkle.
- **Flow**: the field reads as a moving stream — particles travel along a shared gentle diagonal while twinkling, not just pulsing in place.
- Colour: warm gold/bronze throughout (`--cta-glitter` family); brightness varies by opacity, not hue.


## What changes

### 1. Particle field (button.tsx)

- Remove the round-dot particle rendering (`cyd-glitter-particle::before` solid disc) — everything renders as a star glint (crossed hairline needles + tiny core) scaled small.
- Rewrite the deterministic `PARTICLES` table to **~400 particles**, in three tiers:
  - **Dust (~85%)**: 1.5–3px micro-stars, tightly scattered with deliberate clustering (denser mid-band, sparser edges, some just outside the pill via negative/>100% positions — the glitter layer overflows visibly rather than clipping at the border).
  - **Small stars (~12%)**: 4–6px.
  - **Flares (~3%)**: 8–12px, brighter twinkle curve.
- Positions uneven (no ring/grid); the layer switches from `overflow-hidden` to `overflow-visible` so dust bleeds slightly past the pill edges, as in the reference.

### 2. Continuous animation (theme.css)

- Each particle runs **two simultaneous infinite animations** while hovered/focused:
  - **Twinkle** — opacity/scale pulse, periods 0.8–2.2s, staggered delays, so the field is alive and roughly half the dust is mid-flash at any instant.
  - **Drift** — per-particle translate vector (varied dx/dy, gentle, mostly downward-sideways, some upward/diagonal), 3–7s periods.
- Flares use a longer, sharper curve (quick scale-up + full-opacity flash, then fade).
- Animations stay `paused` until `group-hover` / `group-focus-visible`; `prefers-reduced-motion` disables the effect entirely.

### 3. Scope guardrails

- Applies to all clickable button variants (primary / outline / ghost / link), as today.
- No changes to button shape, sizes, typography, colours, hover fill, or any other component or page.
- Only `button.tsx` (particle table + Glitter renderer) and the glitter section of `theme.css` (keyframes + star rendering) are touched.

## Technical details

- Star shape: existing cross-needle gradient technique (hard-stop linear gradients, 1px needles + inset core) — crisp at small sizes, recolours via `currentColor`.
- All animation via `transform` + `opacity` only (GPU-cheap); each star sets CSS vars `--cyd-dx`, `--cyd-dy`, `--cyd-shimmer`, `--cyd-drift-dur`, `--cyd-delay` inline (the existing inline-style exception for particles).
- ~400 spans per button is acceptable for hover-only playback, but I'll verify paint smoothness in the preview and trim toward ~250 if needed.
- Verification: Playwright screenshots of the components page at high DPI, idle vs hovered, confirming full-surface dense dust, edge bleed, bright flares, no ring pattern, and reduced-motion off state.

## Options to pick

Density is locked at the reference's dense-dust level per your feedback. One style choice remains:

1. **Style A — restrained**: gentle drift (2–6px travel, dust hanging in air), subtle flares (max ~10px).
2. **Style B — richer**: flowing drift (8–14px travel, visible falling/sprinkling like the reference swirl), prominent flares (max ~14px).

If no preference is stated, the build uses Style B (closest to this new reference image).
