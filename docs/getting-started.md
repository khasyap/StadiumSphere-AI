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
single source for Compose interpolation and application runtime configuration.
