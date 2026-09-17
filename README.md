# 萦怀 · Yongjie Xue

Personal blog and digital garden for **Yongjie Xue (薛勇杰)** — *縈懷, thoughts that linger*.

- **Website**: [https://www.yongjiexue.io/](https://www.yongjiexue.io/)
- **English**: [https://www.yongjiexue.io/en/](https://www.yongjiexue.io/en/)

---

## Tech Stack & Architecture

Built with **[Hugo Extended](https://gohugo.io/)** (0.160.1+) and the **[OINK](https://oink.pgsty.com/)** documentation & blog framework (`github.com/pgsty/oink`).

- **Fast & Zero-Runtime**: Generates pure static HTML/CSS/JS in under 1 second.
- **Bilingual (中/英)**: Automatic translation pairing and language switcher.
- **Modern UI & Dark Mode**: Semantic color system, smooth theme toggling, clean typography.
- **Full-Text Offline Search**: Client-side instant fuzzy search (`Cmd+K` palette).
- **Cloudflare Pages CI/CD**: Automatic build and edge deployment on push to `main`.

---

## Local Development

### Prerequisites

- **Hugo Extended** (0.160.1+): `brew install hugo`
- **Go** (1.27+, required by `go.mod` for Hugo Modules): `brew install go`

### Commands

```bash
# Start local development server on http://localhost:1313 with live-reload
make dev

# Build production static assets into public/
make build

# Run syntax & sanity checks
make check
```

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
