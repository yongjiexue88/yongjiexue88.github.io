Elastic glass — use it for anything the pointer should be able to nudge: floating docks, hero call-to-action pills, draggable-feeling panels.

```jsx
<LiquidGlass
  elasticity={0.35}
  cornerRadius={100}
  padding="8px 16px"
  blurAmount={0.1}
  saturation={130}
  onClick={() => setOpen(true)}
>
  <span style={{ font: 'var(--lg-type-glass-label)' }}>Subscribe</span>
</LiquidGlass>
```

Notes
- Passing `onClick` is what turns on the press scale and the three sheen layers. Without it the pane is decorative and never highlights.
- `elasticity` above ~0.5 reads as a bug. 0.15 for panels, 0.35 for buttons.
- `mouseContainer` lets a small pane respond to movement anywhere in a hero section — pass the section's ref.
- One or two elastic elements per screen. Everything moving at once is noise; use GlassSurface for the rest.
