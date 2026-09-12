The default action control. Glass for primary moments on imagery, solid/accent/ghost everywhere else.

```jsx
<Button variant="glass" size="lg" onClick={subscribe}>Subscribe</Button>
<Button variant="ghost" iconLeft={<Icon name="download" />}>Download EPUB</Button>
```

Notes
- Only one glass Button per view — it is the loudest thing on the screen.
- `variant="solid"` is a light chip on dark ground (inverse fill). `accent` is the brand hue.
- Always pill (radius 999). Do not override `borderRadius`.
- Pass `overLight` when the glass sits on a pale photo or a light-mode surface.
