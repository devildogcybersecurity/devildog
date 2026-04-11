# Docker

Local Docker assets for the static website template live here.

## Current Stack
- `docker-compose.yml` at the repo root runs Next.js on `http://localhost:<APP_PORT>` and defaults to `http://localhost:3000`.

## Start
- Generate or update `.env` first with `pwsh -File ./scripts/setup-local.ps1` on Windows or `bash ./scripts/setup-local.sh` on macOS / Linux.
- `docker compose up --build`

## Stop
- `docker compose down`

## Notes
- The app container installs dependencies with `pnpm` inside Docker, so the host machine does not need local Node.js or pnpm to preview the scaffold.
- Docker is the recommended local workflow when Node.js or pnpm are not already installed on the host machine.
- The static build still runs through the normal Next.js `build` script and emits an `out/` directory for deployment.
