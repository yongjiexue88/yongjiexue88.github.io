# Post covers

Covers resolve by convention. Drop an image here named after the post's slug
and it is picked up automatically — no frontmatter edit, no code change:

    public/images/covers/<slug>.jpg     (or .jpeg .png .webp .avif .svg)

The slug is `frontmatter.slug` when set, otherwise the filename of the post
minus `.mdx`. A `cover:` in frontmatter overrides the convention.

Covers render 16:9 on the post hero and on cards, so crop accordingly.
Aim for ~1600px wide; anything larger is wasted on this layout.

Resolution happens at build time in `postIndexPlugin` (vite.config.js).
