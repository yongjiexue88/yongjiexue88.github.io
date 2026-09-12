Primary navigation as a floating pane. The signature Liquidglass component.

```jsx
<Dock
  position="fixed"
  value={tab}
  onChange={setTab}
  items={[
    { value: 'library', label: 'Library', icon: <Icon name="library" /> },
    { value: 'read', label: 'Read', icon: <Icon name="book-open" /> },
    { value: 'you', label: 'You', icon: <Icon name="user" /> },
  ]}
/>
```

Notes
- Content behind a `fixed` Dock needs bottom padding of ~100px, or it refracts under it forever.
- Three to five items. Beyond five the pill gets wider than the content it floats over.
- Keep `elasticity` at or below 0.2 here — a nav bar that wobbles hard feels broken.
