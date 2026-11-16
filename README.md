# Abtin Saadat — Portfolio

Game dev portfolio built with Vue 3 + Vite. Deployed to GitHub Pages.

## Develop

```bash
npm install
npm run dev
```

## Edit content

- `src/data/games.js`: games, in display order. The first one is also shown in the hero, playing its trailer.
  `stamp` is the orange film date in the corner of each print, and `caption` is the handwritten note under it.
- `src/data/profile.js`: name, bio, stats, links
- `public/games/<game>/`: cover art and screenshots (WebP, ~1280px wide)

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes `dist/`.
One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

`vite.config.js` uses `base: './'`, so the site works both as a user site
(`abtinzero.github.io`) and as a project site (`abtinzero.github.io/<repo>/`).
