Stand-in for real imagery. Glass needs something behind it — this says what.

```jsx
<ImagePlaceholder label="book cover — 3:2" ratio="3 / 2" />
<ImagePlaceholder label="full-bleed hero photo" height={420} radius={0} />
```

Notes
- Keep the label descriptive ("author portrait, 1:1"), not generic — it is a brief for whoever supplies the asset.
- Replace with an `<img>` on the same slot; the parent Card clips it to the radius.
