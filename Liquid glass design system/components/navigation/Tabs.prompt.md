In-panel view switching where labels are words, not glyphs.

```jsx
<Tabs value={view} onChange={setView}
  tabs={[{ value: 'all', label: 'All', count: 24 }, { value: 'drafts', label: 'Drafts', count: 3 }]} />
```

Notes
- Lives inside a Panel or page body. Never use it as primary navigation — that is Dock.
- The active underline is the accent hue; inactive labels are tertiary text.
