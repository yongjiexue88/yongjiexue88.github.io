The container for everything else. Any glass area bigger than a card is a Panel.

```jsx
<Panel padding="32px" style={{ maxWidth: 720 }}>
  <h2 style={{ font: 'var(--lg-type-title)' }}>Reading settings</h2>
  <Switch label="Reduce transparency" />
</Panel>
```

Notes
- Panels are frosty (0.35) on purpose — paragraph text over a 0.1 blur is unreadable.
- Do not nest glass Panels. The inner one becomes `variant="solid"`.
- Above ~400px the panel shader is automatic; don't override `shader` unless you have measured it.
