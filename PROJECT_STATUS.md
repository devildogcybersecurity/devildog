# PROJECT_STATUS

## Project
- Name: mvp-template
- Template Type: MVP
- Current Branch: codex/local-setup-hardening
- Last Updated: 2026-04-10

## Current Phase
- Fork-ready template baseline

## Completed
- Reviewed repository guidance and architecture notes.
- Bootstrapped initial Next.js MVP app scaffold with strict TypeScript, Tailwind CSS v4, and feature/server folder boundaries.
- Added baseline project configuration (`package.json`, TypeScript, ESLint, Next.js, PostCSS, app routes, and API health endpoint).
- Added initial Prisma and Docker placeholder directories/files.
- Added a local Docker Compose development stack for Next.js + PostgreSQL 18.
- Verified the local app boots in Docker and the health endpoint responds at `/api/health`.
- Upgraded `next` and `eslint-config-next` to `16.2.3`, added the `pnpm-lock.yaml`, and aligned the ESLint config with Next.js 16 flat-config exports.
- Verified `pnpm test` passes in the Dockerized app environment after the framework upgrade.
- Added Prisma 6 with an initial PostgreSQL migration, seed script, starter `Project` model, and Auth.js adapter models.
- Added a starter repository/service example for projects and used it from the protected dashboard route.
- Added Auth.js route handling, provider placeholders, sign-in flow scaffolding, and protected route enforcement.
- Added Vitest with starter unit and smoke tests.
- Added GitHub Actions CI for lint, typecheck, tests, and build.
- Expanded README and Docker docs so the repo can be forked and customized as a starter template.
- Parameterized local Docker app/database settings through `.env` so downstream forks can choose their own ports and Postgres credentials without editing Compose files directly.
- Added guided local setup scripts for PowerShell and Bash to generate consistent `.env` values for Docker, Prisma, and Auth.js.
- Extended the setup scripts so they can optionally collect OAuth provider env vars while still allowing users to skip them with Enter.
- Verified the updated Docker configuration resolves cleanly with `docker compose config` in the current environment.
- Verified the PowerShell setup script can generate `.env` end-to-end, including the optional OAuth section with blank defaults.

## In Progress
- None.

## Next Up
- Replace the sample `Project` domain and placeholder marketing copy in downstream forks.
- Configure at least one OAuth provider in `.env` for a deployed environment.

## Blockers
- None.

## Key Decisions
- Decision: Start with app structure before infrastructure and database layers.
  - Reason: Matches required MVP bootstrap priority order in AGENTS.md.
  - Date: 2026-04-10

## Commands
- Install: pnpm install
- Dev: pnpm dev
- Docker Dev: docker compose up --build
- Docker Stop: docker compose down
- Local Setup (Windows): pwsh -File ./scripts/setup-local.ps1
- Local Setup (macOS/Linux): bash ./scripts/setup-local.sh
- Test: pnpm test
- Check: pnpm check
- Lint: pnpm lint
- Typecheck: pnpm typecheck
- Build: pnpm build
- DB Generate: pnpm db:generate
- DB Migrate: pnpm db:migrate
- DB Seed: pnpm db:seed
- DB Studio: pnpm db:studio

## Notes for Next Session
- What was just finished: Replaced hard-coded local Docker and Postgres defaults with `.env`-driven configuration, added guided setup scripts with optional auth prompts, and documented the new onboarding flow in the README.
- What should happen next: Smoke-test the Bash setup path in a macOS or Linux shell, then continue replacing sample product/domain content in downstream forks.
- Risks / caution areas: Keep `DATABASE_URL` and `DOCKER_DATABASE_URL` aligned when extending local setup, since host-side Prisma and container-side app traffic use different database hosts.
