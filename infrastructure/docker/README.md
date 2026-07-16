# Docker development

Application Dockerfiles are co-located with their deployable applications so their build contexts are
explicit. The root `docker-compose.yml` composes web, API, AI, MongoDB, and Redis into an isolated
development network with technical health checks and persistent data volumes.

Copy the root `.env.example` to `.env`, then run `docker compose up --build`. Stop the stack with
`docker compose down`; add `--volumes` only when local database and cache data should be removed.
