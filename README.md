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
| `cover` | Optional card image; cards are designed to work without one |

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

## Theming

Themes are `data-theme` attributes on the root, built by the `build-theme()`
mixin in `src/styles/themes/_theme-variables-builder.scss` and registered in
`public/data/settings.json`. Shipping: `paper`, `paper-dark`, plus the
template's original `light` and `dark`.
