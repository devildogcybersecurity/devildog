# Docker

Local Docker assets for the MVP template live here.

## Current Stack
- `docker-compose.yml` at the repo root runs Next.js on `http://localhost:<APP_PORT>` and defaults to `http://localhost:3000`.
- It also runs PostgreSQL 18 on `localhost:<POSTGRES_PORT>` and defaults to `localhost:5432`.

## Start
- Generate or update `.env` first with `pwsh -File ./scripts/setup-local.ps1` on Windows or `bash ./scripts/setup-local.sh` on macOS / Linux.
- `docker compose up --build`

## Stop
- `docker compose down`

## Database Commands
- Generate Prisma client:
- `docker compose exec app sh -lc "pnpm db:generate"`
- Create and apply a migration:
- `docker compose exec app sh -lc "pnpm db:migrate"`
- Seed starter data:
- `docker compose exec app sh -lc "pnpm db:seed"`

## Auth Notes
- The compose stack reads `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, and `DOCKER_DATABASE_URL` from your local `.env`.
- The setup scripts can also collect OAuth provider credentials. Press Enter to leave them blank until you are ready to enable sign-in.

## Notes
- The app container installs dependencies with `pnpm` inside Docker, so the host machine does not need local Node.js or pnpm to preview the scaffold.
- Docker is the recommended local workflow when Node.js or pnpm are not already installed on the host machine.
