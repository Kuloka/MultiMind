# Design

## Source of truth
Active, 2026-10-10. This contract covers the AetherAI `/showcase/` recording playground. Evidence: existing desktop logo in `resources/aetherai-logo.svg`, website source in `docs/source`, user-supplied Clop Code video, and the user's preference for screen recording, zooms and cursor interaction instead of image-and-caption slides. The existing download website and desktop UI have their own established layout.

## Brand
Monochrome, confident, curious. Use the actual AetherAI mark. Show the provider honestly. Avoid third-party impersonation, invented performance claims, promises of free Claude, cartoon mascots and generic marketing card grids.

## Product goals
A striking, functioning page the user can record themselves. Interactive particle sculpture, smooth transformations, an executable visual example, and working download navigation. This is a presentation playground, not a live cloud chat service.

## Personas and jobs
Creator recording a product teaser on a desktop; visitors exploring on a phone. The primary job is to move the cursor, change the sculpture and run a visual example without setup or paid API calls.

## Information architecture
`/showcase/`: cinematic hero, interactive demo, download footer. Primary action opens the demo. Secondary action leads to the current GitHub release. Recording mode removes navigation and lets the sculpture fill the viewport.

## Design principles
Motion is the subject, not decoration around static screenshots. Each control changes a visible state. Keep short text on the same surface as the interaction. Preserve truthfulness about the demonstration.

## Visual language
Near-black background, warm-white text and particles; muted neutral text. Large tightly spaced Segoe UI typography, generous open space, thin rules, minimal outlines and rounded controls. Smooth particle morphs, restrained hover feedback, no strobing. Adapt Kokonut UI's Background Paths from the 21st.dev catalogue, with attribution and its MIT license.

## Components
React hero and scene selector; canvas particle sculpture; adapted Background Paths; demonstration composer; preview/code tabs; fullscreen and recording controls. Tokens owned by `docs/source/showcase/showcase.css`.

## Accessibility
Semantic headings, labelled inputs and buttons, visible keyboard focus, native links, status announcements for generation. Honour reduced motion, provide pause and keyboard escape, keep readable contrast. Do not trap focus in recording mode.

## Responsive behavior
Desktop: text to the left of the sculpture, demo split between conversation and result. Below 760px: stacked hero and demo, compact navigation, touch controls replace hover hints. No horizontal document overflow at 390px.

## Interaction states
Idle, generating, completed, cancelled and empty input. Demo generation uses local presets and says so. Disable resubmission while generating; clean up timers and animation frames. Downloads are actual links. Fullscreen failures surface a usable message.

## Content voice
Russian by default, brief and direct. Use AetherAI consistently. Explain that demo results are prepared examples; don't imply arbitrary prompts call an AI provider.

## Implementation constraints
Use the existing React 19.2 and esbuild dependencies in `docs/source`. Bundle locally without a runtime CDN. Keep the current public homepage and Search Console file. Canvas caps device pixel ratio and particle count, pauses when hidden and honours reduced motion. Validate desktop/mobile screenshots and demo interactions before handing over.

## Open questions
No blocking questions. Publication on the existing Cloudflare website is authorized by the user's follow-up request.

## Homepage integration
The latest correction requires a full-viewport, visibly rotating helix and a neutral grayscale palette. The helix uses independent viewport-based horizontal and vertical scales, denser white particles, and continuous rotation. All cloud colors are neutral gray; cloud positions are clamped to the viewport as their particle anchors move.
The user requested publication on the existing Cloudflare website, then clarified that the helix must stay centered and information must emerge as clouds from its turns. Four scroll chapters activate glass speech bubbles anchored to actual projected particle coordinates. The helix remains visible and rotates with scroll progress; it fades only after the story. Original HTML copy stays accessible and works without JavaScript. All ten languages, feature tabs, native downloads, canonical metadata, CSP and the Google verification file are preserved. Pause/resume is localized. Publishing is authorized by the request to put this on the existing site.

The desktop composer places the quota circle last in the model/action row. Long model names truncate, the circle shrinks at narrow widths, and extra chevrons hide only at the smallest breakpoint. The percentage and accessible quota description remain available.
