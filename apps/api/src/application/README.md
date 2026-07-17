# Application layer

Phase 12.4 provides commands, queries, DTOs, repository ports, mappers, validators, exceptions, and
application-service foundations. Application services depend on application repository interfaces and domain
types only; they never import infrastructure implementations, models, controllers, or transport concerns.

`ApplicationModule` is intentionally empty until a later phase supplies repository adapters. It serves as the
composition boundary without coupling the application layer to a persistence implementation.
