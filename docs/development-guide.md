# Development Guide

## Local applications

- Web: `pnpm --filter @stadiumsphere/web dev`
- API: `pnpm --filter @stadiumsphere/api dev`
- AI service: `pnpm ai:dev`

The web application validates `VITE_API_BASE_URL` at startup. The API validates every required runtime
variable before it begins listening. The AI service validates settings during its FastAPI lifespan.

## Quality workflow

Run `pnpm format` before committing, then run the format check, lint, type check, build, and test
commands from the root README. Husky executes lint-staged for staged TypeScript, JSON, YAML, Markdown,
and CSS changes, while Commitlint enforces Conventional Commits.

## Architectural boundaries

- Applications depend on shared packages; shared packages never depend on applications.
- API business behavior will depend inward from presentation through application and domain layers.
- Framework, database, cache, and external-provider adapters remain at infrastructure edges.
- Web server state uses TanStack Query; client-only state is kept separate.
- AI agents, tools, retrieval, memory, and evaluation remain independently testable areas.
