# Using Liquidglass in your own project

## 1. Copy the files in

From this folder, you need:

```
styles.css          → the only stylesheet; imports every token file
tokens/             → all CSS custom properties
components/         → the React sources
assets/README.md    → what to replace (logo, icons, fonts, imagery)
```

Leave behind `dev-loader.js`, `overview.*`, `playground.*`, `guidelines/`, `ui_kits/` and `support.js` — those exist to view and document the system, not to ship.

## 2. Link the stylesheet once

```html
<link rel="stylesheet" href="/liquidglass/styles.css" />
```

Set the theme on the root element:

```html
<html data-lg-theme="dark">   <!-- or "light" -->
```

Dark is the default and where glass looks right.

## 3. Get the fonts and icons

Both are **substitutions** — the source library shipped neither. Swap them for your own if you have them.

```bash
npm install geist lucide-react
```

- **Geist** — or replace the `@import` at the top of `tokens/fonts.css` with your own `@font-face` rules and update `--lg-font-sans` / `--lg-font-mono`.
- **Lucide** — `components/media/Icon.jsx` is the only file that references it. Rewrite that one file to use `lucide-react` (or your own SVG set) and nothing else changes.

## 4. Import components normally

The `.jsx` files are plain React function components. No build config, no dependencies beyond React 18.

```jsx
import { Backdrop } from './liquidglass/components/media/Backdrop.jsx';
import { Button } from './liquidglass/components/forms/Button.jsx';
import { Card } from './liquidglass/components/surfaces/Card.jsx';

export default function Page() {
  return (
    <Backdrop hue="azure" style={{ minHeight: '100vh' }}>
      <Card
        variant="glass"
        cornerRadius={24}
        eyebrow="ESSAY · 12 MIN"
        title="The cost of a transparent surface"
        description="When refraction earns the spend, and when it is just fog."
      />
      <Button variant="accent">Read it</Button>
    </Backdrop>
  );
}
```

Props for every component are in `components/<group>/<Name>.d.ts`. When to use each one — and when not to — is in `components/<group>/<Name>.prompt.md`.

## Framework notes

**Next.js (app router)** — components use `useState` and pointer events, so mark them `'use client'` or import them into a client component. Import `styles.css` once in `app/layout.js`.

**Vite / CRA** — works as-is. Import `styles.css` in your entry file.

**Astro / Eleventy / Hugo** — the tokens and `styles.css` transfer with no changes, and you can hand-write glass surfaces against the CSS custom properties. The React components would need porting to your template language; ask me and I'll do that conversion for your specific setup.

**Tailwind** — the two coexist. Liquidglass uses inline styles and custom properties, so there's no class collision. Reference tokens in Tailwind config if you want `bg-[var(--lg-solid-fill)]` style utilities.

## The five rules

1. **Glass floats, solid holds still.** Nav, toolbars, dialogs, controls, anything overlapping content → glass. Article bodies, tables, dense forms → solid.
2. **Never glass on glass.** Inside a glass `Panel`, fields go `variant="solid"`.
3. **Every screen needs a `<Backdrop>`.** Glass over a flat fill is a grey box.
4. **One accent per view.** Accent means interaction, never decoration.
5. **Never stack elevation on glass.** One shadow. Depth comes from blur and edge brightness.

## Browser support

The SVG displacement filter renders **only in Chromium**. Safari and Firefox fall back to blur + saturation + the edge stack, which still looks deliberate. Pass `refraction={false}` to opt out explicitly and check that path.

## Replace before shipping

There is no logo (the wordmark renders as text), no photography, and no illustrations. `ImagePlaceholder` and `Backdrop variant="photo"` mark every image slot with a label saying what belongs there. See `assets/README.md`.
