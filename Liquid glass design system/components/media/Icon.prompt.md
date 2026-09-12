The only icon primitive. Wraps a Lucide glyph in a currentColor box.

```jsx
<Icon name="book-open" size={18} />
<IconButton label="Play"><Icon name="play" size={26} /></IconButton>
```

Notes
- Requires `<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js">` on the page.
- Stroke weight is 1.75 system-wide. Do not mix weights in one view.
- Sizes in use: 16 inside labels, 18–20 in menus and docks, 26 for player transport.
- Never substitute an emoji or a hand-drawn SVG for a missing glyph — pick a different Lucide name.
