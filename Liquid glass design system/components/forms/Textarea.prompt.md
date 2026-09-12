Long-form entry: comments, notes, a short bio.

```jsx
<Textarea label="Note" rows={5} variant="solid"
  value={note} onChange={(e) => setNote(e.target.value)} />
```

Notes
- Resizes vertically only.
- Same glass-on-glass rule as Input: `solid` when inside a glass surface.
