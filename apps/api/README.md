# API application

The API is a NestJS application following Clean Architecture boundaries. It provides CRUD APIs,
technical health monitoring at `/api/v1/health`, and authentication endpoints at `/api/v1/auth`.

Copy `.env.example` to `.env` for standalone execution, then run:

```sh
pnpm --filter @stadiumsphere/api build
pnpm --filter @stadiumsphere/api start
```

The application validates its environment before startup and exposes OpenAPI documentation when
`SWAGGER_ENABLED` is set to `true`.

Authentication requires distinct `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` values of at least 32
characters, expiration values in seconds, and `BCRYPT_SALT_ROUNDS`; the API `.env.example` lists all
required settings. Replace its sample JWT secrets for every non-local environment.
