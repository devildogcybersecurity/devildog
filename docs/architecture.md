# Architecture Overview

## Goal
Provide a fast-moving static website template using one Next.js application with clean internal boundaries and a straightforward static export path.

## Target Structure
- src/app: routes and route groups
- src/features: domain organization
- src/components: reusable UI
- src/styles: global styling
- docker/: local development assets

## Notes
- Prefer public pages and shared content modules over server-side orchestration.
- UI components should not contain durable content or navigation data that belongs in feature modules.
- Keep the codebase easy to evolve, but do not introduce auth, database, or API scaffolding until a project actually needs it.
