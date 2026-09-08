---
name: Yongjie Xue — Systems Calibration Atlas
description: A career-first publishing system built from calibrated signal color, editorial scale, and factual writing evidence.
colors:
  deep-ink-field: "#0e0918"
  deep-field-ink: "#e9f7f4"
  deep-field-muted: "#b9b9c2"
  deep-field-rule: "rgba(233, 247, 244, 0.22)"
  icy-paper: "#e9f7f4"
  paper-ink: "#0e0918"
  signal-cobalt: "#2349e8"
  cobalt-ink: "#f4fbf9"
  acid-chartreuse: "#cae838"
  signal-coral: "#f84735"
  pale-periwinkle: "#d8dbff"
  dark-deep-field: "#07050c"
  dark-deep-ink: "#f2f8f6"
  dark-deep-muted: "#b9b5c5"
  dark-deep-rule: "rgba(242, 248, 246, 0.20)"
  dark-paper: "#171325"
  dark-paper-ink: "#f2f8f6"
  dark-signal-cobalt: "#304ddb"
  dark-acid-chartreuse: "#d2ef3f"
  dark-signal-coral: "#ff5b47"
  dark-periwinkle: "#2a2444"
typography:
  hero:
    fontFamily: "Sofia Sans Semi Condensed, Noto Sans SC, PingFang SC, sans-serif"
    fontSize: "clamp(8rem, 21.6vw, 19.45rem)"
    fontWeight: 700
    lineHeight: 0.72
    letterSpacing: "-0.04em"
  display:
    fontFamily: "Sofia Sans Semi Condensed, Noto Sans SC, PingFang SC, sans-serif"
    fontSize: "clamp(4.4rem, 8vw, 8.4rem)"
    fontWeight: 700
    lineHeight: 0.8
    letterSpacing: "-0.055em"
  headline:
    fontFamily: "Sofia Sans Semi Condensed, Noto Sans SC, PingFang SC, sans-serif"
    fontSize: "clamp(2.7rem, 4.05vw, 4.2rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.05em"
  title:
    fontFamily: "Sofia Sans Semi Condensed, Noto Sans SC, PingFang SC, sans-serif"
    fontSize: "clamp(1.8rem, 3vw, 3rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.045em"
  body:
    fontFamily: "IBM Plex Sans, Noto Sans SC, PingFang SC, Hiragino Sans GB, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, SFMono-Regular, Menlo, Consolas, Noto Sans Mono CJK SC, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "normal"
rounded:
  square: "0"
spacing:
  xs: "4px"
  sm: "8px"
  md: "20px"
  lg: "24px"
  xl: "30px"
components:
  button-primary:
    backgroundColor: "{colors.acid-chartreuse}"
    textColor: "{colors.deep-ink-field}"
    typography: "{typography.body}"
    rounded: "{rounded.square}"
    padding: "0 30px"
    height: "64px"
  button-primary-hover:
    backgroundColor: "{colors.deep-ink-field}"
    textColor: "{colors.deep-field-ink}"
    rounded: "{rounded.square}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.paper-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.square}"
    padding: "8px 0 4px"
  navigation:
    backgroundColor: "{colors.deep-ink-field}"
    textColor: "{colors.deep-field-muted}"
    typography: "{typography.body}"
    rounded: "{rounded.square}"
    padding: "0 3vw"
    height: "64px"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.paper-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "4px 9px"
    height: "28px"
  post-card:
    backgroundColor: "{colors.icy-paper}"
    textColor: "{colors.paper-ink}"
    rounded: "{rounded.square}"
    padding: "28px 30px 26px"
  post-card-hover:
    backgroundColor: "{colors.pale-periwinkle}"
    textColor: "{colors.paper-ink}"
    rounded: "{rounded.square}"
  input:
    backgroundColor: "{colors.icy-paper}"
    textColor: "{colors.paper-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.square}"
    padding: "18px"
    height: "64px"
  input-focus:
    backgroundColor: "{colors.pale-periwinkle}"
    textColor: "{colors.paper-ink}"
    rounded: "{rounded.square}"
  signal-cell:
    backgroundColor: "{colors.signal-cobalt}"
    textColor: "{colors.cobalt-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "10px"
    height: "96px"
  signal-cell-journal:
    backgroundColor: "{colors.signal-coral}"
    textColor: "{colors.deep-ink-field}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "10px"
    height: "96px"
---

# Design System: Yongjie Xue — Systems Calibration Atlas

## Overview

**Creative North Star: "Systems Calibration Atlas"**

The system treats professional identity as a calibrated publishing signal: enormous editorial type establishes authorship, factual metadata makes the archive inspectable, and saturated flat fields create a memorable route from identity to writing to contact. It feels like an engineering plate crossed with an independent design magazine—precise, direct, and visibly authored.

The world is dense but breathable. Square cells and hairline rails organize information without turning the product into a dashboard; bold page-scale color replaces ornamental surface effects. Generic portfolio card stacks and quiet personal-blog mastheads are confirmed anti-references, while the site remains a career presence with writing as evidence.

The system is bilingual by construction. English and Chinese receive equivalent hierarchy, CJK-aware fallbacks, synchronized document language, and the same action paths. Its visual confidence never licenses invented proof: content surfaces use only real identity facts, routes, tags, and published material.

**Key Characteristics:**

- Flat deep-ink, cobalt, icy-paper, chartreuse, coral, and periwinkle fields.
- Variable-width grotesque display type, humanist body copy, and mono metadata.
- Square cells, zero-radius containers, hairline rails, and no decorative shadows.
- Career identity first; real writing and contact paths provide the evidence.
- Equivalent English and Chinese experiences with factual content only.

## Colors

The palette behaves like signal instrumentation: near-black and icy paper provide the reading field, cobalt carries the publishing system, and chartreuse, coral, and periwinkle mark action, category, and interaction states.

### Primary

- **Signal Cobalt** (`colors.signal-cobalt`): Owns large publishing fields, index maps, and the footer; pair it with Cobalt Ink for readable foreground content.
- **Acid Chartreuse** (`colors.acid-chartreuse`): Marks the highest-priority action and selected or energized states; always pair it with the fixed deep-ink field color so contrast survives theme changes.

### Secondary

- **Signal Coral** (`colors.signal-coral`): Distinguishes journal cells and supplies visible focus outlines on pale surfaces.
- **Pale Periwinkle** (`colors.pale-periwinkle`): Provides a flat hover and focus-within state for pale cards and fields.

### Neutral

- **Deep Ink Field** (`colors.deep-ink-field`): Anchors sticky navigation, strong inverse actions, and the darkest brand field.
- **Icy Paper** (`colors.icy-paper`): The primary light reading surface and identity field.
- **Deep Field Ink** (`colors.deep-field-ink`): Foreground on deep fields; the separate semantic token intentionally shares the light paper value.
- **Paper Ink** (`colors.paper-ink`): Primary text and structural rule color on icy paper.
- **Deep Field Muted** (`colors.deep-field-muted`): Secondary navigation text where the full inverse foreground would overstate hierarchy.
- **Cobalt Ink** (`colors.cobalt-ink`): Foreground on saturated cobalt fields.
- **Dark Theme Set** (`colors.dark-deep-field`, `colors.dark-paper`, and companion `dark-*` tokens): Inverts the same cool signal logic without becoming neutral-black console styling.

**The Signal Scarcity Rule.** Reserve chartreuse for primary action, selection, or energized interaction; do not spread it across passive decoration.

**The Paired Field Rule.** Use each large field with its designated ink token and keep small text at WCAG AA contrast in both themes.

## Typography

**Display Font:** Sofia Sans Semi Condensed (with Noto Sans SC and PingFang SC fallbacks)

**Body Font:** IBM Plex Sans (with Noto Sans SC, PingFang SC, and Hiragino Sans GB fallbacks)

**Label/Mono Font:** IBM Plex Mono (with platform mono and Noto Sans Mono CJK SC fallbacks)

**Character:** The display face compresses large names and titles into forceful editorial shapes; the humanist body remains familiar and readable. Mono belongs to dates, counts, indices, tags, and other true metadata—not to prose or decorative pseudo-code.

### Hierarchy

- **Hero** (`typography.hero`): The identity name only; it may be optically width-calibrated on wide viewports and returns to natural width on smaller screens.
- **Display** (`typography.display`): Route-level headings with compact leading and a strong, cropped editorial silhouette.
- **Headline** (`typography.headline`): Lead article titles and major section headings.
- **Title** (`typography.title`): Card titles and compact editorial links.
- **Body** (`typography.body`): Descriptions, role and location, actions, and long-form interface copy.
- **Label** (`typography.label`): Dates, counts, signal indices, breadcrumbs, tags, and control metadata; functional text must never render below 11px.

**The Metadata Integrity Rule.** Use mono only when the text behaves like data, an index, a date, a count, or a compact control label.

**The Language Parity Rule.** Preserve equivalent hierarchy in English and Chinese, use the CJK fallbacks, and synchronize the document `lang` attribute with the selected language.

## Layout

The system uses full-width color bands for signature moments and a centered reading width of 1440px for reusable page and footer content. Wide layouts use editorial grids: two-column route headers, two-column card matrices, and four-column footer or featured-writing structures. Structural spacing is carried by 3vw gutters on wide screens and 20px gutters at tablet and mobile widths.

Bootstrap-aligned breakpoints govern the responsive shifts: below 992px density tightens; below 768px route headers, cards, contact fields, signal maps, and navigation collapse to one primary column; below 576px actions and footer columns simplify further. Mobile preserves the same hierarchy and palette rather than shrinking the desktop composition: oversized names wrap, signal cells become a two-column index, and reading cards stack.

The homepage's fourteen-cell rail and one-large/three-compact article spread are a truthful expression of that page's current archive, not mandatory templates for every surface. New screens should reuse the field, rail, cell, and editorial-grid grammar while choosing a composition that fits their actual content.

## Elevation & Depth

The system is flat by design. It uses no decorative shadows on navigation, cards, page banners, article media, contact fields, or signal cells. Depth and state are conveyed with adjacent color fields, one-pixel structural borders, two-pixel emphasis rails, and inset focus outlines; overlays may use z-index for behavior without acquiring visual lift.

**The Flat Signal Rule.** Keep resting surfaces shadowless; use color adjacency, hairlines, and focus rings to establish order and state.

## Shapes

The defining silhouette is square and rail-bound. Buttons, tags, cards, fields, banners, signal cells, and sheets use zero-radius corners; one-pixel borders join neighboring elements into matrices. Thin underlines identify text actions and active navigation, while the signal map may use dashed or continuous rails to connect factual cells.

Circular icon utilities may remain circular when their function is intrinsically compact, but they are supporting controls rather than the page's container language. Do not round editorial containers or turn tag collections into soft pill clouds.

## Components

### Buttons

- **Shape:** Rectilinear and zero-radius, with a tall, generous action target.
- **Primary:** Chartreuse field with fixed deep ink; use it for the single dominant action in a local decision area.
- **Hover / Focus:** Invert to the deep field with inverse ink; show a three-pixel coral focus outline with visible offset on pale surfaces. Keep transitions between 150ms and 180ms and remove nonessential motion under reduced-motion preferences.
- **Secondary:** A transparent text action with a two-pixel underline; blue may mark hover, but the action stays visually subordinate.

### Chips

- **Style:** Square, transparent, one-pixel outlined tags set in mono with compact horizontal padding.
- **State:** Chartreuse fill marks hover, focus, or selection. Counts sit inside the same outline with tabular numerals and reduced emphasis.

### Cards / Containers

- **Corner Style:** Square (`rounded.square`) and usually joined edge-to-edge.
- **Background:** Icy paper at rest; periwinkle for hover or keyboard focus.
- **Shadow Strategy:** None; use shared one-pixel borders to create the matrix.
- **Internal Padding:** Use the established 20–30px range, reducing it slightly on mobile.

### Inputs / Fields

- **Style:** Icy-paper fields, zero radius, no inner border, and an outer one-pixel grid with a dedicated icon cell when needed.
- **Focus:** The entire field group changes to periwinkle on `focus-within`; controls retain a visible keyboard focus treatment and never rely on color alone.
- **Error / Disabled:** Use clear text and border changes with AA contrast; do not communicate validity only through coral or opacity.

### Navigation

The sticky navigation is a 64px deep-ink rail with muted links, bright inverse hover text, and a one-pixel chartreuse active underline. At the 768px breakpoint it becomes a 56px bar plus a full-width square-edged sheet; the menu toggle exposes its state through an accessible label and `aria-expanded`. Every keyboard-operable navigation element must show a visible focus indicator.

### Signal Cells

Signal cells are the signature factual-index component: square, one-pixel outlined, mono-labelled, and connected by structural rails when space allows. Cobalt denotes the standard writing stream; coral denotes a distinct real category. A brief staggered boot animation may reveal a bounded set, but `prefers-reduced-motion: reduce` must remove it and the cells must remain understandable without motion.

## Do's and Don'ts

### Do:

- **Do** establish identity, role, and a clear reading or contact path before secondary archive browsing.
- **Do** use only real profile facts, published content, routes, tags, counts, and available identity assets.
- **Do** keep English and Chinese equivalent, preserve CJK-capable font fallbacks, and synchronize document language.
- **Do** maintain at least 11px functional text, WCAG AA contrast for small text, visible focus, and reduced-motion behavior.
- **Do** build hierarchy with scale, flat color fields, square cells, and hairline rails.
- **Do** treat empty professional sections as absent until verified material exists.

### Don't:

- **Don't** invent projects, employers, clients, metrics, credentials, testimonials, biography, or achievement claims.
- **Don't** promote one homepage's exact article count or composition into a global layout rule.
- **Don't** add gradients, glow, glass, decorative drop shadows, or rounded card stacks to core editorial surfaces.
- **Don't** use mono for general prose, fake source code, or decorative pseudo-data.
- **Don't** hide focus, depend on color alone, or let compact functional text fall below the accessibility floor.
- **Don't** demote either language to an incomplete or visually secondary experience.
