# AetherAI recording playground

Build from the repository root with `node docs/source/showcase/build.cjs`. Serve `docs/` and open `/showcase/`. React and esbuild are resolved from the existing `docs/source/node_modules` dependencies. The regular homepage is not rebuilt by this command.

Move the cursor through the sculpture. Select Orbit / Helix / Aether. Autopilot morphs between forms every 5.5 seconds. Press R or use the recording control for a clean full-screen sculpture; Escape exits. Reduced motion disables rotation and autoplay. Pause is available independently on the hero and result.

The conversation is a local demonstration with three prepared scenes, not a live AI call. Supported prompts refer to a spiral, logo or orbit. Arbitrary unsupported requests show a useful explanation. Result/code tabs, replay, pause and full-screen controls work locally. Download links point to the current GitHub release.

## Sources

React API reference: https://react.dev/reference/react

Background Paths is adapted from Kokonut UI, available in the 21st.dev catalogue: https://21st.dev/@kokonutd/components/background-paths . Source: https://github.com/kokonut-labs/kokonutui/blob/main/components/kokonutui/background-paths.tsx . The original path-generation math is retained, animation uses CSS, and the landing-page content is AetherAI's. MIT attribution is preserved in KOKONUT-LICENSE.txt and BackgroundPaths.jsx.

Particle sculpture, morphing, logo sampling and interaction are original local code. Branding comes from the repository's AetherAI SVG, not third-party branding.
