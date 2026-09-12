# yongjiexue88.github.io

Personal blog for Yongjie Xue — 萦怀, *thoughts that linger*.

Live at **https://yongjiexue88-github-io.vercel.app/**

## Development

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
```

Deployed to Vercel. The project has this repository connected, so Vercel
builds and deploys the Vite output on every push to `main`, and publishes a
preview for every pull request. There is no deploy workflow and no deploy
credential in CI — the Vercel GitHub App does the authentication.

Build and routing config lives in [vercel.json](vercel.json) rather than the
dashboard, so it is reviewable in git.

## Structure

The site is a React SPA with real permalinks, organised on two axes: posts live
in exactly one **collection** (the physical taxonomy), and carry any number of
**tags** (the cross-cutting one).

```
/                        Home — hero, collections, latest, tag cloud
/journal                 Journal index          /journal/:slug
/notes                   Booknotes index        /notes/:slug
/tags                    Tag cloud with counts  /tags/:tag
/about  /contact         JSON-defined sections
```

Legacy `#blog` / `#booknotes` / `#about` / `#contact` hashes redirect to their
routes once on load.

Deep links survive a hard refresh because of the catch-all rewrite to
`/index.html` in [vercel.json](vercel.json). Vercel applies it only after
checking the filesystem, so real files such as `/assets/*` still win.

This replaced a GitHub Pages arrangement, which had no rewrite rules and so
needed a `public/404.html` shim that redirected through a `/?/path` form,
decoded by an inline script in `index.html`. Both are gone; deep links now
return a straight 200 instead of a 404 followed by a redirect.

## Content

Posts are Markdown files under `src/content/blog/` and `src/content/booknotes/`.
The `.mdx` extension is historical — there is no MDX pipeline; files are read as
raw strings and rendered by the hand-written `markdownToHtml()` in
[src/hooks/posts.js](src/hooks/posts.js).

Frontmatter keys in use:

| Key | Purpose |
| --- | --- |
| `title`, `description` | Card and post header |
| `created`, `updated` | Ordering and displayed dates |
| `category` | Drives the filter chips on a collection index |
| `tags` | Drives `/tags` and `/tags/:tag` |
| `language` | `en` / `zh`; a shared `slug` links a translation pair |
| `slug` | Overrides the filename-derived slug |
| `visibility` | `private` hides a post |
| `fullTextUrl` | Optional long-form companion, loaded on request |
| `theme`, `mood` | Parsed, not currently rendered |
| `cover` | Optional image: card thumbnail + full-bleed hero on the post |
| `coverAlt` | Alt text for the cover |
| `coverCredit` | Optional caption under the hero |

### Metadata and body are split

Index pages read `virtual:post-index`, generated at build time by
`postIndexPlugin` in [vite.config.js](vite.config.js), which parses frontmatter
with the same parser the browser uses and drops the body. Post bodies load
per-route as separate chunks.

This matters: an eager glob previously inlined every post into the main bundle —
two booknote files alone are 576KB and 336KB — so the entry chunk was ~1.46MB.
It is now ~384KB. **Keep the content globs lazy.**

### Large transcripts

`fullTextUrl` targets in `public/transcripts/` are very large
(`debt-free-decisions-…md` is 31MB, `interactive-english-fluency-builder.md` is
13MB), so the post page loads them only when the reader clicks through, never
automatically.

Four files there are referenced by nothing and still ship with the deploy
(`interactive-english-fluency-builder.pdf`, `englishwithkayla_master.md`,
`accurate-english-study-notes.mdx`, `hampton_legal_stories.mdx` — about 16MB).

## Cover images

Covers are opt-in at three levels, and every layout is built to look finished
without one — so they can be added gradually rather than all at once.

| Level | Where to set it |
| --- | --- |
| Post | `cover:` in the post's frontmatter |
| Collection index | `cover` on the entry in [src/hooks/collections.js](src/hooks/collections.js) |
| Home | `templateSettings.homeCoverUrl` in `public/data/settings.json` |

Put the files under `public/images/`. Post covers render 16:9, index banners
21:9 (16:9 below md).

## Theming

Two themes, `light` and `dark`, built by the `build-theme()` mixin in
`src/styles/themes/_theme-variables-builder.scss` and registered in
`public/data/settings.json`.

The design system is **Liquidglass** — one material, a transparent pane that
refracts what is behind it, spent only on surfaces that float. Its token layer
is vendored verbatim under [src/styles/liquidglass/tokens/](src/styles/liquidglass/tokens/);
the material itself is ported to SCSS mixins in
[_glass.scss](src/styles/liquidglass/_glass.scss), and
[_bridge.scss](src/styles/liquidglass/_bridge.scss) maps the project's older
variable names onto it. Full contract in [DESIGN.md](DESIGN.md).

The rule that decides most things: **glass floats, solid holds still.** The
masthead dock, cards, tags, menus and dialogs are glass; article bodies, code
blocks, tables and form fields are solid, because anything read for more than
thirty seconds should not sit on a refracting surface.

| Token | Light | Dark |
| --- | --- | --- |
| ground | `#F7F9FB` | `#04060A` |
| surface (solid) | `#FFFFFF` | `#11161F` |
| ink | `#04060A` | `#FFFFFF` |
| accent (azure) | `oklch(.58 .16 250)` | `oklch(.72 .16 250)` |
| border | `rgba(4,6,10,.17)` | `rgba(255,255,255,.16)` |

Every screen sits on a static three-stop radial colour mesh
([LayoutStaticBackground](src/components/layout/LayoutStaticBackground.jsx)) —
glass over a flat fill is just a grey box. The mesh never animates; the motion
budget belongs to the glass.

Type: Geist (sans, including the display role) and Geist Mono (metadata), both
open-licensed and loaded from Google Fonts in `index.html`, with CJK fallbacks
appended since neither ships CJK glyphs. Weights stop at 600.

Refraction renders only in Chromium. Elsewhere the material degrades to blur,
saturation and the edge stack, which is the fallback the system documents.

**Import order is load-bearing.** The light theme also emits on `:root` as a
base palette, and `:root` has the same specificity as `[data-theme="dark"]`,
so `_constants.scss` must import light *before* dark or dark mode silently
loses the cascade.
