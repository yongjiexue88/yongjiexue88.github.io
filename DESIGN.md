---
name: Yongjie Xue — Liquidglass
description: A career-first publishing site built on Liquidglass — refracting glass surfaces over a static colour mesh, with solid surfaces wherever text is actually read.
colors:
  neutral-1000: "#04060a"
  neutral-950: "#080b11"
  neutral-850: "#11161f"
  neutral-800: "#171d27"
  neutral-700: "#222935"
  neutral-500: "#4d5766"
  neutral-300: "#a8b1be"
  neutral-150: "#e2e7ec"
  neutral-100: "#eef1f5"
  neutral-50: "#f7f9fb"
  neutral-0: "#ffffff"
  azure: "oklch(0.72 0.16 250)"
  azure-bright: "oklch(0.82 0.14 250)"
  azure-deep: "oklch(0.58 0.16 250)"
  orchid: "oklch(0.72 0.16 320)"
  mint: "oklch(0.72 0.16 170)"
  hue-danger: "oklch(0.64 0.19 25)"
  hue-warning: "oklch(0.80 0.15 80)"
  hue-success: "oklch(0.72 0.16 150)"
typography:
  display:
    fontFamily: "Geist, Noto Sans SC, PingFang SC, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 9vw, 6rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  title:
    fontFamily: "{typography.display.fontFamily}"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  heading:
    fontFamily: "{typography.display.fontFamily}"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "{typography.display.fontFamily}"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "-0.006em"
  label:
    fontFamily: "{typography.display.fontFamily}"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.006em"
  mono:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Menlo, Noto Sans Mono CJK SC, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0.09em"
rounded:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  3xl: "48px"
  4xl: "64px"
glass:
  backdrop: "blur(6px) saturate(140%)"
  backdrop-over-light: "blur(14px) saturate(140%)"
  backdrop-frosty: "blur(25.2px) saturate(180%)"
  edge-width: "1.5px"
  edge-inset: "0 0 0 0.5px rgba(255,255,255,0.5) inset, 0 1px 3px rgba(255,255,255,0.25) inset, 0 1px 4px rgba(0,0,0,0.35)"
  shadow-glass: "0px 12px 40px rgba(0,0,0,0.25)"
  shadow-glass-over-light: "0px 10px 34px rgba(4,6,10,0.16)"
  text-shadow-glass: "0px 2px 12px rgba(0,0,0,0.4)"
  veil-over-light: "rgba(255,255,255,0.62)"
motion:
  duration-fast: "150ms"
  duration-base: "200ms"
  duration-slow: "320ms"
  ease: "ease-in-out"
  scale-press: "0.96"
components:
  dock:
    material: "glass"
    rounded: "{rounded.2xl}"
    height: "64px"
    padding: "0 32px"
    shadow: "{glass.shadow-glass}"
  button-primary:
    backgroundColor: "{colors.azure}"
    textColor: "{colors.neutral-1000}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 20px"
    height: "48px"
  button-secondary:
    material: "glass"
    rounded: "{rounded.pill}"
    padding: "8px 20px"
    height: "48px"
  tag:
    material: "glass"
    typography: "{typography.mono}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
    height: "32px"
  tag-selected:
    backgroundColor: "{colors.azure}"
    textColor: "{colors.neutral-1000}"
    rounded: "{rounded.pill}"
  post-card:
    material: "glass"
    rounded: "{rounded.xl}"
    padding: "24px"
    shadow: "{glass.shadow-glass}"
    hover: "translateY(-2px) + top radial sheen"
  article-surface:
    material: "solid"
    rounded: "{rounded.2xl}"
    padding: "48px 40px"
    shadow: "none"
  panel:
    material: "glass"
    blur: "{glass.backdrop-frosty}"
    rounded: "{rounded.2xl}"
    padding: "32px"
  panel-cell:
    material: "solid"
    rounded: "{rounded.md}"
    padding: "12px"
    height: "96px"
  input:
    material: "solid"
    rounded: "{rounded.md}"
    padding: "12px 16px"
    height: "52px"
  input-focus:
    borderColor: "{colors.azure}"
    focusRing: "0 0 0 2px scrim, 0 0 0 4px {colors.azure-bright}"
  dialog:
    material: "glass"
    blur: "{glass.backdrop-frosty}"
    rounded: "{rounded.2xl}"
    entry: "{motion.duration-slow}"
---

# Design System: Yongjie Xue — Liquidglass

## Overview

**Creative North Star: one material, spent deliberately.**

The site is built on Liquidglass: a design system whose entire argument is a single
material — a transparent pane, 1.5px of specular edge, one soft wide shadow, and a
displacement field that bends whatever sits behind it. Everything else in the system
exists to stay out of that material's way.

The refraction technique is ported from [`rdev/liquid-glass-react`](https://github.com/rdev/liquid-glass-react)
(MIT). The design language around it — palette, type ramp, spacing, components — is
original to the system and vendored here under `src/styles/liquidglass/`.

Glass is expensive, so the system spends it on **things that float**: the masthead
dock, buttons, tags, menus, dialogs, toasts, the sticky table of contents. It refuses
to spend it on **things that hold still and get read**: article bodies, tables, code
blocks, dense forms. Every component therefore has a solid counterpart, and on a
writing site the solid one is often the right call.

The system is bilingual by construction. English and Chinese receive equivalent
hierarchy, CJK-aware fallbacks, synchronized document language, and the same action
paths. Geist ships no CJK glyphs, so Noto Sans SC follows it in every stack.

**Key Characteristics:**

- One material — refracting glass — over a static three-stop radial colour mesh.
- Cool near-neutral ramp at chroma ≈ 0; azure is the only accent, and it means interaction.
- Geist and Geist Mono, negative tracking by default, weights stopping at 600.
- Pills on controls, 24–32px on panels; nothing on a refracting surface goes below 12px.
- Solid surfaces wherever text is read for more than thirty seconds.
- Career identity first; real writing and contact paths provide the evidence.

## The five rules

These govern every decision below, and they come from the system's own `SKILL.md`.

1. **Glass floats, solid holds still.** Docks, toolbars, dialogs, controls, anything
   overlapping content → glass. Article bodies, tables, dense forms → solid. If it has
   to be read for more than thirty seconds, it is not glass.
2. **Never glass on glass.** Inside a glass panel, fields and cells go solid. Stacked
   panes read as mud, not depth.
3. **Every screen needs a ground.** Glass over a flat fill is a grey box, so the whole
   document sits on a mesh backdrop.
4. **One accent per view.** Accent means interaction — a link, a primary action, a
   selected state — never decoration. Semantic colour rides on text and border, never
   on a filled block.
5. **Never stack elevation on glass.** One shadow, `--lg-shadow-glass`. Depth comes
   from blur and edge brightness, not from shadow layering.

## Colors

A cool near-neutral ramp from `#04060a` to `#ffffff`, with chroma close to zero so the
accent and the backdrop carry all the colour. Accents are defined in oklch at a shared
lightness/chroma pair with only hue varying.

### Primary

- **Azure** (`colors.azure`): The one accent. It marks interaction — links, the primary
  action, selected states, the active nav item. `azure-deep` is the light-theme variant
  so contrast holds on a pale ground; `azure-bright` carries the focus ring.

### Secondary

- **Orchid** and **Mint** (`colors.orchid`, `colors.mint`): Support hues on the same
  oklch curve. They appear in the backdrop mesh only — never on a component.

### Neutral

- **Neutral 1000–850** (`colors.neutral-1000` … `colors.neutral-850`): The dark ground
  and its raised solid surfaces.
- **Neutral 50–0** (`colors.neutral-50`, `colors.neutral-0`): The light ground and its
  raised solid surfaces.
- **Text roles**: alphas of white or of ink `#04060a`, never sampled greys —
  primary/secondary/tertiary at 1.0/0.78/0.60 in dark and 1.0/0.76/0.58 in light.

**The One Accent Rule.** Exactly one accent is live per view. If a second colour wants
to mean something, it rides on text or a border, not a fill.

**The Untinted Glass Rule.** Glass is never tinted with brand colour. It takes its
colour from the ground behind it.

## Typography

**Sans:** Geist (with Noto Sans SC, PingFang SC, Hiragino Sans GB fallbacks)
**Mono:** Geist Mono (with platform mono and Noto Sans Mono CJK SC fallbacks)

⚠️ Geist is a flagged substitution — the source the system ports from ships no
typeface. It was chosen for optical neutrality, so refraction stays the loudest thing
on screen. Swapping it is a one-line change in `src/styles/liquidglass/_bridge.scss`.

**Character:** There is no separate display face. The display role is the same sans at
the top of the ramp with tighter tracking, which is why headings read as quiet rather
than editorial. Tracking is negative by default (-0.006em body, -0.02em headings,
-0.035em display); only mono caps opens up, to 0.09em. Weights stop at 600 — the
system has no bold display type.

### Hierarchy

- **Display** (`typography.display`): The identity name and route-level page titles.
- **Title** (`typography.title`): Section headings and lead card titles.
- **Heading** (`typography.heading`): Card titles, article `h3`, compact links.
- **Body** (`typography.body`): Descriptions, prose, actions, interface copy. 15px on
  1.65 leading with a 68ch measure; reading pages raise it one step to 17px.
- **Label** (`typography.label`): Buttons, nav links, field labels.
- **Mono** (`typography.mono`): The micro-label. Dates, counts, indices, breadcrumbs,
  tag text, metadata keys. Functional text never renders below 11px.

**The Sentence Case Rule.** Sentence case everywhere — buttons, headings, nav, menus,
dialogs. The single exception is the mono micro-label, which is uppercase with
`--lg-tracking-caps`.

**The Metadata Integrity Rule.** Use mono only when the text behaves like data, an
index, a date, a count, or a compact control label.

**The Language Parity Rule.** Preserve equivalent hierarchy in English and Chinese, use
the CJK fallbacks, and synchronize the document `lang` attribute with the selected
language.

## Layout

A 2px → 128px scale, where steps 12/16/20/24/32 carry nearly all layout. Page gutters
are 3vw on wide screens and 20px at tablet and mobile widths. Reusable page and footer
content centres at 1440px; the reading measure is 68ch.

Glass panes are separated by **space**, not by shared rules. Collections are gapped
grids of individual cards rather than one hairline matrix — the old system's joined
1px borders are incompatible with a material whose whole illusion lives in its edge.

Bootstrap-aligned breakpoints govern the responsive shifts: below 992px density
tightens and the table of contents drops; below 768px route headers, cards, contact
fields, the writing index, and navigation collapse to one primary column; below 576px
actions and footer columns simplify further. The masthead becomes a 56px dock plus its
own glass sheet.

The homepage's fourteen-cell index and one-large/three-compact article spread are a
truthful expression of that page's current archive, not mandatory templates. New
screens should reuse the material, radius and spacing grammar while choosing a
composition that fits their actual content.

## Elevation & Depth

Glass casts exactly **one** shadow — `0 12px 40px rgba(0,0,0,0.25)` in dark,
`0 10px 34px rgba(4,6,10,0.16)` over light — and never stacks elevation. Depth on glass
comes from blur and edge brightness.

Glass has no `border`. It has an **edge**: a 1.5px ring built from two masked gradient
layers — one `mix-blend-mode: screen` at 0.2 opacity, one `overlay` — plus a three-part
inset (`0 0 0 0.5px rgba(255,255,255,0.5) inset`, `0 1px 3px rgba(255,255,255,0.25)
inset`, `0 1px 4px rgba(0,0,0,0.35)`). That stack is the entire illusion of thickness.

Solid surfaces use a conventional contact + ambient scale (`--lg-shadow-1` … `-4`), and
in practice reading surfaces use none of it — a hairline border is enough.

**The Single Shadow Rule.** One shadow on glass, never two. If something needs to read
as closer, raise its edge or its blur.

## Shapes

**Glass defaults to a pill.** Controls — buttons, tags, filters, icon buttons, tooltips
— take `rounded.pill`. Panels take 24–32px. Anything below 12px reads as a mistake on a
refracting surface, because the displacement needs curvature to show.

Covers and media that bleed to a pane's edge inherit that pane's corner radius. Circular
icon utilities stay circular. Nothing in the system is square-cornered.

## Components

### Buttons

- **Shape:** Pill (`rounded.pill`), 48px tall, with the source's 8px 16px padding.
- **Primary:** Azure fill with inverse ink — the one accent-filled element in a local
  decision area.
- **Secondary:** The glass material, so the view keeps a single accent.
- **Interaction:** Hover raises the edge and adds a radial sheen from the top; press
  intensifies it and scales to 0.96. Transitions are 200ms `ease-in-out`;
  `prefers-reduced-motion: reduce` zeroes them.
- **Focus:** The two-part ring (2px dark spacer, then 2px azure), so it survives on
  glass and on solid alike. Never removed, never replaced with a colour change alone.

### Chips

- **Style:** Glass pills set in the mono micro-label with compact horizontal padding.
- **State:** Hover moves the label to azure. A *selected* chip takes the azure fill,
  because selection is interaction. Counts sit inside the same pill with tabular
  numerals and reduced emphasis.

### Cards / Containers

- **Material:** Glass — cards float over the mesh ground.
- **Corner Style:** `rounded.xl` (24px).
- **Shadow Strategy:** Exactly one, `glass.shadow-glass`.
- **Interaction:** Lift 2px and brighten on hover; nothing bounces, overshoots or loops.
- **Internal Padding:** 24px, reduced to 20px on mobile.

### Reading surfaces

- **Material:** Solid, `rounded.2xl`, no shadow, hairline border.
- Article bodies, code blocks, tables, and the prose-with-image block all live here.
  Code blocks sit on `neutral-950` regardless of theme.
- Blockquotes carry a 2px azure left border over a ghost fill — semantic colour on the
  border, never a filled block.

### Inputs / Fields

- **Style:** Solid (`rounded.md`, 52px), with a dedicated icon cell separated by a
  hairline. Fields are solid even inside a glass panel — especially then (rule 2).
- **Focus:** Border moves to azure and the field group takes the focus ring on
  `focus-within`; controls never rely on colour alone.
- **Error / Disabled:** Text and border changes at AA contrast; validity is never
  communicated by colour or opacity alone.

### Navigation

The masthead is a glass dock: a 64px pane at `rounded.2xl`, inset from the page edge by
the page gutter so the mesh shows around it, sticky at the top of the document. Links
sit at 0.62 opacity and come to full opacity on hover; the active item is full opacity
with a 1.5px azure underline. At the 768px breakpoint it becomes a 56px dock plus its
own glass sheet, which enters over 320ms. The menu toggle exposes its state through an
accessible label and `aria-expanded`, and every keyboard-operable element shows a
visible focus indicator.

### Backdrop

Every screen sits on `LayoutStaticBackground` — the system's `Backdrop` mesh, fixed
behind the document. Dark uses the `azure` mesh (three radial stops at 62%/12%,
12%/78%, 88%/82%); light uses `pale`, the same construction at high lightness.

**The Static Mesh Rule.** The mesh never animates. No drifting gradients, no moving
blobs — the motion budget belongs to the glass.

## Browser support

The displacement filter renders correctly only in Chromium. Safari and Firefox ignore
`feDisplacementMap` on a backdrop and fall back to blur + saturation + the edge stack,
which still reads as deliberate. This site's SCSS port implements that documented
fallback path: the full edge, inset, sheen and shadow stack over a blurred, saturated
backdrop sample.

## Do's and Don'ts

### Do:

- **Do** establish identity, role, and a clear reading or contact path before secondary
  archive browsing.
- **Do** use only real profile facts, published content, routes, tags, counts, and
  available identity assets.
- **Do** keep English and Chinese equivalent, preserve CJK-capable font fallbacks, and
  synchronize document language.
- **Do** maintain at least 11px functional text, WCAG AA contrast for small text,
  visible focus, and reduced-motion behavior.
- **Do** send anything read for more than thirty seconds to a solid surface.
- **Do** treat empty professional sections as absent until verified material exists.

### Don't:

- **Don't** invent projects, employers, clients, metrics, credentials, testimonials,
  biography, or achievement claims.
- **Don't** promote one homepage's exact article count or composition into a global
  layout rule.
- **Don't** nest glass inside glass, stack a second shadow on a pane, or tint glass with
  brand colour.
- **Don't** introduce a second accent, or express state with a saturated filled block.
- **Don't** square off a corner, or take a refracting surface below 12px of radius.
- **Don't** animate the backdrop, or add motion that bounces, overshoots or loops.
- **Don't** use mono for general prose, fake source code, or decorative pseudo-data.
- **Don't** use emoji — not in UI, not in copy, not as icons.
- **Don't** hide focus, depend on color alone, or let compact functional text fall below
  the accessibility floor.
- **Don't** demote either language to an incomplete or visually secondary experience.
