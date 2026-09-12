Text entry. Label above, hint or error below.

```jsx
<Input label="Email" type="email" placeholder="you@domain.com"
  value={email} onChange={(e) => setEmail(e.target.value)} />
<Input variant="solid" label="Title" error="Required" />
```

Notes
- Never nest `variant="glass"` inside a glass Panel — switch to `solid`.
- Focus draws a 2px accent ring; error draws the same ring in danger red.
- `iconLeft` is for search and currency affordances, not decoration.
