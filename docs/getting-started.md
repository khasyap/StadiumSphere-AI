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

## API authentication configuration

`apps/api/.env` must also define distinct `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` values of at least
32 characters, `JWT_ACCESS_EXPIRES_IN` and `JWT_REFRESH_EXPIRES_IN` in seconds, and `BCRYPT_SALT_ROUNDS`.
Copy the API `.env.example` first, then replace its sample JWT secrets before any shared deployment.

## Repository development guidance

Persistence utilities are available from `apps/api/src/infrastructure/persistence`. A future domain
repository should extend `BaseRepository` and receive its Mongoose model through NestJS dependency injection.
Use `RepositoryOptions` to combine generic MongoDB filters, typed multi-field sort directions, projection,
population, and page/limit pagination. `findMany` returns data together with offset, total-page, and
next/previous-page metadata. Do not place business rules, schemas, or HTTP handlers in this layer.

## Domain development guidance

Reusable domain primitives live in `apps/api/src/domain`. Use `Entity` and `AggregateRoot` with
`UniqueEntityId` for identity, and use validated value objects for domain data. Aggregate roots only collect
domain events in this phase; event dispatching belongs to a later application-layer integration. Do not add
NestJS decorators, DTOs, persistence annotations, or transport concerns to the domain layer.

## Application development guidance

Application-layer code belongs in `apps/api/src/application`. Define repository ports there and make services
depend only on those ports and domain types. Keep commands, queries, DTOs, mappers, validators, and application
exceptions transport-agnostic. Repository adapters belong to infrastructure, while application-service bindings
belong to `ApplicationModule`; neither may be imported directly by presentation controllers.

## Repository adapter guidance

MongoDB repository adapters live in `apps/api/src/infrastructure/repositories` and are registered through
`RepositoryModule`. They implement application ports and compose the shared `BaseRepository` for generic CRUD
and persistence-exception translation. Keep Mongoose schemas limited to collection/index/timestamp/field-shape
concerns, and use infrastructure mappers only for document-to-domain conversion; DTO conversion remains in the
application layer.

## REST presentation guidance

REST controllers, request DTOs, reusable response models, and Swagger metadata live in
`apps/api/src/presentation`. DTOs use `class-validator` and are compatible with the existing global
`ValidationPipe`. Controllers must delegate to application-service contracts only—never to repositories,
Mongoose models, or infrastructure mappers. With `SWAGGER_ENABLED=true`, use `/api-docs` to inspect endpoints
when the presentation module is composed into the API.

## Application-service dependency injection

`ApplicationModule` imports `RepositoryModule` and receives repository implementations through the existing
application repository tokens. It registers and exports application-service tokens consumed by presentation
controllers. The root `AppModule` imports `PresentationModule`; therefore controller requests flow through
application services and repository ports without controllers directly importing infrastructure.
