Bare refracting pane — reach for it for any glass container that should hold still (panels, sheets, bars, cards).

```jsx
<GlassSurface cornerRadius={24} padding="20px 24px" shader="liquidGlassPanel">
  <h3 style={{ font: 'var(--lg-type-heading)', margin: 0 }}>Reading list</h3>
</GlassSurface>
```

Notes
- `cornerRadius` is a number of px, not a CSS string — it feeds both the body and the edge mask.
- Above roughly 400px on the long edge, pass `shader="liquidGlassPanel"`; the default field is tuned for pills and bends too hard on large surfaces.
- `overLight` is the light-mode switch. Pair it with `data-lg-theme="light"` on an ancestor so text and border tokens flip too.
- Refraction renders in Chromium only. Firefox and Safari fall back to blur + edge highlights automatically; nothing breaks.
- Glass must sit over something. On a flat fill it looks like a grey box.
