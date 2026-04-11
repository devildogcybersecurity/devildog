# PROJECT_STATUS

## Project
- Name: mvp-template
- Template Type: Static website baseline
- Current Branch: main
- Last Updated: 2026-04-11

## Current Phase
- Static-site baseline verified in Docker

## Completed
- Reviewed repository guidance, architecture notes, and current code structure.
- Confirmed the copied template still includes Prisma, PostgreSQL, Auth.js, protected routes, server-side repository and service examples, and database-oriented onboarding docs.
- Identified the static-site conversion scope across app routes, auth files, Prisma files, Docker and environment setup, CI, tests, and repository guidance.
- Reframed the next implementation milestone around removing auth and database concerns rather than extending the MVP starter.
- Removed protected routes, auth handlers, Prisma files, server-side starter domain code, and tracked generated build metadata from the repo.
- Rewrote the homepage and about page for a public-only static website baseline and moved shared copy into `src/features/site/siteContent.ts`.
- Simplified package scripts, Next.js config, Docker setup, environment templates, setup scripts, CI, and repo docs around static export and app-only local development.
- Replaced the old auth and database test coverage with a lightweight static-site regression test for shared public content.
- Verified the repo in an isolated Docker Compose project using `-p mvp-static-site` so its image, container, network, and volumes do not interfere with the copied template's Docker assets.
- Ran `pnpm check` successfully in Docker and confirmed `pnpm build` generates static output for `/` and `/about`.
- Fixed the `pnpm` ignored build-script warning by allowing `sharp` and `unrs-resolver` via `pnpm.onlyBuiltDependencies`.
- Updated the Docker image to preactivate `pnpm@10.33.0`, removing the repeated Corepack download and update-notice startup noise.
- Added a step-by-step GitHub hardening guide in `docs/github-hardening-checklist.md`, organized with free protections first and paid private-repo options clearly separated.

## In Progress
- None.

## Next Up
- Decide whether to regenerate the local ignored `.env` so it only contains `APP_PORT`.
- Replace the generic starter copy and metadata with project-specific site content.
- Choose whether to keep using `docker compose -p mvp-static-site ...` manually or bake a project name into the local workflow.
- Work through `docs/github-hardening-checklist.md` and apply the relevant public, private, or organization settings in GitHub.

## Blockers
- None.

## Key Decisions
- Decision: Convert the repo to a true static export baseline instead of keeping a server-oriented starter.
  - Reason: The goal is a public-only static website with no database, auth, or protected runtime paths.
  - Date: 2026-04-11
- Decision: Keep Docker only for the web app development workflow.
  - Reason: Local container support is still useful, but PostgreSQL and auth-specific setup are unnecessary after the conversion.
  - Date: 2026-04-11

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

## Notes for Next Session
- What was just finished: Added `docs/github-hardening-checklist.md` with a free-first GitHub security walkthrough, plus clear public/private and organization-specific paid upgrade notes.
- What should happen next: Apply the checklist in GitHub, then continue replacing starter content and, if helpful, simplify the operator workflow around the chosen Docker Compose project name.
- Risks / caution areas: Keep using the isolated Compose project name for this repo so old template containers, networks, and volumes remain untouched.
