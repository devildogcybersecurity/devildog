# Figma Workflow

## Purpose
Use Figma as the design source of truth for product intent, not as a mandate to blindly recreate every pixel. The implemented UI must preserve hierarchy, spacing intent, interaction states, accessibility, and responsiveness.

## Rules
1. Convert repeated Figma patterns into reusable components.
2. Map recurring spacing, radius, typography, and color choices into design tokens or shared styles.
3. Preserve accessibility even if the design file is incomplete.
4. Implement hover, focus, disabled, loading, empty, and error states even if Figma only shows the happy path.
5. Build mobile and desktop behavior intentionally. Do not assume desktop-only layouts.
6. Flag ambiguities in code comments, docs, or PROJECT_STATUS.md when needed.

## Delivery Rules for AI
- Read AGENTS.md first.
- Read PROJECT_STATUS.md before starting implementation.
- When implementing from Figma, note the screen/component name in PROJECT_STATUS.md.
- Prefer reusable React/Tailwind components over one-off markup.
- Avoid hardcoded magic values when a token or shared style is appropriate.

## Suggested Implementation Notes
- Put reusable UI primitives in a shared ui or components/ui folder.
- Put feature-specific composed UI in the feature folder.
- Keep design-system decisions documented in docs/architecture.md.
