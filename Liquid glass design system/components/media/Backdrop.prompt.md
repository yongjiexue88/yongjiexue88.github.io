Wrap any screen in this. Glass with nothing behind it is a grey box.

```jsx
<Backdrop hue="azure" fixed contentStyle={{ padding: 48 }}>
  <Panel>…</Panel>
</Backdrop>

<Backdrop variant="photo" label="cover photo — 16:9" style={{ height: 420 }} />
```

Notes
- One hue per screen. Two meshes in one view fight each other.
- `hue="pale"` is the only light ground; pass `overLight` to the glass on top of it.
- When real photography arrives, replace the Backdrop's background with the image and keep everything else.
