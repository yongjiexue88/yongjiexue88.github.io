---
name: Liquidglass
description: Glass-material design system — refracting surfaces, tokens, 31 components with glass and solid variants, and three UI kits. Use for any Liquidglass design work.
---

# Liquidglass

A design system built on one material: a transparent pane that refracts what is behind it. The refraction technique is ported from `rdev/liquid-glass-react` (MIT); the design language around it — palette, type, spacing, components, kits — is original to this system.

## Read first

0. `overview.html` — every component live on one page; the fastest way to see what exists.
1. `playground.html` — every glass parameter live; the fastest way to learn what each prop does.
2. `readme.md` — the full spec: sources, content fundamentals, visual foundations, iconography, index. **Read this before designing anything.**
3. `guidelines/*.card.html` — 22 specimen cards (Colors, Type, Space, Glass, Motion). Look here for real values.
4. `components/<group>/<Name>.d.ts` — the prop contract for each component.
5. `components/<group>/<Name>.prompt.md` — when to use each component and when not to.
6. `ui_kits/*/index.html` — three worked examples: personal site, desktop app, mobile reader.

## Setup for a new page

```html
<link rel="stylesheet" href="<ds>/styles.css" />
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<script src="<ds>/dev-loader.js"></script>
```

`styles.css` is the only stylesheet — it imports every token file. Lucide must be present or `Icon` renders nothing. `dev-loader.js` compiles the `.jsx` sources in the browser; it takes a few seconds on first load, so render inside `LiquidglassDev.ready.then(...)`. Copy the components you use into the consuming project rather than linking across projects.

Set the theme on `<html>`: `data-lg-theme="dark"` (default, and where glass looks right) or `"light"`.

## The five rules that matter

1. **Glass floats, solid holds still.** Docks, toolbars, dialogs, controls, anything overlapping content → glass. Article bodies, tables, dense forms → solid. If it has to be read for more than thirty seconds, it is not glass.
2. **Never glass on glass.** Inside a glass `Panel`, fields and cards go `variant="solid"`. Stacked panes read as mud, not depth.
3. **Every screen needs a ground.** Wrap in `<Backdrop>`. Glass over a flat fill is a grey box. Meshes are static — no animated gradients.
4. **One accent per view.** Accent means interaction, never decoration. Semantic colour rides on text and border, never a filled block.
5. **Never stack elevation on glass.** One shadow, `--lg-shadow-glass`. Depth comes from blur and edge brightness.

## Defaults worth knowing

- `cornerRadius` 999 on controls, 24–32 on panels. Below 12 the displacement has no curvature to show.
- `blurAmount` 0.0625 (≈2px) is the default and nearly clear; 0.35 (≈25px) is the frosty setting for text-heavy panels.
- `shader="liquidGlassPanel"` above roughly 400px wide — the standard field smears large areas.
- `overLight` on every glass component sitting on a light ground: halves displacement, deepens blur, drops the text shadow, and keeps the pane light with ink text. Add `tint="dark"` for the source's smoked glass — white text on black overlay, for glass over photography.
- Type over glass carries `--lg-text-shadow-glass`; over light grounds it does not.
- Refraction renders only in Chromium. Elsewhere it degrades to blur + edge. `refraction={false}` opts out.

## Content voice

Plain and declarative. Sentence case everywhere except the mono micro-label, which is uppercase with `--lg-tracking-caps`. Numerals always. Errors say what happened and what to do. **No emoji, ever.** Full rules in `readme.md`.

## Substitutions to respect

No logo, no icon set, no typeface and no imagery came with the source. **Geist** (fonts) and **Lucide** (icons) are flagged substitutions — swap them in `tokens/fonts.css` and `components/media/Icon.jsx` if the project has real ones. Never invent a logo: render the wordmark as text. Never generate imagery: use `ImagePlaceholder` or `Backdrop variant="photo"` with a label saying what belongs there. See `assets/README.md`.
