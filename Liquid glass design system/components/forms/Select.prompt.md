Choose one of many. Falls back to the OS picker on mobile by design.

```jsx
<Select label="Format" value={fmt} onChange={(e) => setFmt(e.target.value)}
  options={[{ value: 'epub', label: 'EPUB' }, { value: 'pdf', label: 'PDF' }]} />
```

Notes
- Option list is OS-rendered, so it is never glass — that is intentional.
- For 2–4 mutually exclusive options prefer SegmentedControl.
