# AGENTS.md

## Project Identity
This repository is the static site template. It is optimized for fast delivery while staying clean, understandable, and easy to restyle or extend.

## Core Stack
- Node.js 24.x LTS
- pnpm
- TypeScript strict mode
- React 19.x
- Next.js 16.x
- Tailwind CSS 4.x
- Docker for local development
- Static export hosting path with minimal runtime complexity

## Cross-Platform Requirement
Target local development for both macOS and Windows 11.
All commands, scripts, file paths, Docker workflows, and editor guidance must work cleanly across both operating systems.
Prefer cross-platform commands and avoid shell-specific assumptions unless clearly labeled.
Ensure compatibility with Docker Desktop on both macOS and Windows.

## Architecture Rules
This repository is intentionally simple.

### Single App Model
- Use one Next.js application
- Keep the baseline focused on public website routes
- Prefer static content and reusable UI over server-side scaffolding
- Keep business and content structure out of presentation-heavy page files

## Required Repo Shape
The repository should evolve toward this structure:

- src/
  - app/
    - (marketing)/
  - components/
    - ui/
  - features/
  - styles/
- docker/
- docs/

## Coding Standards
- Use strict TypeScript
- Use feature-oriented organization
- Use PascalCase for React components
- Use camelCase for variables and functions
- Use kebab-case for route folders
- Use clear names for content modules, sections, and UI primitives
- Avoid putting large content structures directly inside page components
- Avoid vague utils dumping grounds

## Static Site Discipline Rules
This is fast-moving, not sloppy.
- Keep the architecture simple
- Prefer static-first implementations
- Add runtime complexity only when a real feature requires it
- Keep a clean path toward future expansion without prebuilding unused auth, database, or API layers

## Figma Rules
Follow docs/figma-workflow.md.
Translate Figma into reusable UI where practical.
Favor speed with clean structure over over-engineering.

## Required Workflow
1. Read PROJECT_STATUS.md before starting any task.
2. Summarize current state before changing code.
3. Propose the next highest-priority task.
4. Update PROJECT_STATUS.md before major work.
5. Implement in small milestones.
6. Update PROJECT_STATUS.md after each major milestone.
7. Never leave PROJECT_STATUS.md stale after meaningful work.

## Initial Build Priorities
When bootstrapping this repository, build in this order:
1. Next.js app structure
2. Public page and content foundation
3. Reusable UI structure
4. Docker / compose local environment
5. Testing foundation
6. Static deployment readiness

## Commands Policy
Prefer commands that work cross-platform.
Prefer package scripts over shell-specific commands.
When adding a tool, expose it through package.json scripts.

## Definition of Done for Major Tasks
A major task is only done when:
- code compiles
- lint/typecheck targets are updated if applicable
- docs are updated if needed
- PROJECT_STATUS.md reflects the current state
