Confirms something already happened. Never asks a question.

```jsx
<Toast
  position="fixed"
  tone="success"
  icon={<Icon name="check" size={18} />}
  title="Saved to library"
  action={<Button variant="ghost" size="sm" onClick={undo}>Undo</Button>}
  onClose={dismiss}
>On this device only.</Toast>
```

Notes
- The component renders; you own the timer and the queue.
- Anything requiring a decision is a Dialog.
- Tone colours the icon, not the pane — a red glass slab reads as a crash.
