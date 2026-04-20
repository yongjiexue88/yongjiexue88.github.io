# yongjiexue88.github.io

Personal website for Yongjie Xue.

## Development

```bash
npm ci
npm run finance:api
npm run dev
```

The finance dashboard prefers a live Yahoo-backed API at `/api/finance/overview`.
During local development, run `npm run finance:api` in a second terminal.
By default the API listens on `http://localhost:3001`, and Vite proxies `/api/*` there.
On GitHub Pages, the UI falls back to `public/data/finance/overview.json`.
The Pages deploy workflow now regenerates that snapshot and redeploys the site every 5 minutes using GitHub Actions, so no separate Node host is required for the static site.
GitHub Actions cron uses UTC, not Central Time, and the shortest supported interval is 5 minutes.
This repo's schedule is `3,8,13,18,23,28,33,38,43,48,53,58 * * * *`, which means every 5 minutes, not every minute.

## Production build

```bash
npm run build
```

This repository deploys to GitHub Pages through a GitHub Actions workflow that publishes the Vite `dist/` output.
