Continuous value: volume, scrub position, type size, blur amount.

```jsx
<Slider label="Volume" value={vol} displayValue={vol + '%'} onChange={setVol} />
```

Notes
- `onChange` receives a **number**, not an event.
- Use `displayValue` to format — the component never renders the raw number itself.
- Doubles as a media scrubber: pass seconds and a formatted `displayValue`.
