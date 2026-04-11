# AGENTS.md

## Project Identity
This repository is the MVP template. It is optimized for fast delivery while staying clean, understandable, and upgrade-friendly. It intentionally reduces architectural complexity compared to the secure production template.

## Core Stack
- Node.js 24.x LTS
- pnpm
- TypeScript strict mode
- React 19.x
- Next.js 16.x
- Tailwind CSS 4.x
- Prisma ORM
- PostgreSQL 18.x
- Auth.js
- OAuth providers:
  - Microsoft Entra ID
  - Google
  - Apple
- Docker for local development
- Terraform-ready hosting path, but minimal complexity for the MVP

## Cross-Platform Requirement
Target local development for both macOS and Windows 11.
All commands, scripts, file paths, Docker workflows, and editor guidance must work cleanly across both operating systems.
Prefer cross-platform commands and avoid shell-specific assumptions unless clearly labeled.
Ensure compatibility with Docker Desktop on both macOS and Windows.

## Architecture Rules
This repository is intentionally simpler than the secure template.

### Single App Model
- Use one Next.js application
- Marketing site and app UI live together
- Route handlers, server actions, and server-side services may live in the same repo
- Database access happens from the server runtime only
- Keep business logic out of presentation components even in the MVP

## Required Repo Shape
The repository should evolve toward this structure:

- src/
  - app/
    - (marketing)/
    - (app)/
    - api/
  - components/
    - ui/
  - features/
  - lib/
  - server/
    - services/
    - repositories/
  - styles/
  - tests/
- prisma/
- docker/
- docs/

## Coding Standards
- Use strict TypeScript
- Use feature-oriented organization
- Use PascalCase for React components
- Use camelCase for variables and functions
- Use kebab-case for route folders
- Use clear names for services, repositories, and validators
- Avoid putting large business logic directly inside page components
- Avoid vague utils dumping grounds

## MVP Discipline Rules
This is fast-moving, not sloppy.
- Keep the architecture simple
- Keep boundaries clear inside the single app
- Validate inputs at boundaries
- Keep DB access server-only
- Keep a clean migration path toward future layer separation

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
2. Docker / compose local environment
3. Prisma and PostgreSQL foundation
4. Auth foundation
5. Feature folder structure
6. Testing foundation
7. Minimal Terraform-ready hosting skeleton

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
