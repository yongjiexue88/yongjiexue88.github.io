A decision that must be made before anything else continues.

```jsx
<Dialog open={open} onClose={close} title="Delete draft?"
  description="This cannot be undone."
  footer={<><Button variant="ghost" onClick={close}>Cancel</Button>
           <Button variant="accent" onClick={del}>Delete</Button></>}
/>
```

Notes
- Fields inside a Dialog use `variant="solid"` — the plate is already glass.
- One Dialog at a time; never stack them.
