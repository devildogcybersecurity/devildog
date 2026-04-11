# MVP Template

Forkable Next.js MVP starter focused on fast delivery with clean boundaries, Dockerized local development, and a low-friction path to new product work.

## What This Template Includes
- Next.js 16 App Router with marketing and authenticated app route groups
- PostgreSQL 18 + Prisma migration and seed workflow
- Auth.js with Prisma-backed sessions and provider placeholders for Microsoft Entra ID, Google, and Apple
- Clear server-side boundaries with starter repository and service examples
- Vitest unit tests plus a simple health-route smoke test
- GitHub Actions CI for lint, typecheck, tests, and build

## Requirements
- Node.js 24+
- pnpm
- Docker Desktop

## Quick Start
1. Generate `.env` with your preferred local app port, PostgreSQL port, database name, username, password, and Auth.js secret by running `pwsh -File ./scripts/setup-local.ps1` on Windows or `bash ./scripts/setup-local.sh` on macOS / Linux.
   The script also offers optional prompts for Microsoft Entra ID, Google, and Apple auth settings. Press Enter to leave any of them blank and configure them later.
2. Start the local stack with `docker compose up --build`.
3. Run the initial database setup with `docker compose exec app sh -lc "pnpm db:migrate && pnpm db:seed"`.
4. Open the `NEXTAUTH_URL` shown by the setup script. The default is `http://localhost:3000`.

## Local Setup Script
- The setup script creates or updates `.env` and keeps any existing OAuth provider values already in that file.
- It keeps Docker Compose, host-side Prisma commands, and Auth.js URLs aligned by updating `APP_PORT`, `POSTGRES_PORT`, `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `DATABASE_URL`, `DOCKER_DATABASE_URL`, `NEXTAUTH_URL`, and `NEXTAUTH_SECRET`.
- It also offers optional prompts for `MICROSOFT_ENTRA_CLIENT_ID`, `MICROSOFT_ENTRA_CLIENT_SECRET`, `MICROSOFT_ENTRA_TENANT_ID`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `APPLE_CLIENT_ID`, and `APPLE_CLIENT_SECRET`.
- Rerun the script any time you want to move this fork onto different local ports or credentials.
- If you prefer to edit manually, copy `.env.example` to `.env` and update the same keys yourself.

## Auth Setup
- The template ships with Auth.js already wired.
- Add provider credentials to `.env` for any provider you want to enable:
- `MICROSOFT_ENTRA_CLIENT_ID`, `MICROSOFT_ENTRA_CLIENT_SECRET`, `MICROSOFT_ENTRA_TENANT_ID`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- `APPLE_CLIENT_ID`, `APPLE_CLIENT_SECRET`
- The protected app area lives at `http://localhost:<APP_PORT>/dashboard` and defaults to `http://localhost:3000/dashboard`.
- If no OAuth provider is configured yet, the sign-in page explains which env vars are still missing.

## Database Workflow
- Generate Prisma client: `pnpm db:generate`
- Create and apply a migration: `pnpm db:migrate`
- Seed starter data: `pnpm db:seed`
- Open Prisma Studio: `pnpm db:studio`

When using Docker instead of a host Node.js toolchain:
- `docker compose exec app sh -lc "pnpm db:generate"`
- `docker compose exec app sh -lc "pnpm db:migrate"`
- `docker compose exec app sh -lc "pnpm db:seed"`

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
- `pnpm db:generate`
- `pnpm db:migrate`
- `pnpm db:seed`
- `pnpm db:studio`
- `docker compose up --build`
- `docker compose down`

## Fork Checklist
- Rename the package in `package.json`
- Update app metadata in `src/app/layout.tsx`
- Replace the seeded starter project and placeholder marketing copy
- Configure at least one auth provider in `.env`
- Replace the sample `Project` domain with your product-specific model as your first feature

## Structure
- `src/app`: App Router pages, route handlers, and server actions
- `src/features`: feature-oriented helpers and domain modules
- `src/server/repositories`: server-only data access
- `src/server/services`: server-only business logic
- `prisma`: schema, migrations, and seed script
- `docker`: local containerization notes
- `.github/workflows`: starter CI automation

## Local URLs
- App: `http://localhost:<APP_PORT>` (default `http://localhost:3000`)
- Sign-in: `http://localhost:<APP_PORT>/sign-in`
- Dashboard: `http://localhost:<APP_PORT>/dashboard`
- Health endpoint: `http://localhost:<APP_PORT>/api/health`
- PostgreSQL: `localhost:<POSTGRES_PORT>` (default `localhost:5432`)
