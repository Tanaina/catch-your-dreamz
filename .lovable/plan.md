# Reference-matched button variants

## Goal
Rework only the `Button` component’s visual variants to match the supplied reference, while preserving its existing sizes, loading/disabled behavior, icons, accessibility, and public API wherever possible.

## Changes
1. **Create the two reference variants**
   - A compact script button with a thin bronze-gold pill ring.
   - A compact script button with no visible ring.
   - In the resting state, both use the page background with black calligraphic text and no grey or cream fill.

2. **Match the interaction state**
   - Use the reference’s restrained warm cream/gold-toned fill on hover and keyboard focus.
   - Keep the ring only on the ring variant; the no-ring variant remains borderless.
   - Preserve the button’s proportions, current script family, label centering, and accessible focus behavior without adding unrelated decoration.

3. **Build continuous multidirectional fairy dust**
   - Replace the current fixed twinkle pattern with a continuously cycling bronze particle field active for the full hover/focus duration.
   - Emit varied pinpoint flecks and fine cross-star glints from inside and immediately outside every side of the pill, with inward, diagonal, and lightly crossing paths that fill the entire width and height.
   - Keep particles metallic bronze, irregular, fine-grained, and layered behind the label; avoid white dots, snowfall, rain, confetti, or a dotted-border effect.
   - Stop the effect when interaction ends and provide a calm non-moving focus treatment when reduced motion is requested.

4. **Keep the library contract intact**
   - Retain semantic button markup, ref forwarding, `className` merging, remaining HTML props, sizes, loading state, icons, and disabled behavior.
   - Express the two looks as named variants and keep the barrel/public typing synchronized.
   - Update the component’s published usage example and antipattern guidance if the variant names or visual contract change.

5. **Verify visually**
   - Compare resting and active states against the attached reference on the existing Components page.
   - Check both variants through a full hover cycle and keyboard focus, including full-surface particle coverage and immediate surrounds.
   - Confirm disabled/loading buttons do not sparkle, reduced-motion behavior is respected, and the preview remains clean at desktop and narrow widths.

## Scope guardrail
No changes to unrelated components, pages, layout, typography system, logo, or non-button palette. Any new colour values will be button-specific tokens derived from the supplied reference.
