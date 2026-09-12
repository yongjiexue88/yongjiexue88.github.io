# Liquidglass

A design system built around one idea: **surfaces that refract what is behind them.**

Liquidglass ports the refraction technique from [`rdev/liquid-glass-react`](https://github.com/rdev/liquid-glass-react) (MIT) — SVG displacement maps, per-channel chromatic aberration, a two-pass specular edge, and an elastic pointer model — and grows a complete UI system around it: a token layer, 31 components with glass *and* solid variants, and three product kits.

The source repository ships **one** component and **no** design language: no palette, no typeface, no spacing scale, no logo, no imagery. Everything in `tokens/`, every non-glass component, and every screen in `ui_kits/` is original work authored for this system. Where a value could be inherited from the source, it was, verbatim — those are flagged inline in the token files.

This is **not** a recreation of any vendor's shipping interface. It is an original system that uses a published open-source rendering technique.

---

## Sources

| Source | What came from it |
| --- | --- |
| `github.com/rdev/liquid-glass-react` — `src/index.tsx` | Component structure, layer order, edge/inset shadow stacks, sheen gradients, elastic transform maths, `overLight` behaviour, default prop values |
| — `src/shader-utils.ts` | `ShaderDisplacementGenerator`, `fragmentShaders.liquidGlass`, the smoothstep/roundedRectSDF/texture helpers — ported to `components/glass/glass-engine.js` |
| — `README.md` | Browser-support caveats, prop documentation |

Nothing else was provided. No Figma file, no codebase, no brand guidelines, no assets.

---

## Context

Liquidglass is a **general-purpose kit**, not a product skin. It was commissioned as the visual foundation for a personal website — writing and ebooks — and the `web` kit reflects that, but nothing in `tokens/` or `components/` assumes it.

The system's whole argument is that glass is expensive and should be spent deliberately. Glass is for **things that float**: navigation, controls, overlays, transient surfaces. It is not for **things that hold still and get read**: article bodies, tables, dense forms. Every component therefore ships a solid counterpart, and the solid one is often the right call.

---

## Content fundamentals

**Voice.** Plain, declarative, unhurried. Sentences state a fact and stop. No exclamation marks, no second-person sales copy, no imperative enthusiasm.

- Yes: `Twelve essays on interface craft. Free to read, or buy the bound set.`
- No: `Discover our amazing collection of essays! Get yours today 🚀`

**Person.** First person for the author's own writing (`I spent a year rebuilding…`). Second person only in interface instructions (`Drop a file to upload`). Never first-person-plural corporate `we`.

**Casing.** Sentence case everywhere — buttons, headings, nav, menus, dialogs. The single exception is the mono micro-label (`--lg-type-mono` + `--lg-tracking-caps`), which is uppercase and is used for eyebrows, section markers and metadata keys.

- Button: `Save changes`, not `Save Changes`
- Eyebrow: `ESSAY · 12 MIN`

**Length.** UI copy is short because glass surfaces are small. Button labels are 1–3 words. Tooltips never wrap. Toast titles are one clause; the supporting line is one sentence. Empty states are one sentence plus one action.

**Numbers and units.** Numerals always (`3 books`, not `three books`). Durations as `12 min`. Dates as `Mar 4, 2025`. File sizes lowercase (`2.4 mb`). Percentages tight (`62%`).

**Errors.** Say what happened and what to do. No apology, no blame.

- Yes: `That email is already registered. Sign in instead.`
- No: `Oops! Something went wrong.`

**Emoji.** Never. Not in UI, not in copy, not as icons. The brand has one visual idea and emoji is noise against it.

**Punctuation.** Middot `·` separates metadata (`Essay · 12 min · 2025`). Em dashes sparingly. Oxford comma. No ellipses except in truncation and in menu items that open a further step (`Export…`).

---

## Visual foundations

### The core motif

One material: a transparent pane, 1.5px of specular edge, a soft wide shadow, and a displacement field that bends whatever is behind it. Everything else in the system exists to stay out of its way.

### Colour

Cool near-neutral ramp (`--lg-neutral-1000` `#04060a` → `--lg-neutral-0` `#ffffff`), chroma close to zero so accent and backdrop carry all the colour. Accents are defined in oklch at a shared lightness/chroma pair with only hue varying: **azure** `oklch(0.72 0.16 250)` leads, **orchid** `320` and **mint** `170` support. Semantic hues sit on the same curve.

Rules: **one accent per view.** Accent means interaction — a link, a primary action, a selected state — never decoration. Semantic colour is carried by text and border, never by a filled block. Glass itself is never tinted with brand colour; it takes its colour from the ground.

Both themes ship. `[data-lg-theme="dark"]` (the default, and where glass looks right) and `[data-lg-theme="light"]`. Text roles in both are alphas of white or of ink `#04060a`, never sampled greys.

### Backgrounds

Glass on a flat fill is a grey box. Every screen therefore sits on a `Backdrop`: a three-stop radial colour mesh (`azure` / `orchid` / `mint` / `ember`, plus `pale` for light mode) or a labelled photo slot. Meshes are **static** — no animated gradients, no drifting blobs. The motion budget belongs to the glass.

The system ships no photography. `Backdrop variant="photo"` and `ImagePlaceholder` mark where an image goes and say what it should be. See *Iconography and imagery*.

### Typography

**Geist** (sans) and **Geist Mono**, from Google Fonts. ⚠️ **This is a substitution** — the source repo renders in bare `system-ui` and ships no typeface. Geist was chosen for optical neutrality: it does not compete with the refraction. Swap the `@import` in `tokens/fonts.css` if you license something else.

Ramp runs 11px → 96px at a 1.22–1.30 ratio, tightening toward display sizes. Tracking is **negative by default** (`-0.006em` body, `-0.02em` headings, `-0.035em` display); only mono caps opens up, to `0.09em`. Body sits at 15px on 1.65 leading with a 68ch measure. Weights stop at 600 — there is no bold display type in this system.

Type over glass carries `--lg-text-shadow-glass` (`0 2px 12px rgba(0,0,0,0.4)`). Over light grounds that shadow goes to zero and the scrim underneath does the work instead.

### Space and radius

2px → 128px scale; steps 5–9 (12/16/20/24/32) carry nearly all layout. Page gutters 32px, 64px wide. Glass padding is inherited verbatim from the source: `24px 32px` for panes, `8px 16px` for buttons, 24px internal gap.

Radii: 4 → 44, plus `999` pill. **Glass defaults to a pill.** Panels take 24–32. Anything below 12 reads as a mistake on a refracting surface — the displacement needs curvature to show.

### Borders, edges and shadows

Glass has no `border`. It has an *edge*: a 1.5px ring built from two masked gradient layers — one `mix-blend-mode: screen` at 0.2 opacity, one `overlay` — plus a three-part inset (`0 0 0 0.5px rgba(255,255,255,0.5) inset`, `0 1px 3px rgba(255,255,255,0.25) inset`, `0 1px 4px rgba(0,0,0,0.35)`). That stack is the entire illusion of thickness.

Glass casts exactly one shadow, `0 12px 40px rgba(0,0,0,0.25)`, and **never stacks elevation**. Depth on glass comes from blur and edge brightness, not from shadow layering. Solid surfaces use a conventional four-step contact + ambient scale (`--lg-shadow-1…4`).

### Transparency and blur — when

| Use glass | Use solid |
| --- | --- |
| Docks, toolbars, floating nav | Article and long-form body |
| Buttons, switches, sliders | Tables and dense data |
| Dialogs, sheets, toasts, menus | Fields nested inside a glass panel |
| Media controls over artwork | Anything on a flat background |
| Anything that overlaps content | Anything that must be read for >30 seconds |

**Glass on glass reads as mud.** When a `Panel` is glass, the `Input`s inside it go `variant="solid"`. This rule is enforced by defaults in the kits.

Blur: default is nearly clear (`blurAmount 0.0625` → 2px), because the refraction is the point and frosting hides it. `0.35` (25px) is the frosty setting for text-heavy panels. Over light grounds the base blur rises to 12px and displacement halves. `overLight` then has two treatments: the default keeps the pane light and flips its content to ink text (readable inside a light theme), and `tint="dark"` is the source library's smoked glass — white text on a black overlay, which is right over photography and too heavy on a pale UI.

### Motion

Three durations, two curves, all lifted from the source: **150ms** ease-in-out for content and `overLight` crossfades, **200ms** ease-in-out for the glass body, borders and sheen, **320ms** for progress fills and sheet/dialog entry.

The signature is the **elastic pointer model**: within a 200px activation zone, glass leans toward the cursor at `elasticity` 0.15 (0.35 for buttons), stretching 0.3 along its travel axis and compressing 0.15 across it, scale clamped at 0.8. Press scales to 0.96.

Hover raises the edge and adds a radial sheen from the top; press intensifies it to full white at 80% radius. Cards lift 2px and brighten. Nothing bounces, nothing overshoots, nothing loops. `prefers-reduced-motion` zeroes durations and elasticity.

### Focus

`--lg-focus-ring` — a 2px dark spacer then a 2px azure ring, so it survives on both glass and solid. Never removed, never replaced with a colour change alone.

---

## Iconography and imagery

**Icons: Lucide, from CDN.** The source repository contains no icon set, so one was chosen rather than drawn. Lucide's 1.75 stroke (slightly lighter than its 2 default) matches the system's low-contrast edges. Consuming pages load `https://unpkg.com/lucide@latest/dist/umd/lucide.js` and the `Icon` component mounts glyphs into a `currentColor` box.

⚠️ **Flagged substitution.** Lucide is not "the brand's icon set" — there was no brand icon set. Replace it if you have one; only `components/media/Icon.jsx` needs to change.

Sizes: 16 inline with text, 20 default, 24 in `IconButton`. Icons are always paired with a label or an `aria-label`. Never emoji, never unicode glyphs as icons, never a hand-drawn SVG standing in for a real one.

**Imagery: none shipped.** The system draws no illustrations and generates no photographs. `ImagePlaceholder` and `Backdrop variant="photo"` mark every slot with a label saying what belongs there (`author portrait, 3:2`, `cover art, square`). Fill them with real assets before shipping.

Intended treatment when you do: cool-leaning, high-contrast, generous negative space. Glass needs strong light/dark structure behind it to have anything to refract — flat or busy images both kill the effect.

**Logo: none.** The source provided no mark, so none was invented. Wherever a logo would sit, the kits render the word *Liquidglass* in `--lg-type-heading` at `-0.02em`. Supply a real mark and drop it into `assets/`.

---

## Intentional additions

The source defines exactly one component. Everything else is an addition; these are the ones worth naming explicitly:

- **`GlassSurface` / `LiquidGlass` split** — the source conflates static rendering and pointer tracking. Splitting them means a `Dock` can share one pointer model across many children instead of running a listener per pane.
- **Solid variants** on Button, Input, Textarea, Select, Card, Panel, SegmentedControl — required by the user brief, and required in practice for readable long-form content.
- **`Backdrop`** — glass is meaningless without a ground, and every demo needs one.
- **`Icon`** — a wrapper for the substituted glyph set, so replacing Lucide touches one file.
- **`ImagePlaceholder`** — honest empty slots instead of invented imagery.

---

## Browser support

The displacement filter renders correctly **only in Chromium**. Safari and Firefox ignore the SVG `feDisplacementMap` on a backdrop and fall back to blur + saturation + the edge stack, which still looks deliberate. Pass `refraction={false}` to opt out explicitly.

---

## Index

| Path | What |
| --- | --- |
| `playground.html` | Every glass parameter on a slider, with a live sample and the resulting code. |
| `overview.html` | **Start here.** Every component in the system, live, on one page. |
| `styles.css` | The entry point. Link this one file; it `@import`s everything below. |
| `tokens/` | `fonts` · `palette` · `typography` · `space` · `radius` · `motion` · `glass` · `elevation` · `semantic` · `base` |
| `components/glass/` | `GlassSurface` `LiquidGlass` + `glass-engine.js` (the ported shader/displacement generator) |
| `components/forms/` | `Button` `IconButton` `Input` `Textarea` `Select` `Checkbox` `Radio` `Switch` `Slider` |
| `components/navigation/` | `Tabs` `SegmentedControl` `Dock` `Menu` `Breadcrumbs` |
| `components/surfaces/` | `Card` `Panel` `Sheet` `Dialog` `Avatar` `Divider` `ImagePlaceholder` |
| `components/feedback/` | `Badge` `Tag` `Tooltip` `Toast` `Progress` `Spinner` |
| `components/media/` | `Icon` `Backdrop` |
| `guidelines/` | 22 foundation specimen cards — Colors, Type, Space, Glass, Motion |
| `ui_kits/web/` | Personal site: home, essay, library, auth |
| `ui_kits/desktop/` | Studio app: dashboard, player, settings |
| `ui_kits/mobile/` | Reader app: library, reader, player |
| `assets/` | Asset policy — see `assets/README.md` |
| `dev-loader.js` | Dev-only. Compiles the `.jsx` in-browser when no bundle is present. |
| `SKILL.md` | Agent Skill entry point. |

Every component directory holds `<Name>.jsx`, `<Name>.d.ts` (props contract), `<Name>.prompt.md` (when to use it), and a `*.card.html` specimen.
