Contextual actions: overflow menus, right-click menus, account menus.

```jsx
<Menu
  onSelect={run}
  items={[
    { value: 'export', label: 'Export EPUB', icon: <Icon name="download" />, shortcut: '⌘E' },
    { divider: true },
    { value: 'delete', label: 'Delete', tone: 'danger' },
  ]}
/>
```

Notes
- The component is the pane only — you own the open/close state and positioning.
- Destructive rows go last, behind a divider.
