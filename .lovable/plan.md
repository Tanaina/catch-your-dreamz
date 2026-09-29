# Seamless three-part marble banner

## Goal
Replace the current top banner image with the three supplied marble tiles, begin the artwork below the sticky header, and soften all banner edges so the marble reads as one continuous page wash.

## Changes
1. **Anchor artwork to the page content**
   - Make the main content area the positioning reference for the marble layers.
   - Keep the top artwork at the beginning of `<main>`, below the header, while allowing it to span the viewport width behind the logo area.

2. **Build the top banner from the three existing tiles**
   - Use `tile_05.png`, `tile_09_cleaned.png`, and `tile_15.png` as three adjacent sections.
   - Place the softer, more dimensional `tile_09_cleaned` in the centre behind the logo; use `tile_05` and `tile_15` at the sides.
   - Slightly overlap and feather adjoining tile edges to hide hard vertical seams. Rotate or mirror a side tile only if visual testing shows it improves vein continuity.
   - Keep the top mask fully opaque through the logo, then fade the lower edge to transparent around the final 30%.

3. **Blend the remaining banners**
   - Middle: fade both top and bottom edges while preserving a clear central band.
   - Bottom: fade in from transparent at the top, then remain fully visible through the darker accent artwork.
   - Keep the source artwork uncropped and at full opacity where each mask is solid.

4. **Verify the result**
   - Check desktop and mobile previews for visible artwork behind the full logo, clean tile seams, no hard horizontal cuts, and smooth transitions between all three marble zones.
   - Preserve the existing logo, cards, navigation, colors, and interactions.

## Technical details
- Update only the overview marble markup, the shared page frame positioning, and the marble CSS utilities.
- Reuse the supplied local images; do not generate, edit, or upload new artwork. This is the lowest-credit approach.
- Use CSS masking and overlaps rather than creating a new composite bitmap, keeping future tile swaps easy.
