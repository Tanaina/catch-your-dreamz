# All-Star Fairy Dust Hover — Button Glitter Rebuild

## Goal

Rebuild the button hover effect so every particle is an animated star (no dots, no static particles), continuously shimmering and drifting in warm bronze-gold while the button is hovered or focused — matching the "CYD Buttons with glitter" reference: fine magical fairy dust with intermittent bright star flares, organic and irregular, never a dotted border or ring arrangement.

## What changes

### 1. Every particle becomes a star (button.tsx)

- Remove the pinpoint-round-speck particle type entirely; the `cyd-glitter-particle::before` round-dot rendering goes away.
- All particles render as 4-point star glints (crossed hairline needles + tiny core), in a **mix of sizes**:
  - tiny (~3–4px), small (~5–6px), medium (~7–8px), and occasional larger flares (~10–12px) per button.
- The deterministic `PARTICLES` table is rewritten: **~208 stars (8x the original density)** scattered across the full button surface (varied `left`/`top` percentages, deliberately uneven so no ring or grid pattern emerges). Because every star runs its own out-of-phase twinkle cycle, roughly half are mid-flash at any instant — a dense, living field rather than a static starfield.

### 2. Every star animates continuously (theme.css)

- No static particles: each star gets **two simultaneous infinite animations** while hovered/focused:
  - **Shimmer/twinkle** — opacity and scale pulse with varied periods (0.8–2.2s) and staggered delays, so stars twinkle out of phase.
  - **Drift/fall** — each star translates along its own vector (different dx/dy per star, mostly gentle downward-with-sideways drift, some upward or diagonal), 3–7s periods, so motion is organic and irregular — never a shared circular or pill-shaped path.
- **Intermittent bright flares**: the larger stars use a longer, sharper twinkle curve (quick scale-up + full-opacity flash, then fade) so they read as occasional brilliant glints among the dust.
- Colour: warm bronze-gold (`--cta-glitter` family — `#b08a57` light / `#d6c17a` dark), matching the reference; brightness variation comes from opacity, not extra hues.
- Confined to the button: the glitter layer stays `absolute inset-0` with `overflow-hidden`, so stars animate within the pill (no visible ring of particles, no spill as a border).
- Animations remain `paused` until `group-hover` / `group-focus-visible`, and `prefers-reduced-motion` still disables the effect entirely.

### 3. Scope guardrails

- Applies to all clickable button variants (primary / outline / ghost / link), as today.
- No changes to button shape, sizes, typography, colours, hover fill, or any other component or page.
- Only `button.tsx` (particle table + Glitter renderer) and the glitter section of `theme.css` (keyframes + star rendering) are touched.

## Technical details

- Star shape: existing cross-needle gradient technique (hard-stop linear gradients, 1px needles + inset core) — crisp at small sizes, recolours via `currentColor`.
- All animation via `transform` + `opacity` only (GPU-cheap); each star sets CSS vars `--cyd-dx`, `--cyd-dy`, `--cyd-shimmer`, `--cyd-drift-dur`, `--cyd-delay` inline (the existing inline-style exception for particles).
- Verification: Playwright screenshots of the components page at high DPI, idle vs hovered, confirming stars are distributed across the whole button, all mid-animation, no ring pattern, and reduced-motion off state.

## Options to pick

Density is locked at **8x (~208 stars)** per your demo feedback. A visual demo of both remaining styles was shown in chat (two animation frames each).

1. **Style A — restrained**: gentle drift (2–6px travel, dust hanging in air), subtle flares (max ~10px).
2. **Style B — richer**: flowing drift (8–14px travel, visible falling/sprinkling), prominent flares (max ~14px occasional hero glint).

If no preference is stated, the build uses Style A (closest to the reference image).
