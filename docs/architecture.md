# Architecture Overview

## Goal
Provide a fast-moving MVP template using one Next.js application with clean internal boundaries and a clear path to future separation.

## Target Structure
- src/app: routes and route groups
- src/features: domain organization
- src/server: server-side services and repositories
- prisma/: schema and migrations
- docker/: local development assets

## Notes
- Database access remains server-only.
- UI components should not contain durable business logic.
- Keep the codebase easy to evolve into a more layered architecture later.
