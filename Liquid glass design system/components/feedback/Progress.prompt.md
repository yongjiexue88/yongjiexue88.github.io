Known-length progress. For unknown length use Spinner.

```jsx
<Progress label="On Refraction" value={62} displayValue="62%" />
<Progress size="sm" tone="inverse" value={pos} max={dur} />
```

Notes
- The bar is a flat fill, not glass — a 6px glass sliver refracts nothing.
- `size="sm"` with no label is the reading-position indicator used across the book kits.
