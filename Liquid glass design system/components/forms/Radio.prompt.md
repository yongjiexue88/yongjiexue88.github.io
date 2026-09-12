Mutually exclusive choice where each option needs a description.

```jsx
{plans.map((p) => (
  <Radio key={p.id} name="plan" value={p.id} checked={plan === p.id}
    onChange={() => setPlan(p.id)} label={p.name} description={p.blurb} />
))}
```

Notes
- Always pass the same `name` to every member of a group.
- Three or more options with descriptions: Radio. Short labels only: SegmentedControl.
