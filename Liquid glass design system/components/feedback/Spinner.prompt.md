Unknown-length waits — a search, a sync, a first load.

```jsx
<Button variant="ghost" disabled iconLeft={<Spinner size={16} />}>Exporting…</Button>
```

Notes
- Inherits `currentColor`, so it matches whatever text it sits beside.
- Under ~400ms show nothing at all; a flashed spinner reads as jank.
