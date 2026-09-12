Two to four mutually exclusive options with short labels.

```jsx
<SegmentedControl value={mode} onChange={setMode}
  options={['Day', 'Sepia', 'Night']} />
```

Notes
- Labels must be one or two words. Longer ones make the lens jump awkwardly.
- Five or more options: use Select. Options needing description: use Radio.
