# Re-save `src/design-system/components/button.tsx`

## Problem
The Code editor reports `src/design-system/components/button.tsx` as failing to load (shows size 0), even though the project builds and the file contents are valid.

## Goal
Re-save / rewrite only `src/design-system/components/button.tsx` so it loads normally in the Code editor, without changing any functionality or styling.

## What changes
- Rewrite `src/design-system/components/button.tsx` with the exact same current source.
- Preserve all existing behavior:
  - All four button variants: `primary`, `outline`, `ghost`, `link`.
  - All three sizes: `sm`, `md`, `lg`.
  - The deterministic `PARTICLES` table and the `<Glitter>` overlay.
  - Star sizes, twinkle/drift animations, and reduced-motion handling.
  - `loading`, `leadingIcon`, `trailingIcon`, `disabled`, and forwarded ref behavior.
- No other files are modified.

## Verification
- Confirm the file is readable in the Code editor after the rewrite.
- Confirm the project still builds without errors.
