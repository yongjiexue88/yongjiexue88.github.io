User-controlled keywords: filter chips, a post's topics, applied facets.

```jsx
{topics.map((t) => (
  <Tag key={t} selected={active.includes(t)} onClick={() => toggle(t)}>{t}</Tag>
))}
<Tag onRemove={() => clear('epub')}>EPUB</Tag>
```

Notes
- Lay tag rows out with flex + `gap: 8`, never inline whitespace.
- Selected state is the inverse fill, not the accent — accent is reserved for actions.
