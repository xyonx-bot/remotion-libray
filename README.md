# reel-component-library

Reusable **Remotion** components for Hinglish agency-style reels — kinetic
typography, cards, phone mockups, annotations, 3D-ish illustrations.
Extracted from two reference reels on `alphaagency1`:

- `v1` — "Aapne apni dukaan pe lakhon lagaye" (off-white + green, 720×1280)
- `v2` — "Customer aaya, cheez pasand ki, checkout tak pahuncha" (peach + orange, 4-step carousel)

## Quick start

```bash
npm install                 # remotion 4.0.539 + React 18
npm run preview             # opens Remotion Studio — every example is a Composition
npm run still -- StepIndicator out/step.png --frame=100
```

## How to reuse in your own project

1. Copy `src/primitives.tsx` + `src/theme.ts` into your Remotion app.
2. Copy the components you need from `src/components/v1.tsx` / `v2.tsx`.
3. Fonts are in `public/fonts/` (Inter variable + Instrument Serif) — load via
   `@font-face` + `staticFile`, exactly how `primitives.tsx` does it.
4. Each component takes a `delay` (frames) and animates an entrance with a
   spring, then settles to its final resting state. Render stills at the END
   frame to compare against references.

## Key rules baked in

- **Text uses the `Line` primitive** (full-width, centered, no-wrap). Never
  absolutely-center a text box at x=360 — it silently wraps and collides.
  (Two bugs traced to this exact behavior.)
- Wide chips/cards use the `A` wrapper's `wide` mode to avoid the
  shrink-to-fit width cap.
- Decorative layers (rings/arcs/glow) render **before** content — a glow
  `Bg` after them hides them completely.
- Tokens live in `theme.ts` — no inline hex in scenes.

## Component catalog

### `src/primitives.tsx`
`GlobalCss` (fonts + reset) · `Bg` (gradient bg + optional glow) · `A`
(animated wrapper: pop/fade/up; `wide` mode) · `Line` (full-width centered
no-wrap text) · `T` (positioned text) · `WordReveal` (word-by-word stagger) ·
`Viewfinder` (corner brackets) · `Sparkle` (4-point star + twinkle) ·
`HandEllipse` (draw-on hand ellipse) · `Pill` · `BlurRing` / `ThinArc` ·
`useDraw` (SVG stroke draw progress hook)

### `src/components/v1.tsx` (white + green)
`KineticTitle` (two-weight headline lockup) · `Bundle` / `MoneyStack`
("Rs" cash bundle pyramid) · `Hex` (black hexagon + green accents + icon) ·
`Person` (crowd glyph) · `QMark` (outlined question mark) · `Chip`
(feature pill, zigzag callouts) · `SealBadge` (circular seal + curved text) ·
`CommentInput` (keyword input + typed text + cursor + send) · `Phone` /
`MiniSite` (black phone + detailed storefront: nav, hero, products with
prices, trust badges, testimonials, blogs — flow layout, no overlaps)

### `src/components/v2.tsx` (peach + orange)
`StepIndicator` ("01 02 03 04" + dots) · `PillBadge` (orange gradient pill) ·
`HeadlinePair` · `BodyCopy` (small gray text block) · `SpeechBubble` (tail
bubble) · `PriceTag` (tilted "Rs 8,500" tag) · `BlurBgWord` (giant blurred
bg word) · `NextButton` (black circle arrow) · `RingCircles` (concentric
circles, draw-on) · `ConnectorAnnotation` (elbow leader line + mono label) ·
`NotificationCard` (lock-screen notification) · `DebitCard` (tilted payment
card) · `PuzzlePair` (interlocking "website × customer" jigsaw) ·
`BagIllustration` · `IsoShopFloor` (isometric shop platform: floor, shelves,
counter, entry frame, pawn figures, floor labels)

## Examples

`npm run preview` → these comps are registered in `src/index.tsx`:
`StepIndicator`, `SpeechAndPrice`, `NotificationPhone`, `Puzzle`, `V1Garage`
(every v1 component on one canvas).

## License

Internal use. Fonts: Inter (OFL), Instrument Serif (OFL).
