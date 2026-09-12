Immediate settings — the change applies the moment it moves.

```jsx
<Switch checked={dark} onChange={(e) => setDark(e.target.checked)}
  label="Reduce transparency" description="Replaces glass with solid fills." />
```

Notes
- Never put a Switch behind a Save button; it commits instantly.
- The knob keeps its refraction even in solid contexts — it is the system's signature.
