# Yongjie Xue (薛永杰)

Personal website and writings of **Yongjie Xue (薛永杰)** — Software Engineering, AI Systems & Life.

- **Website**: [https://www.yongjiexue.io/](https://www.yongjiexue.io/)
- **English**: [https://www.yongjiexue.io/en/](https://www.yongjiexue.io/en/)

---

## Tech Stack & Architecture

Built with **[Hugo Extended](https://gohugo.io/)** (0.167.0) and the **[OINK](https://oink.pgsty.com/)** documentation & blog framework (`github.com/pgsty/oink` v1.2.0).

- **Static publishing**: Generates HTML/CSS/JS served directly from the edge.
- **Bilingual (中/英)**: Automatic translation pairing and language switcher.
- **Modern UI & Dark Mode**: Semantic color system, smooth theme toggling, clean typography.
- **Full-Text Offline Search**: Client-side instant fuzzy search (`Cmd+K` palette).
- **Cloudflare Pages CI/CD**: Automatic build and edge deployment on push to `main`.

---

## Local Development

### Prerequisites

- **Hugo Extended** (0.167.0) and **Go** (1.27.2, required by `go.mod` for Hugo Modules).
- The build script downloads these pinned versions into a separate tool cache when they are missing or outdated. It supports macOS and Linux on ARM64 and AMD64 and does not replace globally installed tools.

### Commands

```bash
# Start local development server on http://localhost:1313 with live-reload
make dev

# Build production static assets into public/
make build

# Run syntax & sanity checks
make check
```

`npm run build` uses the same build script. All `make` targets use the same pinned tools.

### Browser Dependencies

OINK is checked into `_vendor/` at the version in `go.mod`. Project-owned files in `assets/third_party/` override bundled libraries that have newer stable releases; they survive `hugo mod vendor`. The terminal slide also carries its own pinned asciinema player.

The overrides are pinned, with npm archive integrity hashes and source-to-file mappings, in `scripts/browser-dependencies.json`. Python 3.9+ restores the committed assets; Node/npm is needed only to rebuild the SVG loader with the pinned esbuild and idb-keyval versions. Normal site builds do not need npm packages or Python.

```bash
# Check all browser libraries, including the theme's inventory, against npm.
python3 scripts/vendor-browser-dependencies.py --check

# Restore browser overrides from the pinned, integrity-checked archives.
python3 scripts/vendor-browser-dependencies.py

# Refresh the theme after updating its version in go.mod.
bash scripts/build.sh mod tidy
bash scripts/build.sh mod vendor
make check
```

To upgrade an override, update its version, source URL and integrity hash together from the npm registry, restore the assets, then validate the build and affected browser features. License files are retained alongside the libraries; DocSearch's license is supplied by the theme.

---

## Directory Layout

```
hugo.yaml            # Site configuration: taxonomies, outputs, menus, params, languages
go.mod               # Hugo Module dependencies (github.com/pgsty/oink pinned)
Makefile             # Developer convenience targets (make dev, make build)
content/
  ├── misc/          # Personal essays, reflections, study books, notes & miscellaneous writing
  ├── db/            # Database industry reports, trends, and architecture
  ├── cloud/         # Cloud economics, cloud-exit, and infrastructure
  ├── pg/            # PostgreSQL development, internals, and operations
  ├── ai/            # AI, Agents, LLM architecture, and AI4DB
  ├── trip/          # Travel notes and hiking journals
  ├── about/         # Profile, engineering philosophy, writing themes
  └── authors/       # Author profiles and taxonomy
data/
  ├── home.yaml      # Landing page sections: Hero, Column cards, Recent posts, CTA
  └── footer/        # Multi-language footer grid links
assets/
  ├── scss/          # Project SCSS variables and custom styles
  ├── third_party/   # Pinned browser-library overrides
  └── img/           # Avatars, logos, and graphic assets
layouts/             # Hugo template partial overrides
static/
  ├── images/        # Static images and media
  └── transcripts/   # Large study books, transcripts and companion materials
.github/workflows/
  └── pages.yaml     # GitHub Actions workflow for GitHub Pages deployment
```

---

## License

Content © 2026 Yongjie Xue. All rights reserved.  
Built with [Hugo](https://github.com/gohugoio/hugo) and [OINK](https://github.com/pgsty/oink).
