# Assets

This folder is deliberately close to empty. Here is why, and what to put in it.

## What the source provided

`rdev/liquid-glass-react` is a single-component React library. It contains **no** logo, no icon set, no illustrations, no photography, and no fonts. There was nothing to copy in.

## Logo — absent by design

No mark was invented. Wherever a logo would go, the UI kits render the wordmark *Liquidglass* in `--lg-type-heading` with `-0.02em` tracking. Drop a real SVG here as `logo.svg` / `logo-mark.svg` and replace those spans.

## Icons — Lucide, from CDN ⚠️ substitution

Loaded per page:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
```

Mounted via `components/media/Icon.jsx`. Chosen because its stroke weight (rendered here at 1.75, below Lucide's 2 default) sits well against the system's low-contrast edges — **not** because it is the brand's set. There is no brand set.

To replace it: vendor your own SVGs into `assets/icons/` and rewrite `Icon.jsx`. Nothing else references Lucide.

Sizes: **16** inline with text · **20** default · **24** inside `IconButton`.

## Fonts — Geist, from Google Fonts ⚠️ substitution

`@import`ed in `tokens/fonts.css`. The source renders in bare `system-ui`. If you license a grotesque of your own, drop the `.woff2` files here, write `@font-face` rules in `tokens/fonts.css`, and update `--lg-font-sans` / `--lg-font-mono`.

## Imagery — placeholders only

Nothing is generated. Two components mark where images belong:

- `ImagePlaceholder` — inline slots (covers, thumbnails, figures), labelled with what goes there
- `Backdrop variant="photo"` — full-bleed grounds behind glass

**What to shoot or source:** cool-leaning, high-contrast, plenty of negative space. Glass refracts light/dark structure — flat imagery gives it nothing to bend, and busy imagery turns to noise under displacement. Avoid warm skin-tone-heavy crops directly under controls.

Slots currently used across the kits:

| Slot | Ratio | Where |
| --- | --- | --- |
| Essay hero | 16:9 | `ui_kits/web` |
| Book cover | 2:3 | `ui_kits/web`, `ui_kits/mobile` |
| Author portrait | 1:1 | `ui_kits/web` |
| Album / audiobook art | 1:1 | `ui_kits/desktop`, `ui_kits/mobile` |
| Full-bleed ground | any | all kits |
