# Getting Started

## Required tooling

- Node.js 22 or later
- pnpm 11 or later
- Python 3.12 or later
- uv
- Docker Desktop with Compose v2 for the containerized stack

## Initialize the workspace

1. Copy each application environment example to its local `.env` file: `apps/web/.env.example` to
   `apps/web/.env`, `apps/api/.env.example` to `apps/api/.env`, and `apps/ai/.env.example` to
   `apps/ai/.env`. The root `.env.example` is only for Docker Compose.
2. Run `pnpm install` at the repository root.
3. Install [uv](https://docs.astral.sh/uv/getting-started/installation/) before running `pnpm ai:dev`,
   then run `uv sync --directory apps/ai`.
4. Verify the foundation with `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm build`, and
   `pnpm test`.

For a containerized local environment, run `docker compose up --build`. The local `.env` file is the
single source for Compose interpolation and application runtime configuration. This starts MongoDB and
Redis with persistent volumes and health checks.

## API persistence configuration

`apps/api/.env` must define `MONGODB_URI`, `MONGODB_DATABASE`,
`MONGODB_SERVER_SELECTION_TIMEOUT_MS`, `REDIS_HOST`, and `REDIS_PORT` before starting the API.
`REDIS_PASSWORD` is optional. The provided `.env.example` files contain local values; use the root `.env`
values for Docker Compose and the API-local values for standalone API development.

## Repository development guidance

Persistence utilities are available from `apps/api/src/infrastructure/persistence`. A future domain
repository should extend `BaseRepository` and receive its Mongoose model through NestJS dependency injection.
Use `RepositoryOptions` to combine generic MongoDB filters, typed multi-field sort directions, projection,
population, and page/limit pagination. `findMany` returns data together with offset, total-page, and
next/previous-page metadata. Do not place business rules, schemas, or HTTP handlers in this layer.
