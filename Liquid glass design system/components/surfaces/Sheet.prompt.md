Secondary content that slides in from an edge: filters, now-playing, a share tray.

```jsx
<Sheet open={open} side="bottom" onClose={close}>
  <Slider label="Text size" value={size} onChange={setSize} />
</Sheet>
```

Notes
- Bottom sheets get a grab handle automatically; they read as draggable even though the demo isn't.
- Use Sheet for adjustments, Dialog for decisions.
