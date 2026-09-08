# Design audit — Impeccable baseline

Engine: Impeccable v0.1.3, 61 deterministic detector rules, no LLM.
Scanned 9 rendered pages at 1280x800 and 390x844.

**Baseline: 76 desktop findings, 46 mobile.** All `warning`; 24 desktop
classed `slop`, 52 `quality`.

Uncomfortable but useful conclusion: most of the slop is self-inflicted —
introduced during this session's redesign, not inherited from the template.

| # | Finding | Where | Why it hurts | Sev | Fix |
|---|---------|-------|--------------|-----|-----|
| 1 | `kicker-above-heading` (6) | Every page header — "Writing", "Index", "Personal blog" | Tracked uppercase micro-label above an h1 is the signature generated-UI tell. The heading already carries the page. | **High** | Delete the eyebrow element |
| 2 | `radial-spotlight-glow` (9) | `LayoutStaticBackground` — three ellipse gradients | Decorative haze with no function. Worse here: it is warm (`#b48282`) and now sits under a cool palette. | **High** | Remove the gradients, keep the grain |
| 3 | `low-contrast` (7) | `/contact` glass form over the parallax illustration | 1.0–1.4:1 against the artwork. A real WCAG failure, not a stylistic quibble. | **High** | Drop the illustration backdrop behind text |
| 4 | `low-contrast` | Inline code, `#d63384` on `#f7f9fc` = 4.3:1 | Bootstrap's default pink, never themed. Below 4.5:1. | **High** | Token the code colour |
| 5 | `skipped-heading` (7) | Index pages: h1 → h3, no h2 | Breaks the screen-reader outline. Card titles are h3 under a bare h1. | **High** | Make card heading level contextual |
| 6 | `overused-font` (9) | Inter at 86–97% of text | Inter is the default face of generated UIs. Chakra Petch headings alone do not carry identity. | Med | Body → IBM Plex Sans |
| 7 | `line-length` (20) | Post bodies, 86–92 chars/line | Past the ~75ch comfortable-reading ceiling; long-form is the site's main job. | Med | Measure in `ch`, not px |
| 8 | `undersized-ui-text` (9) | Masthead sub-line at 10.56px | Below the 11px functional floor; fails on small viewports. | Med | Raise above 11px |
| 9 | `edge-flush-cards` | `/contact` at 390px, −4px gap | Card bleeds past the right edge on mobile. | Med | Contain the parallax wrapper |
| 10 | `layout-transition` (9) | `transition: width` on a plugin scrollbar | Animating width thrashes layout. | Low | Animate transform |

## Judgment calls — not applied as given

**`overused-font` is right about the symptom, wrong about the cure being "any
other font."** Swapping to something novel for novelty's sake would trade one
generic choice for a worse one. Moving body copy to IBM Plex Sans instead makes
the type system *cohere*: Plex Sans and the existing IBM Plex Mono are one
family, so body and code share a designer's hand while Chakra Petch stays the
display voice. Fewer fonts doing more work, not more fonts.

**`line-length` is treated as a `ch` problem, not a px problem.** Hard-coding a
narrower pixel width would break again the moment the body face changes.
Measuring in `ch` ties the line to the font actually rendering.

## Not changing

- **Card grid at 2-up.** The detector says nothing about it, and the reflex
  "repetitive 3-column grid" critique does not apply: 2-up is a deliberate
  response to a 14-post inventory. A 3-column grid here would look empty.
- **Rounded corners at 10px.** Present but restrained, and load-bearing for the
  card/surface distinction. Not the "excessive rounded cards" pattern.
- **The mountain SVG backdrop.** Keeping it — it is the one piece of
  non-generic visual identity the site has, and unlike the radial glows it
  reads as an illustration rather than as haze.

---

# Results

Four detector passes. Same 9 pages, same two viewports.

| Rule | Desktop base | Final | Mobile base | Final |
|------|---:|---:|---:|---:|
| `line-length` | 20 | **0** | 0 | 0 |
| `radial-spotlight-glow` | 9 | **0** | 9 | **0** |
| `undersized-ui-text` | 9 | **0** | 0 | 0 |
| `overused-font` | 9 | **0** | 9 | **0** |
| `skipped-heading` | 7 | **0** | 7 | **0** |
| `low-contrast` | 7 | 2 | 7 | 3 |
| `kicker-above-heading` | 6 | **0** | 4 | **0** |
| `edge-flush-cards` | 0 | 0 | 1 | **0** |
| `layout-transition` | 9 | 9 | 9 | 9 |
| **Total** | **76** | **11** | **46** | **12** |

86% reduction desktop, 74% mobile. Seven of nine rules fully cleared.

## Left unfixed, deliberately

**`layout-transition` (9).** Bootstrap's own `.collapsing { transition: height }`.
No collapse or accordion component appears anywhere in the JSX — this is dead
vendor CSS arriving through `@import "bootstrap/scss/bootstrap"`. The honest fix
is trimming the Bootstrap import surface, which is a build change with real
regression risk and no visible payoff. Not worth it for a rule firing on CSS
nothing renders.

**`low-contrast` (2–3, contact letter).** The letter preview is set in
`Alex Brush`, a thin handwriting face. After moving it to a flat ground and
solid ink, the *median* contrast passes at 3.1–3.2:1; what remains is a 1.1:1
*minimum-pixel* reading, which is antialiasing on hairline script strokes. No
ink colour clears that bar — only abandoning the script face would, and the
handwriting is the entire point of a letter preview. Flagged as a real
limitation rather than dismissed: if accessibility is weighted above the
conceit, that component should be redrawn.

**`text-occlusion` (2, appeared mid-work).** Verified false positive. Measured
in the browser: the "Writing" heading occupies y 375–389, the first card starts
at 407 — 18px clear, `opacity: 1`, `visibility: visible`. It resolved on its own
once the micro-labels became real headings.

## Regression caught by looking, not by tooling

Making section article titles `h2` exposed that `SectionPage` rendered its `h1`
as a plain string — but those titles carry inline markup, so `/contact` printed
`<span class="text-primary">Contact</span> Me` on screen. It only reproduces at
`lg` and above, where `parseSectionTitle` switches to `title_long`; every
earlier check had been at a narrower width. Neither the detector nor the source
review caught it. The screenshot did.
