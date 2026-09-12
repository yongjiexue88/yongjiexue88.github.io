Location within a hierarchy — docs, a book's chapter path, settings sub-pages.

```jsx
<Breadcrumbs onNavigate={go}
  items={[{ label: 'Library', href: '/library' }, { label: 'Essays' }, { label: 'On Refraction' }]} />
```

Notes
- Three to four levels. Deeper than that, truncate the middle.
- Separator is a plain `/` at disabled-text opacity — no chevrons.
