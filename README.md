# yongjiexue88.github.io

Personal blog for Yongjie Xue — 萦怀, *thoughts that linger*.

Live at **https://yongjiexue88.github.io/**

## Development

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
```

Deployed to GitHub Pages by [.github/workflows/deploy.yml](.github/workflows/deploy.yml),
which builds the Vite `dist/` output on every push to `main`.

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

Because GitHub Pages has no rewrite rules, [public/404.html](public/404.html)
implements the standard SPA redirect so deep links survive a hard refresh; its
decode counterpart is inline in `index.html`. Both must stay in sync.

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

The register is *technical editorial*: cool neutrals rather than warm paper,
and borders that are the text hue held at low opacity rather than an opaque
grey. Depth comes from tint and hairlines — emphasis is a focus ring, never a
drop shadow.

| Token | Light | Dark |
| --- | --- | --- |
| ground | `#F1F4F8` | `#0E1620` |
| surface | `#FFFFFF` | `#16222E` |
| ink | `#16222E` | `#E3E9F0` |
| accent | `#245F94` | `#7FB3DC` |
| border | `rgba(48,74,105,.14)` | `rgba(148,180,210,.16)` |

Type: Chakra Petch (headings), Inter (body), IBM Plex Mono (code) — all
open-licensed, loaded from Google Fonts in `index.html`, with CJK fallbacks
appended since none of the three ship CJK glyphs.

**Import order is load-bearing.** The light theme also emits on `:root` as a
base palette, and `:root` has the same specificity as `[data-theme="dark"]`,
so `_constants.scss` must import light *before* dark or dark mode silently
loses the cascade.
