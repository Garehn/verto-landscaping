# Verto Landscapes — Design System (v2, cinematic)

Reference: Meridian Development Group (polidori.dev reel) — dark cinematic
editorial. Full-bleed photography with a filmic grade, tiny corner-anchored
uppercase labels, huge restrained display type, smooth scroll.

## Palette (roles, not decoration)
| Token   | Hex      | Role |
|---------|----------|------|
| ink     | #0E120E  | near-black green — primary dark ground (most of the site) |
| ink-2   | #161B16  | raised dark surface (cards, panels on ink) |
| paper   | #F2EFE7  | warm bone — light sections, text on ink |
| cream   | #E9E4D6  | secondary light surface |
| stone   | #8B8A7E  | muted label grey-green (on light) |
| sage    | #9AA692  | muted label on dark |
| moss    | #2E3D2E  | deep green accent surface |
| brass   | #AC9469  | rare warm metallic accent — hairlines, numbers, hover only |
| line    | rgba splits per ground | hairline rules at 12–18% opacity |

Do NOT use: pure #000/#fff, saturated greens, gradients as decoration,
drop shadows on cards, rounded corners > 2px (this is a sharp, editorial world).

## Type
- **Display:** Fraunces (opsz axis high, weight 300–500, tracking -0.03em).
  Italic for emphasis words only.
- **UI/body:** Inter (−0.01em). Body on dark = paper at 78–85%.
- **Micro-labels:** IBM Plex Mono, 10–11px, uppercase, tracking 0.25–0.35em —
  coordinates, EST, section indices (01/06), SCROLL cue. This is the signature
  "surveyor" voice — use at viewport corners and section headers.
- Scale: display clamp(2.75rem → 7.5rem) for hero/statements; section heads
  clamp(2.25rem → 4.5rem).

## Motion rules (Emil Kowalski school)
- Smooth scroll via Lenis (lerp ~0.1). Everything else hangs off it.
- Enter animations: ease-out only, `[0.16, 1, 0.3, 1]`, 0.8–1.2s for hero,
  0.5–0.7s for content. Never ease-in.
- Animate transform + opacity only. No width/height/layout animation.
- Text reveals: per-line/word rise from behind an overflow mask (y: 110% → 0).
- Images: parallax y (±8–12%) and slow scale (1.12 → 1) inside overflow-hidden
  frames; scale 1.05 on hover over 0.9s.
- Scroll-scrubbed sequences use `useScroll` + `useTransform` + `useSpring`.
- Stagger 60–90ms between siblings. Viewport trigger `once: true`, margin -10%.
- Preloader: once per session, ≤ 2.2s, counter + wordmark, curtain lift.
- `prefers-reduced-motion`: kill Lenis, preloader, parallax; content simply is.

## Signature elements
1. Corner meta layer on hero: wordmark top-left (header), EST top-right,
   SCROLL bottom-centre, coordinates 33.79°S 151.22°E bottom-right.
2. Topographic contour motif (3D terrain section + hairline contour SVG bg) —
   "we shape land" made literal.
3. Section index numbers (01 — Grounds) in mono brass.
4. Fat editorial footer with giant VERTO wordmark.

## Grade on photography
Every full-bleed image sits under: top gradient ink/45 → transparent,
bottom ink/60, plus a 4–8% ink wash to unify the grade. Saturation slightly
lifted down (CSS filter saturate(0.9) brightness(0.95)) for the filmic look.
