# Getting Started

## Required tooling

- Node.js 22 or later
- pnpm 11 or later
- Python 3.12 or later
- uv
- Docker Desktop with Compose v2 for the containerized stack

## Initialize the workspace

1. Copy `.env.example` to `.env`.
2. Run `pnpm install` at the repository root.
3. Run `uv sync --directory apps/ai`.
4. Verify the foundation with `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm build`, and
   `pnpm test`.

For a containerized local environment, run `docker compose up --build`. The local `.env` file is the
single source for Compose interpolation and application runtime configuration.
