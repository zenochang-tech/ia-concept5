# Involve Asia — Corporate Website Revamp (Concept 5)

Static preview build for internal review.

- **Homepage** — `index.html` → `ia-bundle.jsx`
- **Publisher Overview** — `for-publishers.html` → `publishers.jsx`
- **Shared UI** (Nav, Footer, Back-to-Top, smooth scroll, reveal) — `ia-shared.jsx`

React, GSAP and Lenis load from a CDN (needs internet). All images/videos are
bundled in `media/`. The `.jsx` files are compiled in the browser by
Babel-standalone — no build step required.

## Deploy on GitHub Pages
1. Push this folder to a GitHub repo (see steps below).
2. Repo **Settings → Pages → Source: "Deploy from a branch" → `main` / `(root)`**.
3. Live in ~1–2 minutes at `https://<username>.github.io/<repo>/`
   - Homepage: `.../index.html`
   - Publisher page: `.../for-publishers.html`
