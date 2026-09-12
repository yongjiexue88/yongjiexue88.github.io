Independent on/off for a list of options.

```jsx
<Checkbox checked={ok} onChange={(e) => setOk(e.target.checked)}
  label="Email me new chapters" description="About once a month." />
```

Notes
- The whole row is the label — clicking the text toggles it.
- For a single immediate setting use Switch; Checkbox implies a form you submit.
