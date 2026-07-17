# StadiumSphere AI

StadiumSphere AI is an enterprise monorepo for the platform's web, API, and AI service
foundations. Phase 11 deliberately establishes engineering capabilities only: it contains
no business domains, database models, authentication, or AI agents.

## Prerequisites

- Node.js 22 or later and pnpm 11 or later
- Python 3.12 or later and [uv](https://docs.astral.sh/uv/)
- Docker Desktop with Docker Compose v2 for containerized development

## Quick start

1. Copy each application environment example before local development:
   `apps/web/.env.example` to `apps/web/.env`, `apps/api/.env.example` to `apps/api/.env`,
   and `apps/ai/.env.example` to `apps/ai/.env`. The root `.env.example` is for Docker Compose.
2. Install JavaScript dependencies with `pnpm install`.
3. Install [uv](https://docs.astral.sh/uv/getting-started/installation/) before any `pnpm ai:*`
   command, then install Python dependencies with `uv sync --directory apps/ai`.
4. Run all JavaScript applications with `pnpm dev`, start the AI service with `pnpm ai:dev`, or start the complete stack with
   `docker compose up --build`.

The services expose technical health endpoints only:

- Web: `http://localhost:5173`
- API: `http://localhost:3000/api/v1/health`
- AI service: `http://localhost:8000/health`

## Persistence services

Phase 12.1 requires MongoDB and Redis. Start the complete local environment with
`docker compose up --build`; Compose provisions both services with persistent volumes and waits for
their health checks before starting the API. For standalone API development, provide the following
values in `apps/api/.env`: `MONGODB_URI`, `MONGODB_DATABASE`,
`MONGODB_SERVER_SELECTION_TIMEOUT_MS`, `REDIS_HOST`, and `REDIS_PORT`. `REDIS_PASSWORD` is optional.

## Repository persistence layer

Phase 12.2 provides generic MongoDB repository utilities under
`apps/api/src/infrastructure/persistence`. Future domain repositories extend `BaseRepository` with an
injected Mongoose model. The layer supplies typed filtering, multi-field ascending or descending sorting,
projection and population options, pagination metadata, and persistence-specific exceptions. It does not
contain any business repository, schema, or endpoint.

## Workspace commands

| Command             | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| `pnpm build`        | Build all TypeScript applications and packages. |
| `pnpm lint`         | Lint TypeScript and Python source.              |
| `pnpm format:check` | Verify Prettier and Ruff formatting.            |
| `pnpm test`         | Run technical foundation tests.                 |
| `pnpm typecheck`    | Run TypeScript and Python type checks.          |
| `pnpm clean`        | Remove generated build artifacts.               |

See [Getting Started](docs/getting-started.md), [Development Guide](docs/development-guide.md),
[Contribution Guide](docs/contributing.md), and [Repository Structure](docs/repository-structure.md).
