Icon-only affordance: player transport, close, overflow, toolbar actions.

```jsx
<IconButton variant="glass" size="xl" label="Play" onClick={play}>
  <Icon name="play" size={26} />
</IconButton>
```

Notes
- Always pass `label` — it becomes `aria-label` and the tooltip.
- `sm` (36px) breaks the 44px touch minimum; pointer-only surfaces only.
- Glass variant is for transport controls over media. Use `ghost` in toolbars and panel headers.
