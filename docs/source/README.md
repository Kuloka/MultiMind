# Website effects

The homepage uses `LandingScene.jsx`, shared `showcase/ParticleField.jsx` and Kokonut UI Background Paths from the 21st.dev catalogue. The helix sits on the right during four scroll chapters and moves only with scrolling. `scroll-captions.css` styles the localized feature text on the left, with a reading interval followed by a fade/blur transition. The static HTML remains available to assistive technology and without JavaScript. `landing-scene.css` owns the hero and story spacing. The existing navigation stays visible to keep downloads within reach, including on mobile. The recording playground lives at `/showcase/`; build it with `npm run build:showcase --prefix docs/source`. Attribution is in `showcase/README.md` and `showcase/KOKONUT-LICENSE.txt`.

The build also emits `background-effects.js`, `background-effects.css` and its legal notice in the repository root for Electron. These are prebundled Pattern Waves / Pixel Blast components, with dependencies isolated in this build directory. Component provenance and local lifecycle adjustments are listed in `backgrounds/SOURCES.md`. The website's new particle scene uses Canvas 2D and does not require WebGPU.

The desktop Gateway Flow engine remains in `gateway-flow.js`, with app options in `renderer.js`. The website uses the independent particle scene described above. BorderGlow keeps the supplied edge-proximity calculation on the existing download buttons and cards; the numbered feature rows remain unboxed.

Source: https://github.com/DavidHDev/react-bits — copyright David Haz. See REACT-BITS-LICENSE.md. Components are integrated into the AetherAI website.

Build from the repository root:

```
npm ci --prefix docs/source
npm run build --prefix docs/source
```

The build also generates the static English docs/index.html from docs/render.js and the three docs/locales*.js files. Those same translations and markup drive the language picker in the browser. English is the default; a visitor's explicit selection is stored locally. All ten language packs match the desktop language list and include feature demos, downloads, metadata and accessibility text.

Commit generated docs/index.html, docs/effects.js, docs/effects.css and docs/effects.js.LEGAL.txt alongside source changes. GitHub Pages and Cloudflare Pages serve the static docs directory without a build step or external CDN. These dependencies are isolated from the desktop application. Run npm test and the Electron tests/site-smoke.cjs harness (also with --motion) after changes.
