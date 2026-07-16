# API application

The API is a NestJS foundation following Clean Architecture boundaries. Its only executable
capability is a technical health endpoint at `/api/v1/health`; it has no business modules,
authentication, persistence models, or external integration implementations.

Copy `.env.example` to `.env` for standalone execution, then run:

```sh
pnpm --filter @stadiumsphere/api build
pnpm --filter @stadiumsphere/api start
```

The application validates its environment before startup and exposes OpenAPI documentation when
`SWAGGER_ENABLED` is set to `true`.
