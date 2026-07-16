# StadiumSphere AI

StadiumSphere AI is an enterprise monorepo for the platform's web, API, and AI service
foundations. Phase 11 deliberately establishes engineering capabilities only: it contains
no business domains, database models, authentication, or AI agents.

## Prerequisites

- Node.js 22 or later and pnpm 11 or later
- Python 3.12 or later and [uv](https://docs.astral.sh/uv/)
- Docker Desktop with Docker Compose v2 for containerized development

## Quick start

1. Copy `.env.example` to `.env` and review the local values.
2. Install JavaScript dependencies with `pnpm install`.
3. Install Python dependencies with `uv sync --directory apps/ai`.
4. Run all JavaScript applications with `pnpm dev`, or start the complete stack with
   `docker compose up --build`.

The services expose technical health endpoints only:

- Web: `http://localhost:5173`
- API: `http://localhost:3000/api/v1/health`
- AI service: `http://localhost:8000/health`

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
