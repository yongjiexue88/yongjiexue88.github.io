A person. Initials by default — no generated portraits.

```jsx
<Avatar name="Ada Lovelace" size="lg" ring />
<Avatar name="Reader" src="/assets/portrait.jpg" />
```

Notes
- Tint is hashed from `name`, so the same person is the same color everywhere.
- `ring` marks the current user; don't ring everyone.
