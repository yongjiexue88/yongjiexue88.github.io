Repeating content units: posts, books, pricing tiers, feature grids.

```jsx
<Card
  eyebrow="Essay"
  title="On Refraction"
  description="Why the edge matters more than the blur."
  media={<ImagePlaceholder label="cover" ratio="3 / 2" />}
  footer={<span style={{ font: 'var(--lg-type-caption)' }}>8 min read</span>}
  onClick={() => open('refraction')}
/>
```

Notes
- In a grid of cards, keep them all one variant. Mixed glass and solid looks like a bug.
- Over busy photography switch to `variant="solid"` — refraction plus a photo plus text is too much.
