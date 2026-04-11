# Static Site Template

Forkable Next.js starter focused on public pages, clean structure, and a low-friction static export workflow.

## What This Template Includes
- Next.js 16 App Router for public website routes
- React 19, TypeScript strict mode, and Tailwind CSS v4
- Static export output for CDN or object-storage style hosting
- Reusable UI and feature-level content modules
- Vitest starter coverage plus CI for lint, typecheck, tests, and build
- Docker support for app-only local development

## Requirements
- Node.js 24+
- pnpm
- Docker Desktop

## Quick Start
1. Generate `.env` with your preferred local app port by running `pwsh -File ./scripts/setup-local.ps1` on Windows or `bash ./scripts/setup-local.sh` on macOS / Linux.
2. Start the local app with `docker compose up --build`.
3. Open `http://localhost:<APP_PORT>` and start replacing the template copy with your site content.

## Local Setup Script
- The setup script creates or updates `.env` and manages `APP_PORT`.
- Rerun the script any time you want to move the local preview to a different port.
- If you prefer to edit manually, copy `.env.example` to `.env` and update `APP_PORT` yourself.

## Static Build Workflow
- Development: `pnpm dev`
- Production build: `pnpm build`
- Static export output: `out/`

## Verification
- Unit tests: `pnpm test`
- Full local verification: `pnpm check`
- Production build: `pnpm build`

## Scripts
- `pwsh -File ./scripts/setup-local.ps1`
- `bash ./scripts/setup-local.sh`
- `pnpm dev`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm check`
- `pnpm build`
- `docker compose up --build`
- `docker compose down`

## Fork Checklist
- Rename the package in `package.json`
- Update app metadata in `src/app/layout.tsx`
- Replace the starter marketing copy in `src/features/site/siteContent.ts`
- Add or remove public routes as your site grows
- Deploy the generated `out/` directory to your hosting platform

## Structure
- `src/app`: public App Router pages
- `src/components`: reusable UI building blocks
- `src/features`: feature-level content and helpers
- `src/styles`: global styling
- `docker`: local containerization notes
- `.github/workflows`: starter CI automation

## Local URLs
- App: `http://localhost:<APP_PORT>` (default `http://localhost:3000`)
- About page: `http://localhost:<APP_PORT>/about`
